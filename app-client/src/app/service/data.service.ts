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

  public retrieveUnitOfMeasureList(): Observable<any> {
    return this.http.get<ICategory[]>(this.apiUrl + 'unit-of-measures')
      .pipe( 
        catchError(error => {  return throwError('Retrieve unit of measures fail.'); }) 
      );
  }

  public retrieveCategorieList(): Observable<any> {
    return this.http.get<ICategory[]>(this.apiUrl + 'categories')
      .pipe( 
        catchError(error => {  return throwError('Retrieve categories fail.'); }) 
      );
  }
}
