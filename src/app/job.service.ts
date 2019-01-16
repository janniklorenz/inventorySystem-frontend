import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Job } from './job';
import { MessageService } from './message.service';
import { Config } from './config';
import { RequestCacheService } from './request-cache.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private url = Config.api_url + '/api/job';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cache: RequestCacheService,
  ) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.url).pipe(
      tap(_ => this.log('fetched jobs')),
      catchError(this.handleError('getJobs', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getJob(id: number): Observable<Job> {
    const url = `${this.url}/${id}`;
    return this.http.get<Job>(url).pipe(
      tap(_ => this.log(`fetched job id=${id}`)),
      catchError(this.handleError<Job>(`getJob id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateJob (job: Job): Observable<any> {
    this.clearCache();
    return this.http.put(this.url, job, this.httpOptions).pipe(
      tap(_ => this.log(`updated job id=${job.id}`)),
      catchError(this.handleError<any>('updateJob'))
    );
  }

  /** POST: add a new hero to the server */
  addJob (job: Job): Observable<Job> {
    this.clearCache();
    return this.http.post<Job>(this.url, job, this.httpOptions).pipe(
      tap((job: Job) => this.log(`added job w/ id=${job.id}`)),
      catchError(this.handleError<Job>('addJob'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteJob (job: Job | number): Observable<Job> {
    this.clearCache();
    const id = typeof job === 'number' ? job : job.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Job>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted job id=${id}`)),
      catchError(this.handleError<Job>('deleteJob'))
    );
  }

  private clearCache() {
    this.cache.clear("api/job");
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

      // TODO: better job of transforming error for job consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`JobService: ${message}`);
  }


}
