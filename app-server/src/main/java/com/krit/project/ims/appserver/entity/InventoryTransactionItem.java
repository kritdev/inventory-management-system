package com.krit.project.ims.appserver.entity;

import java.io.Serializable;
import java.time.LocalDate;
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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A InventoryTransactionItem.
 */
@Entity
@Table(name = "inventory_transaction_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InventoryTransactionItem implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
  @SequenceGenerator(name = "sequenceGenerator")
  private Long id;

  @NotNull
  @Column(name = "transaction_date", nullable = false)
  private LocalDate transactionDate;

  @NotNull
  @Column(name = "item_count", nullable = false)
  private Integer itemCount;

  @Column(name = "description")
  private String description;

  @ManyToOne
  @JsonIgnoreProperties(value = {"category", "unitOfMeasure"}, allowSetters = true)
  private Product product;

  // jhipster-needle-entity-add-field - JHipster will add fields here
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public InventoryTransactionItem id(Long id) {
    this.id = id;
    return this;
  }

  public LocalDate getTransactionDate() {
    return this.transactionDate;
  }

  public InventoryTransactionItem transactionDate(LocalDate transactionDate) {
    this.transactionDate = transactionDate;
    return this;
  }

  public void setTransactionDate(LocalDate transactionDate) {
    this.transactionDate = transactionDate;
  }

  public Integer getItemCount() {
    return this.itemCount;
  }

  public InventoryTransactionItem itemCount(Integer itemCount) {
    this.itemCount = itemCount;
    return this;
  }

  public void setItemCount(Integer itemCount) {
    this.itemCount = itemCount;
  }

  public String getDescription() {
    return this.description;
  }

  public InventoryTransactionItem description(String description) {
    this.description = description;
    return this;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Product getProduct() {
    return this.product;
  }

  public InventoryTransactionItem product(Product product) {
    this.setProduct(product);
    return this;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof InventoryTransactionItem)) {
      return false;
    }
    return id != null && id.equals(((InventoryTransactionItem) o).id);
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
    return "InventoryTransactionItem{" + "id=" + getId() + ", transactionDate='"
        + getTransactionDate() + "'" + ", itemCount=" + getItemCount() + ", description='"
        + getDescription() + "'" + "}";
  }
}
