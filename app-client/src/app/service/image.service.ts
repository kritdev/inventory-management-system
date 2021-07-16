import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IImage } from '../entity/image.model';

export type EntityResponseType = HttpResponse<IImage>;
export type EntityArrayResponseType = HttpResponse<IImage[]>;

@Injectable({ providedIn: 'root' })
export class ImageService {
  
  //consume environment setting
  apiUrl = environment.apiUrl + 'api/';

  constructor(private http: HttpClient) {}

  create(image: IImage): Observable<EntityResponseType> {
    return this.http.post<IImage>(this.apiUrl, image, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IImage>(`${this.apiUrl}/${id}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.apiUrl}/${id}`, { observe: 'response' });
  }

}
