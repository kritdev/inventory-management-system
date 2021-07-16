import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../entity/product.model';

export type EntityResponseType = HttpResponse<IProduct>;
export type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductService {

  //consume environment setting
  apiUrl = environment.apiUrl + 'api/products';

  constructor(protected http: HttpClient) {}

  create(product: IProduct): Observable<EntityResponseType> {
    return this.http.post<IProduct>(this.apiUrl, product, { observe: 'response' });
  }

  update(product: IProduct): Observable<EntityResponseType> {
    return this.http.put<IProduct>(`${this.apiUrl}/${product.id}`, product, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`, { observe: 'response' });
  }
}
