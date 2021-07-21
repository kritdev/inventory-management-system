package com.krit.project.ims.appserver.entity.repository;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.krit.project.ims.appserver.entity.InventoryTransactionItem;
import com.krit.project.ims.appserver.rest.vm.InventoryTransactionItemWithProductName;

/**
 * Spring Data SQL repository for the InventoryTransactionItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InventoryTransactionItemRepository
    extends JpaRepository<InventoryTransactionItem, Long> {

  List<InventoryTransactionItemWithProductName> findByProductId(Long productId, Sort sort);
}
