package com.krit.project.ims.appserver.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A Product.
 * 
 * (Extracted from jhipster generated code)
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
  @SequenceGenerator(name = "sequenceGenerator")
  private Long id;

  @NotNull
  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @Column(name = "product_code")
  private String productCode;

  @Column(name = "brand")
  private String brand;

  @Column(name = "description")
  private String description;

  @ManyToOne
  private Category category;

  @ManyToOne
  private UnitOfMeasure unitOfMeasure;

  @OneToMany(mappedBy = "product")
  @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
  @JsonIgnoreProperties(value = {"product"}, allowSetters = true)
  private Set<Image> images = new HashSet<>();

  @OneToMany(mappedBy = "product")
  @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
  @JsonIgnoreProperties(value = {"product"}, allowSetters = true)
  private Set<StockItem> stockItems = new HashSet<>();

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Product id(Long id) {
    this.id = id;
    return this;
  }

  public String getName() {
    return this.name;
  }

  public Product name(String name) {
    this.name = name;
    return this;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getProductCode() {
    return this.productCode;
  }

  public Product productCode(String productCode) {
    this.productCode = productCode;
    return this;
  }

  public void setProductCode(String productCode) {
    this.productCode = productCode;
  }

  public String getBrand() {
    return this.brand;
  }

  public Product brand(String brand) {
    this.brand = brand;
    return this;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public String getDescription() {
    return this.description;
  }

  public Product description(String description) {
    this.description = description;
    return this;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Category getCategory() {
    return this.category;
  }

  public Product category(Category category) {
    this.setCategory(category);
    return this;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public UnitOfMeasure getUnitOfMeasure() {
    return this.unitOfMeasure;
  }

  public Product unitOfMeasure(UnitOfMeasure unitOfMeasure) {
    this.setUnitOfMeasure(unitOfMeasure);
    return this;
  }

  public void setUnitOfMeasure(UnitOfMeasure unitOfMeasure) {
    this.unitOfMeasure = unitOfMeasure;
  }

  public Set<Image> getImages() {
    return this.images;
  }

  public Product images(Set<Image> images) {
    this.setImages(images);
    return this;
  }

  public Product addImages(Image image) {
    this.images.add(image);
    image.setProduct(this);
    return this;
  }

  public Product removeImages(Image image) {
    this.images.remove(image);
    image.setProduct(null);
    return this;
  }

  public void setImages(Set<Image> images) {
    if (this.images != null) {
      this.images.forEach(i -> i.setProduct(null));
    }
    if (images != null) {
      images.forEach(i -> i.setProduct(this));
    }
    this.images = images;
  }

  public Set<StockItem> getStockItems() {
    return this.stockItems;
  }

  public Product stockItems(Set<StockItem> stockItems) {
    this.setStockItems(stockItems);
    return this;
  }

  public Product addStockItems(StockItem stockItem) {
    this.stockItems.add(stockItem);
    stockItem.setProduct(this);
    return this;
  }

  public Product removeStockItems(StockItem stockItem) {
    this.stockItems.remove(stockItem);
    stockItem.setProduct(null);
    return this;
  }

  public void setStockItems(Set<StockItem> stockItems) {
    if (this.stockItems != null) {
      this.stockItems.forEach(i -> i.setProduct(null));
    }
    if (stockItems != null) {
      stockItems.forEach(i -> i.setProduct(this));
    }
    this.stockItems = stockItems;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Product)) {
      return false;
    }
    return id != null && id.equals(((Product) o).id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }

  // prettier-ignore
  @Override
  public String toString() {
    return "Product{" + "id=" + getId() + ", name='" + getName() + "'" + ", productCode='"
        + getProductCode() + "'" + ", brand='" + getBrand() + "'" + ", description='"
        + getDescription() + "'" + "}";
  }
}
