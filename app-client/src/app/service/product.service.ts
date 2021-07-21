import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../entity/product.model';
import { catchError } from 'rxjs/operators';
import { createRequestOption } from './request-util';

export type EntityResponseType = HttpResponse<IProduct>;
export type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductService {

  //consume environment setting
  apiUrl = environment.apiUrl + 'api/products';

  constructor(protected http: HttpClient) {}

  create(product: IProduct): Observable<EntityResponseType> {
    return this.http.post<IProduct>(this.apiUrl, product, { observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Create Product Error.'); }) 
            );
  }

  update(product: IProduct): Observable<EntityResponseType> {
    return this.http.put<IProduct>(`${this.apiUrl}/${product.id}`, product, { observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Update Product Error.'); }) 
            );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`, { observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Find Product Error.'); }) 
            );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(this.apiUrl, { params: options, observe: 'response' });
  }

  getNameList(): Observable<EntityArrayResponseType> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/name-list`, { observe: 'response' });
  }
}
