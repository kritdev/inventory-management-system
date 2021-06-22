package com.krit.project.ims.appserver.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.krit.project.ims.appserver.entity.StockItem;

/**
 * Spring Data SQL repository for the StockItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StockItemRepository extends JpaRepository<StockItem, Long> {
}
