import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tag } from './tag';
import { MessageService } from './message.service';
import { Config } from './config';

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
    private messageService: MessageService
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
    return this.http.put(this.url, tag, this.httpOptions).pipe(
      tap(_ => this.log(`updated tag id=${tag.id}`)),
      catchError(this.handleError<any>('updateTag'))
    );
  }

  /** POST: add a new hero to the server */
  addTag (tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.url, tag, this.httpOptions).pipe(
      tap((tag: Tag) => this.log(`added tag w/ id=${tag.id}`)),
      catchError(this.handleError<Tag>('addTag'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTag (tag: Tag | number): Observable<Tag> {
    const id = typeof tag === 'number' ? tag : tag.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Tag>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted tag id=${id}`)),
      catchError(this.handleError<Tag>('deleteTag'))
    );
  }

  // /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  //     tap(_ => this.log(`found heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }

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
