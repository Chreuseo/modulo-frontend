// app/core/services/base-service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  protected baseUrl: string = 'https://modulo.christopheuskirchen.de/api'; // Default API URL
  //protected baseUrl: string = 'http://localhost:8080/api'; // Default API URL

  constructor(protected router: Router,
    protected http: HttpClient) {}

  private getFullUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if(error.status === 401) {
      window.location.href = '/login';
    }
    if(error.status === 403) {
      window.alert('Ihre Berechtigungen reichen für diese Aktion nicht aus.');
    }
    return throwError(error);
  }

  protected get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.getFullUrl(endpoint), { params, withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  protected post<T>(endpoint: string, body: any, params?: { params: HttpParams }, options?: {
    headers?: HttpHeaders;
    observe?: "body";
    params?: HttpParams;
    reportProgress?: boolean
  }): Observable<T> {
    return this.http.post<T>(this.getFullUrl(endpoint), body, { ...options, withCredentials: true})
      .pipe(catchError(this.handleError));
  }

  protected put<T>(endpoint: string, body: any, options?: {
    headers?: HttpHeaders;
    observe?: 'body'; // specify 'body' or omit to use default
    params?: HttpParams;
    reportProgress?: boolean; // make sure not to include if you want T
  }): Observable<T> {
    return this.http.put<T>(this.getFullUrl(endpoint), body, { ...options, withCredentials: true})
      .pipe(catchError(this.handleError));
  }

  protected delete<T>(endpoint: string, options?: {
    headers?: HttpHeaders;
    observe?: 'body'; // specify 'body' or omit to use default
    params?: HttpParams;
    reportProgress?: boolean; // make sure not to include if you want T
  }): Observable<T> {
    return this.http.delete<T>(this.getFullUrl(endpoint), { ...options, withCredentials: true})
      .pipe(catchError(this.handleError));
  }

  protected getBlob(endpoint: string, params?: { params: HttpParams }): Observable<Blob> {
    return this.http.get(this.getFullUrl(endpoint), { responseType: 'blob', withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  protected mapToModel<T>(DataSource: Observable<any>, model: new (...args: any[]) => T): Observable<T> {
    return DataSource.pipe(map(data => new model(data)));
  }
}
