package com.krit.project.ims.appserver.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.krit.project.ims.appserver.entity.InventoryTransactionItem;

/**
 * Spring Data SQL repository for the InventoryTransactionItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InventoryTransactionItemRepository
    extends JpaRepository<InventoryTransactionItem, Long> {
}
