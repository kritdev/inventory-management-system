package com.krit.project.ims.appserver.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
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
import com.krit.project.ims.appserver.entity.Image;
import com.krit.project.ims.appserver.entity.Product;
import com.krit.project.ims.appserver.entity.repository.ImageRepository;
import com.krit.project.ims.appserver.entity.repository.ProductRepository;
import com.krit.project.ims.appserver.rest.errors.BadRequestAlertException;
import com.krit.project.ims.appserver.rest.vm.ProductName;

@RestController
@RequestMapping("/api")
@Transactional
public class ProductResource {

  private final Logger log = LoggerFactory.getLogger(ProductResource.class);

  private static final String ENTITY_NAME = "product";

  private final ProductRepository productRepository;
  private final ImageRepository imageRepository;

  public ProductResource(ProductRepository productRepository, ImageRepository imageRepository) {
    this.productRepository = productRepository;
    this.imageRepository = imageRepository;
  }

  @PostMapping("/products")
  public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product)
      throws URISyntaxException {
    log.debug("REST request to save Product : {}", product);
    if (product.getId() != null) {
      throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME,
          "idexists");
    }
    Product result = productRepository.save(product);
    saveProductImage(result, product.getImages());

    return ResponseEntity.created(new URI("/api/products/" + result.getId())).body(result);
  }

  @PutMapping("/products/{id}")
  public ResponseEntity<Product> updateProduct(
      @PathVariable(value = "id", required = false) final Long id,
      @Valid @RequestBody Product product) throws URISyntaxException {
    log.debug("REST request to update Product : {}, {}", id, product);
    if (product.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, product.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!productRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    Product result = productRepository.save(product);
    saveProductImage(result, product.getImages());

    return ResponseEntity.ok().body(result);
  }

  @PatchMapping(value = "/products/{id}", consumes = "application/merge-patch+json")
  public ResponseEntity<Product> partialUpdateProduct(
      @PathVariable(value = "id", required = false) final Long id,
      @NotNull @RequestBody Product product) throws URISyntaxException {
    log.debug("REST request to partial update Product partially : {}, {}", id, product);
    if (product.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, product.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!productRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    Optional<Product> result = productRepository.findById(product.getId()).map(existingProduct -> {
      if (product.getName() != null) {
        existingProduct.setName(product.getName());
      }
      if (product.getProductCode() != null) {
        existingProduct.setProductCode(product.getProductCode());
      }
      if (product.getBrand() != null) {
        existingProduct.setBrand(product.getBrand());
      }
      if (product.getDescription() != null) {
        existingProduct.setDescription(product.getDescription());
      }

      return existingProduct;
    }).map(productRepository::save);
    saveProductImage(result.get(), product.getImages());

    return AppResponseUtil.wrapOrNotFound(result, null);
  }

  @GetMapping("/products")
  public List<Product> getAllProducts() {
    log.debug("REST request to get all Products");
    return productRepository.findAll();
  }

  @GetMapping("/products/{id}")
  public ResponseEntity<Product> getProduct(@PathVariable Long id) {
    log.debug("REST request to get Product : {}", id);
    Optional<Product> product = productRepository.findById(id);
    return AppResponseUtil.wrapOrNotFound(product);
  }

  @DeleteMapping("/products/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    log.debug("REST request to delete Product : {}", id);
    productRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/products/name-list")
  public List<ProductName> getAllProductName() {
    log.debug("REST request to get all ProductName");
    return productRepository.findAllProductName();
  }

  private void saveProductImage(Product product, Set<Image> images) {
    // if product does not have id, throw error
    if (product.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }

    // if image does not have data, do not thing
    if (images == null || images.isEmpty()) {
      return;
    }

    // create parent product
    Product parent = new Product();
    parent.setId(product.getId());

    // save all images
    Set<Image> resultImages = new HashSet<>();
    for (Image image : images) {
      image.setProduct(parent);
      resultImages.add(imageRepository.save(image));
    }

    // update product
    product.setImages(resultImages);
  }
}
