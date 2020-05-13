import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  login(authData: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, authData);
  }

  get<T>(url: string, paramsList?: Param[]): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${environment.apiUrl}/${url}`, { observe: 'response', ...paramsList && {params: this.setParams(paramsList)} });
  }

  post<T>(url: string, body: T): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/${url}`, body);
  }

  put<T>(url: string, id: string, body: T): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/${url}/${id}`, body);
  }

  postArtist<T>(body: T): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/artists`, body);
  }

  putArtist<T>(id: string, body: T): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/artists/${id}`, body);
  }

  deleteArtist(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/artists/${id}`);
  }

  setParams(paramsList?: Param[]): any {
    let params = new HttpParams();
    for(const param of paramsList) {
      if(param.value) params = params.set(param.key, param.value.toString());
    }
    return params;
  }

}

export interface Param {
  key: string;
  value: string | number;
}
