package com.krit.project.ims.appserver.rest;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.krit.project.ims.appserver.entity.Product;
import com.krit.project.ims.appserver.entity.StockItem;
import com.krit.project.ims.appserver.entity.repository.StockItemRepository;


@RestController
@RequestMapping("/api")
@Transactional
public class StockItemResource {

  private final Logger log = LoggerFactory.getLogger(StockItemResource.class);

  private static final String ENTITY_NAME = "stockItemResource";

  private final StockItemRepository stockItemRepository;

  public StockItemResource(StockItemRepository stockItemRepository) {
    this.stockItemRepository = stockItemRepository;
  }

  /**
   * Update the StockItem.countInStock If no existing StockItem, create new item.
   * 
   * For update the previous transaction case, need to reverse itemCount. But if the StockItem does
   * not existed before, just set it as new itemCount.
   * 
   * @param productId - Target Product
   * @param itemCount - New itemCount to update
   * @param previousItemCount - For case of update the previous transaction, need to reverse the
   *        previous itemCount
   */
  public void setCountInStock(Long productId, Integer itemCount, Integer previousItemCount) {

    // get existing item
    List<StockItem> stockItems = stockItemRepository.findByProductId(productId);

    // If no existing item, create new item
    StockItem item = null;
    if (stockItems.size() == 0) {
      Product product = new Product();
      product.setId(productId);

      item = new StockItem();
      item.setProduct(product);
      item.setCountInStock(0);
    } else {
      item = stockItems.get(0);
      if (item.getCountInStock() == null) {
        item.setCountInStock(0);
      }
    }

    // apply new itemCount
    Integer newCountInStock = item.getCountInStock() + itemCount;

    // if required, reverse previousItemCount
    if (item.getId() != null && previousItemCount != null && previousItemCount > 0) {
      newCountInStock -= previousItemCount;
    }

    // update/save item
    item.setCountInStock(newCountInStock);
    stockItemRepository.save(item);
  }
}
