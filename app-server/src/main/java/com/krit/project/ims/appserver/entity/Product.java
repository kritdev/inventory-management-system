package com.krit.project.ims.appserver.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Product.
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

  // jhipster-needle-entity-add-field - JHipster will add fields here
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

  // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

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
    // see
    // https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
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
