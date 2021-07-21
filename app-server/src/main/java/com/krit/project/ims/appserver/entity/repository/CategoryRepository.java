package com.krit.project.ims.appserver.entity.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.krit.project.ims.appserver.entity.Category;

/**
 * Spring Data SQL repository for the Category entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

  @Query("Select c from Category c Order by c.name")
  List<Category> findAllSortByName();
}
