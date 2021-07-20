package com.krit.project.ims.appserver.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.krit.project.ims.appserver.entity.InventoryTransactionItem;
import com.krit.project.ims.appserver.entity.repository.InventoryTransactionItemRepository;
import com.krit.project.ims.appserver.rest.errors.BadRequestAlertException;
import com.krit.project.ims.appserver.rest.vm.InventoryTransactionItemWithProductName;

@RestController
@RequestMapping("/api")
@Transactional
public class InventoryTransactionItemResource {

  private final Logger log = LoggerFactory.getLogger(InventoryTransactionItemResource.class);

  private static final String ENTITY_NAME = "inventoryTransactionItem";

  private final InventoryTransactionItemRepository inventoryTransactionItemRepository;
  private final StockItemResource stockItemResource;

  public InventoryTransactionItemResource(
      InventoryTransactionItemRepository inventoryTransactionItemRepository,
      StockItemResource stockItemResource) {
    this.inventoryTransactionItemRepository = inventoryTransactionItemRepository;
    this.stockItemResource = stockItemResource;
  }

  @PostMapping("/transaction-items")
  public ResponseEntity<InventoryTransactionItem> createInventoryTransactionItem(
      @Valid @RequestBody InventoryTransactionItem inventoryTransactionItem)
      throws URISyntaxException {
    log.debug("REST request to save InventoryTransactionItem : {}", inventoryTransactionItem);
    if (inventoryTransactionItem.getId() != null) {
      throw new BadRequestAlertException("A new inventoryTransactionItem cannot already have an ID",
          ENTITY_NAME, "idexists");
    }

    // --- to be transaction ----------------------------------------------------

    InventoryTransactionItem result =
        inventoryTransactionItemRepository.save(inventoryTransactionItem);

    stockItemResource.setCountInStock(inventoryTransactionItem.getProduct().getId(),
        inventoryTransactionItem.getItemCount(), null);

    // --- to be transaction ----------------------------------------------------

    return ResponseEntity.created(new URI("/api/transaction-items/" + result.getId())).body(result);
  }

  @PutMapping("/transaction-items/{id}")
  public ResponseEntity<InventoryTransactionItem> updateInventoryTransactionItem(
      @PathVariable(value = "id", required = false) final Long id,
      @Valid @RequestBody InventoryTransactionItem inventoryTransactionItem)
      throws URISyntaxException {
    log.debug("REST request to update InventoryTransactionItem : {}, {}", id,
        inventoryTransactionItem);
    if (inventoryTransactionItem.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, inventoryTransactionItem.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!inventoryTransactionItemRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    // --- to be transaction ----------------------------------------------------

    Optional<InventoryTransactionItem> currentTransactionItem =
        inventoryTransactionItemRepository.findById(id);

    InventoryTransactionItem result =
        inventoryTransactionItemRepository.save(inventoryTransactionItem);

    stockItemResource.setCountInStock(inventoryTransactionItem.getProduct().getId(),
        inventoryTransactionItem.getItemCount(), currentTransactionItem.get().getItemCount());

    // --- to be transaction ----------------------------------------------------

    return ResponseEntity.ok().body(result);
  }

  @GetMapping("/transaction-items")
  public List<InventoryTransactionItem> getAllTransactionItems() {
    log.debug("REST request to get all transaction-items");
    return inventoryTransactionItemRepository.findAll();
  }

  @GetMapping("/transaction-items/{id}")
  public ResponseEntity<InventoryTransactionItem> getInventoryTransactionItem(
      @PathVariable Long id) {
    log.debug("REST request to get InventoryTransactionItem : {}", id);
    Optional<InventoryTransactionItem> inventoryTransactionItem =
        inventoryTransactionItemRepository.findById(id);
    return AppResponseUtil.wrapOrNotFound(inventoryTransactionItem);
  }

  @GetMapping("/transaction-items/product/{productId}")
  public List<InventoryTransactionItemWithProductName> findTransactionItemByProductId(
      @PathVariable Long productId) {
    log.debug("REST request to get transaction-items by product id");
    return inventoryTransactionItemRepository.findByProductId(productId,
        Sort.by("transactionDate").descending());
  }

  // @DeleteMapping("/transaction-items/{id}")
  // public ResponseEntity<Void> deleteInventoryTransactionItem(@PathVariable Long id) {
  // log.debug("REST request to delete InventoryTransactionItem : {}", id);
  // inventoryTransactionItemRepository.deleteById(id);
  // return ResponseEntity.noContent().build();
  // }
}
