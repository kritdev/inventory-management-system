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
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A StockItem.
 * 
 * (Extracted from jhipster generated code)
 */
@Entity
@Table(name = "stock_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class StockItem implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
  @SequenceGenerator(name = "sequenceGenerator")
  private Long id;

  @Column(name = "count_in_stock")
  private Integer countInStock;

  @ManyToOne
  @JsonIgnoreProperties(value = {"images", "stockItems", "category", "unitOfMeasure"},
      allowSetters = true)
  private Product product;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public StockItem id(Long id) {
    this.id = id;
    return this;
  }

  public Integer getCountInStock() {
    return this.countInStock;
  }

  public StockItem countInStock(Integer countInStock) {
    this.countInStock = countInStock;
    return this;
  }

  public void setCountInStock(Integer countInStock) {
    this.countInStock = countInStock;
  }

  public Product getProduct() {
    return this.product;
  }

  public StockItem product(Product product) {
    this.setProduct(product);
    return this;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof StockItem)) {
      return false;
    }
    return id != null && id.equals(((StockItem) o).id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }

  // prettier-ignore
  @Override
  public String toString() {
    return "StockItem{" + "id=" + getId() + ", countInStock=" + getCountInStock() + "}";
  }
}
