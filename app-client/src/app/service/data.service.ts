import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

  //consume environment setting
  apiUrl = environment.apiUrl + 'api/';

  constructor(private http: HttpClient) { }

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

  public retrieveCategorieList(): Observable<any> {
    return this.http.get<ICategory[]>(this.apiUrl + 'categories')
      .pipe( 
        catchError(error => {  return throwError('Retrieve categories fail.'); }) 
      );
  }
}

// query(req?: any): Observable<EntityArrayResponseType> {
//   const options = createRequestOption(req);
//   return this.http.get<ICategory[]>(this.resourceUrl, { params: options, observe: 'response' });
// }