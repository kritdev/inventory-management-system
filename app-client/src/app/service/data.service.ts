import { Injectable } from '@angular/core';
import { ICategory } from '../entity/category.model';
import { IInventoryTransactionItem } from '../entity/inventory-transaction-item.model';
import { IProductSummary } from '../entity/product-summary.model';
import { IProduct } from '../entity/product.model';
import { UnitOfMeasure } from '../entity/unit-of-measure.model';
import { sampleProductDataList } from './sample-product-data';
import { sampleTransactionByProductDataList } from './sample-transaction-log-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public retrieveProductList(): IProduct[] {
    return sampleProductDataList;
  }

  public retrieveProductSummary(productId: number): IProductSummary {
    return sampleProductDataList[productId - 101];
  }

  public retrieveProductSummaryList(): IProductSummary[] {
    return sampleProductDataList;
  }

  public retrieveTransactionLogByProductId(productId: number): IInventoryTransactionItem[] {
    return sampleTransactionByProductDataList;
  }

  public retrieveUnitOfMeasureList(): UnitOfMeasure[] {
    return [
      {id:401, name:'pcs.'},
      {id:402, name:'boxes'},
      {id:403, name:'packs'},
    ]
  }

  public retrieveCategorieList(): ICategory[] {
    return [
      {id:301, name:'Chair'},
      {id:302, name:'Table'},
      {id:303, name:'Decorating'},
    ]
  }
}
