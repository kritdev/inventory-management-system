package com.krit.project.ims.appserver.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
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

@RestController
@RequestMapping("/api")
@Transactional
public class InventoryTransactionItemResource {

  private final Logger log = LoggerFactory.getLogger(InventoryTransactionItemResource.class);

  private static final String ENTITY_NAME = "inventoryTransactionItem";

  private final InventoryTransactionItemRepository inventoryTransactionItemRepository;

  public InventoryTransactionItemResource(
      InventoryTransactionItemRepository inventoryTransactionItemRepository) {
    this.inventoryTransactionItemRepository = inventoryTransactionItemRepository;
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
    InventoryTransactionItem result =
        inventoryTransactionItemRepository.save(inventoryTransactionItem);
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

    InventoryTransactionItem result =
        inventoryTransactionItemRepository.save(inventoryTransactionItem);
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

  @DeleteMapping("/transaction-items/{id}")
  public ResponseEntity<Void> deleteInventoryTransactionItem(@PathVariable Long id) {
    log.debug("REST request to delete InventoryTransactionItem : {}", id);
    inventoryTransactionItemRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
