import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Inventory } from './inventory';
import { MessageService } from './message.service';
import { Config } from './config';
import { RequestCacheService } from './request-cache.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private url = Config.api_url + '/api/inventory';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cache: RequestCacheService,
  ) { }

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.url).pipe(
      tap(_ => this.log('fetched inventory')),
      catchError(this.handleError('getInventory', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getItem(id: number): Observable<Inventory> {
    const url = `${this.url}/${id}`;
    return this.http.get<Inventory>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<Inventory>(`getItem id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateItem(item: Inventory): Observable<any> {
    this.clearCache();
    return this.http.put(this.url, item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /** POST: add a new hero to the server */
  addItem(item: Inventory): Observable<Inventory> {
    this.clearCache();
    return this.http.post<Inventory>(this.url, item, this.httpOptions).pipe(
      tap((item: Inventory) => this.log(`added item w/ id=${item.id}`)),
      catchError(this.handleError<Inventory>('addItem'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteItem(item: Inventory | number): Observable<Inventory> {
    this.clearCache();
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Inventory>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<Inventory>('deleteItem'))
    );
  }


  private clearCache() {
    this.cache.clear("api/inventory");
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for inventory consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`InventoryService: ${message}`);
  }


}
