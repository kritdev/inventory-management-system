package com.krit.project.ims.appserver.entity.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.krit.project.ims.appserver.entity.Product;
import com.krit.project.ims.appserver.rest.vm.ProductName;

/**
 * Spring Data SQL repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  @Query("Select p from Product p Order by p.name")
  List<ProductName> findAllProductName();
}
