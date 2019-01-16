import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Device } from './device';
import { MessageService } from './message.service';
import { Config } from './config';
import { RequestCacheService } from './request-cache.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private url = Config.api_url + '/api/device';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cache: RequestCacheService,
  ) { }

  getDevices (): Observable<Device[]> {
    return this.http.get<Device[]>(this.url).pipe(
      tap(_ => this.log('fetched devices')),
      catchError(this.handleError('getDevices', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getDevice(id: number): Observable<Device> {
    const url = `${this.url}/${id}`;
    return this.http.get<Device>(url).pipe(
      tap(_ => this.log(`fetched device id=${id}`)),
      catchError(this.handleError<Device>(`getDevice id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateDevice(device: Device): Observable<any> {
    this.clearCache();
    return this.http.put(this.url, device, this.httpOptions).pipe(
      tap(_ => this.log(`updated device id=${device.id}`)),
      catchError(this.handleError<any>('updateDevice'))
    );
  }

  /** POST: add a new hero to the server */
  addDevice(device: Device): Observable<Device> {
    this.clearCache();
    return this.http.post<Device>(this.url, device, this.httpOptions).pipe(
      tap((device: Device) => this.log(`added device w/ id=${device.id}`)),
      catchError(this.handleError<Device>('addDevice'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteDevice (device: Device | number): Observable<Device> {
    this.clearCache();
    // if(confirm("Gerät '"+device.name+"' sowie alle Instanzen davon löschen?")) {
      const id = typeof device === 'number' ? device : device.id;
      const url = `${this.url}/${id}`;

      return this.http.delete<Device>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted device id=${id}`)),
        catchError(this.handleError<Device>('deleteDevice'))
      );
    // }
    // TODO if we use confirm here, return observable
  }



  private clearCache() {
    this.cache.clear("api/device");
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
    this.messageService.add(`DeviceService: ${message}`);
  }




}
