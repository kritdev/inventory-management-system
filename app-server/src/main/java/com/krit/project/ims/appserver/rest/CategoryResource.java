package com.krit.project.ims.appserver.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Comparator;
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
import com.krit.project.ims.appserver.entity.Category;
import com.krit.project.ims.appserver.entity.repository.CategoryRepository;
import com.krit.project.ims.appserver.rest.errors.BadRequestAlertException;

@RestController
@RequestMapping("/api")
@Transactional
public class CategoryResource {

  private final Logger log = LoggerFactory.getLogger(CategoryResource.class);

  private static final String ENTITY_NAME = "category";

  private final CategoryRepository categoryRepository;

  public CategoryResource(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  @PostMapping("/categories")
  public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category)
      throws URISyntaxException {
    log.debug("REST request to save Category : {}", category);
    if (category.getId() != null) {
      throw new BadRequestAlertException("A new category cannot already have an ID", ENTITY_NAME,
          "idexists");
    }
    Category result = categoryRepository.save(category);
    return ResponseEntity.created(new URI("/api/categories/" + result.getId())).body(result);
  }

  @PutMapping("/categories/{id}")
  public ResponseEntity<Category> updateCategory(
      @PathVariable(value = "id", required = false) final Long id,
      @Valid @RequestBody Category category) throws URISyntaxException {
    log.debug("REST request to update Category : {}, {}", id, category);
    if (category.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, category.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!categoryRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    Category result = categoryRepository.save(category);
    return ResponseEntity.ok().body(result);
  }

  @PatchMapping(value = "/categories/{id}", consumes = "application/merge-patch+json")
  public ResponseEntity<Category> partialUpdateCategory(
      @PathVariable(value = "id", required = false) final Long id,
      @NotNull @RequestBody Category category) throws URISyntaxException {
    log.debug("REST request to partial update Category partially : {}, {}", id, category);
    if (category.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, category.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!categoryRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    Optional<Category> result =
        categoryRepository.findById(category.getId()).map(existingCategory -> {
          if (category.getName() != null) {
            existingCategory.setName(category.getName());
          }
          if (category.getDescription() != null) {
            existingCategory.setDescription(category.getDescription());
          }

          return existingCategory;
        }).map(categoryRepository::save);

    return AppResponseUtil.wrapOrNotFound(result, null);
  }

  @GetMapping("/categories")
  public List<Category> getAllCategories() {
    log.debug("REST request to get all Categories");
    return categoryRepository.findAllSortByName();
  }

  @GetMapping("/categories/{id}")
  public ResponseEntity<Category> getCategory(@PathVariable Long id) {
    log.debug("REST request to get Category : {}", id);
    Optional<Category> category = categoryRepository.findById(id);
    return AppResponseUtil.wrapOrNotFound(category);
  }

  @DeleteMapping("/categories/{id}")
  public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
    log.debug("REST request to delete Category : {}", id);
    categoryRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}


class SortbyName implements Comparator<Category> {
  public int compare(Category a, Category b) {
    return a.getName().compareTo(b.getName());
  }
}
