package com.krit.project.ims.appserver.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A Image.
 * 
 * (Extracted from jhipster generated code)
 */
@Entity
@Table(name = "image")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Image implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
  @SequenceGenerator(name = "sequenceGenerator")
  private Long id;

  @Lob
  @Column(name = "image_data", nullable = false)
  private byte[] imageData;

  @Column(name = "image_data_content_type", nullable = false)
  private String imageDataContentType;

  @Column(name = "default_image")
  private Boolean defaultImage;

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

  public Image id(Long id) {
    this.id = id;
    return this;
  }

  public byte[] getImageData() {
    return this.imageData;
  }

  public Image imageData(byte[] imageData) {
    this.imageData = imageData;
    return this;
  }

  public void setImageData(byte[] imageData) {
    this.imageData = imageData;
  }

  public String getImageDataContentType() {
    return this.imageDataContentType;
  }

  public Image imageDataContentType(String imageDataContentType) {
    this.imageDataContentType = imageDataContentType;
    return this;
  }

  public void setImageDataContentType(String imageDataContentType) {
    this.imageDataContentType = imageDataContentType;
  }

  public Boolean getDefaultImage() {
    return this.defaultImage;
  }

  public Image defaultImage(Boolean defaultImage) {
    this.defaultImage = defaultImage;
    return this;
  }

  public void setDefaultImage(Boolean defaultImage) {
    this.defaultImage = defaultImage;
  }

  public Product getProduct() {
    return this.product;
  }

  public Image product(Product product) {
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
    if (!(o instanceof Image)) {
      return false;
    }
    return id != null && id.equals(((Image) o).id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }

  // prettier-ignore
  @Override
  public String toString() {
    return "Image{" + "id=" + getId() + ", imageData='" + getImageData() + "'"
        + ", imageDataContentType='" + getImageDataContentType() + "'" + ", defaultImage='"
        + getDefaultImage() + "'" + "}";
  }
}
