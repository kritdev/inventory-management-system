package com.krit.project.ims.appserver.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.krit.project.ims.appserver.entity.UnitOfMeasure;
import com.krit.project.ims.appserver.entity.repository.UnitOfMeasureRepository;
import com.krit.project.ims.appserver.rest.errors.BadRequestAlertException;

@RestController
@RequestMapping("/api")
@Transactional
public class UnitOfMeasureResource {

  private final Logger log = LoggerFactory.getLogger(UnitOfMeasureResource.class);

  private static final String ENTITY_NAME = "unitOfMeasure";

  private final UnitOfMeasureRepository unitOfMeasureRepository;

  public UnitOfMeasureResource(UnitOfMeasureRepository unitOfMeasureRepository) {
    this.unitOfMeasureRepository = unitOfMeasureRepository;
  }

  @PostMapping("/unit-of-measures")
  public ResponseEntity<UnitOfMeasure> createUnitOfMeasure(
      @Valid @RequestBody UnitOfMeasure unitOfMeasure) throws URISyntaxException {
    log.debug("REST request to save UnitOfMeasure : {}", unitOfMeasure);
    if (unitOfMeasure.getId() != null) {
      throw new BadRequestAlertException("A new unitOfMeasure cannot already have an ID",
          ENTITY_NAME, "idexists");
    }
    UnitOfMeasure result = unitOfMeasureRepository.save(unitOfMeasure);
    return ResponseEntity.created(new URI("/api/unit-of-measures/" + result.getId())).body(result);
  }

  @PutMapping("/unit-of-measures/{id}")
  public ResponseEntity<UnitOfMeasure> updateUnitOfMeasure(
      @PathVariable(value = "id", required = false) final Long id,
      @Valid @RequestBody UnitOfMeasure unitOfMeasure) throws URISyntaxException {
    log.debug("REST request to update UnitOfMeasure : {}, {}", id, unitOfMeasure);
    if (unitOfMeasure.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, unitOfMeasure.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!unitOfMeasureRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    UnitOfMeasure result = unitOfMeasureRepository.save(unitOfMeasure);
    return ResponseEntity.ok().body(result);
  }

  @PatchMapping(value = "/unit-of-measures/{id}", consumes = "application/merge-patch+json")
  public ResponseEntity<UnitOfMeasure> partialUpdateUnitOfMeasure(
      @PathVariable(value = "id", required = false) final Long id,
      @NotNull @RequestBody UnitOfMeasure unitOfMeasure) throws URISyntaxException {
    log.debug("REST request to partial update UnitOfMeasure partially : {}, {}", id, unitOfMeasure);
    if (unitOfMeasure.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, unitOfMeasure.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!unitOfMeasureRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    Optional<UnitOfMeasure> result =
        unitOfMeasureRepository.findById(unitOfMeasure.getId()).map(existingUnitOfMeasure -> {
          if (unitOfMeasure.getName() != null) {
            existingUnitOfMeasure.setName(unitOfMeasure.getName());
          }
          if (unitOfMeasure.getDescription() != null) {
            existingUnitOfMeasure.setDescription(unitOfMeasure.getDescription());
          }

          return existingUnitOfMeasure;
        }).map(unitOfMeasureRepository::save);

    return AppResponseUtil.wrapOrNotFound(result, null);
  }

  @GetMapping("/unit-of-measures")
  public List<UnitOfMeasure> getAllProducts() {
    log.debug("REST request to get all Products");
    return unitOfMeasureRepository.findAll();
  }

  @GetMapping("/unit-of-measures/{id}")
  public ResponseEntity<UnitOfMeasure> getUnitOfMeasure(@PathVariable Long id) {
    log.debug("REST request to get UnitOfMeasure : {}", id);
    Optional<UnitOfMeasure> unitOfMeasure = unitOfMeasureRepository.findById(id);
    return AppResponseUtil.wrapOrNotFound(unitOfMeasure);
  }

  @DeleteMapping("/unit-of-measures/{id}")
  public ResponseEntity<Void> deleteUnitOfMeasure(@PathVariable Long id) {
    log.debug("REST request to delete UnitOfMeasure : {}", id);
    unitOfMeasureRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
