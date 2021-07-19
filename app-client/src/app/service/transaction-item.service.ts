import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { createRequestOption } from './request-util';
import { IInventoryTransactionItem } from '../entity/inventory-transaction-item.model';

export type EntityResponseType = HttpResponse<IInventoryTransactionItem>;
export type EntityArrayResponseType = HttpResponse<IInventoryTransactionItem[]>;

@Injectable({ providedIn: 'root' })
export class TransactionItemService {

  //consume environment setting
  apiUrl = environment.apiUrl + 'api/transaction-items';

  constructor(protected http: HttpClient) {}

  create(transactionItem: IInventoryTransactionItem): Observable<EntityResponseType> {
    return this.http.post<IInventoryTransactionItem>(this.apiUrl, transactionItem, { observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Create InventoryTransactionItem Error.'); }) 
            );
  }

  update(transactionItem: IInventoryTransactionItem): Observable<EntityResponseType> {
    return this.http.put<IInventoryTransactionItem>(`${this.apiUrl}/${transactionItem.id}`, transactionItem, { observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Update InventoryTransactionItem Error.'); }) 
            );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInventoryTransactionItem>(`${this.apiUrl}/${id}`, { observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Find InventoryTransactionItem Error.'); }) 
            );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInventoryTransactionItem[]>(this.apiUrl, { params: options, observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Query InventoryTransactionItem Error.'); }) 
            );
  }
}
