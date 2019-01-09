import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Location } from './location';
import { MessageService } from './message.service';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private url = Config.api_url + '/api/location';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.url).pipe(
      tap(_ => this.log('fetched locations')),
      catchError(this.handleError('getLocations', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getLocation(id: number): Observable<Location> {
    const url = `${this.url}/${id}`;
    return this.http.get<Location>(url).pipe(
      tap(_ => this.log(`fetched location id=${id}`)),
      catchError(this.handleError<Location>(`getLocation id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateLocation (location: Location): Observable<any> {
    return this.http.put(this.url, location, this.httpOptions).pipe(
      tap(_ => this.log(`updated location id=${location.id}`)),
      catchError(this.handleError<any>('updateLocation'))
    );
  }

  /** POST: add a new hero to the server */
  addLocation (location: Location): Observable<Location> {
    return this.http.post<Location>(this.url, location, this.httpOptions).pipe(
      tap((location: Location) => this.log(`added location w/ id=${location.id}`)),
      catchError(this.handleError<Location>('addLocation'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteLocation (location: Location | number): Observable<Location> {
    const id = typeof location === 'number' ? location : location.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Location>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted location id=${id}`)),
      catchError(this.handleError<Location>('deleteLocation'))
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

      // TODO: better job of transforming error for location consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`LocationService: ${message}`);
  }


}
