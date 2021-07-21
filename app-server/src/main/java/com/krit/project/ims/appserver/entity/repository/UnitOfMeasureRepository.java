package com.krit.project.ims.appserver.entity.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.krit.project.ims.appserver.entity.UnitOfMeasure;

/**
 * Spring Data SQL repository for the UnitOfMeasure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnitOfMeasureRepository extends JpaRepository<UnitOfMeasure, Long> {

  @Query("Select u from UnitOfMeasure u Order by u.name")
  List<UnitOfMeasure> findAllSortByName();
}
