import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Group } from './group';
import { MessageService } from './message.service';
import { Config } from './config';
import { RequestCacheService } from './request-cache.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private url = Config.api_url + '/api/group';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cache: RequestCacheService,
  ) { }

  getGroups (): Observable<Group[]> {
    return this.http.get<Group[]>(this.url).pipe(
      tap(_ => this.log('fetched groups')),
      catchError(this.handleError('getGroups', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getGroup(id: number): Observable<Group> {
    const url = `${this.url}/${id}`;
    return this.http.get<Group>(url).pipe(
      tap(_ => this.log(`fetched group id=${id}`)),
      catchError(this.handleError<Group>(`getGroup id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateGroup (group: Group): Observable<any> {
    this.clearCache();
    return this.http.put(this.url, group, this.httpOptions).pipe(
      tap(_ => this.log(`updated group id=${group.id}`)),
      catchError(this.handleError<any>('updateGroup'))
    );
  }

  /** POST: add a new hero to the server */
  addGroup (group: Group): Observable<Group> {
    this.clearCache();
    return this.http.post<Group>(this.url, group, this.httpOptions).pipe(
      tap((group: Group) => this.log(`added group w/ id=${group.id}`)),
      catchError(this.handleError<Group>('addGroup'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteGroup (group: Group | number): Observable<Group> {
    this.clearCache();
    const id = typeof group === 'number' ? group : group.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Group>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted group id=${id}`)),
      catchError(this.handleError<Group>('deleteGroup'))
    );
  }

  private clearCache() {
    this.cache.clear("api/group");
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
    this.messageService.add(`GroupService: ${message}`);
  }


}
