import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IImage } from '../entity/image.model';
import { catchError } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<IImage>;
export type EntityArrayResponseType = HttpResponse<IImage[]>;

@Injectable({ providedIn: 'root' })
export class ImageService {
  
  //consume environment setting
  apiUrl = environment.apiUrl + 'api/images';

  constructor(private http: HttpClient) {}

  create(image: IImage): Observable<EntityResponseType> {
    return this.http.post<IImage>(this.apiUrl, image, { observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Create image Error.'); }) 
            );
  }

  update(image: IImage): Observable<EntityResponseType> {
    return this.http.put<IImage>(`${this.apiUrl}/${image.id}`, image, { observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Update image Error.'); }) 
            );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IImage>(`${this.apiUrl}/${id}`, { observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Find image Error.'); }) 
            );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.apiUrl}/${id}`, { observe: 'response' })
            .pipe( 
              catchError(error => {  return throwError('Delete image Error.'); }) 
            );
  }

}
