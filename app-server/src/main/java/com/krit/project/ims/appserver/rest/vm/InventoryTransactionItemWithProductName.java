package com.krit.project.ims.appserver.rest.vm;

import java.time.LocalDate;

public interface InventoryTransactionItemWithProductName {
  public Long getId();

  public LocalDate getTransactionDate();

  public Integer getItemCount();

  public String getDescription();

  public ProductName getProduct();

}
