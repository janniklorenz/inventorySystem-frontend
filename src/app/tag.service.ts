import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tag } from './tag';
import { MessageService } from './message.service';
import { Config } from './config';
import { RequestCacheService } from './request-cache.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private url = Config.api_url + '/api/tag';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cache: RequestCacheService,
  ) { }

  getTags (): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.url).pipe(
      tap(_ => this.log('fetched tags')),
      catchError(this.handleError('getTags', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getTag(id: number): Observable<Tag> {
    const url = `${this.url}/${id}`;
    return this.http.get<Tag>(url).pipe(
      tap(_ => this.log(`fetched tag id=${id}`)),
      catchError(this.handleError<Tag>(`getTag id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateTag (tag: Tag): Observable<any> {
    this.clearCache();
    return this.http.put(this.url, tag, this.httpOptions).pipe(
      tap(_ => this.log(`updated tag id=${tag.id}`)),
      catchError(this.handleError<any>('updateTag'))
    );
  }

  /** POST: add a new hero to the server */
  addTag (tag: Tag): Observable<Tag> {
    this.clearCache();
    return this.http.post<Tag>(this.url, tag, this.httpOptions).pipe(
      tap((tag: Tag) => this.log(`added tag w/ id=${tag.id}`)),
      catchError(this.handleError<Tag>('addTag'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTag (tag: Tag | number): Observable<Tag> {
    this.clearCache();
    const id = typeof tag === 'number' ? tag : tag.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Tag>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted tag id=${id}`)),
      catchError(this.handleError<Tag>('deleteTag'))
    );
  }

  private clearCache() {
    this.cache.clear("api/tag");
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

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TagService: ${message}`);
  }


}
