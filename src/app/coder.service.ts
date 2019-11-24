import { Injectable } from '@angular/core';
import { Coder } from './coder';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CoderService {

  private codersUrl = 'api/coders'; //URL to the web api

  constructor(private messageService: MessageService,
              private http: HttpClient,
              
    ) { }

   

  getCoders(): Observable<Coder[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Coder[]>(this.codersUrl)
    .pipe(
      tap(_ => this.log('fetched coders')),
      catchError(this.handleError<Coder[]>('getCoders', []))
      );
  }
// Get coder by id. Return `undefined` when id not found
  getCoderNo404<Data>(id: number): Observable<Coder> {
    const url = `${this.codersUrl}/?id=${id}`;
    return this.http.get<Coder[]>(url)
    .pipe(
      map(coders => coders[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} coder id=${id}`);
      }),
      catchError(this.handleError<Coder>(`getCoder id=${id}`))
    );
  }

      /** GET hero by id. Will 404 if id not found */
  getCoder(id: number): Observable<Coder> {
    const url = `${this.codersUrl}/${id}`;
    return this.http.get<Coder>(url).pipe(
      tap(_ => this.log(`fetched coder id=${id}`)),
      catchError(this.handleError<Coder>(`getCoder id=${id}`))
    );
  }

  // GET coders whose name contains search term
searchCoders(term: string): Observable<Coder[]> {
  if (!term.trim()) {
    //if not search term, return empty coder array.
    return of([]);
  }
  return this.http.get<Coder[]>(`${this.codersUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found coders matching "${term}"`)),
    catchError(this.handleError<Coder[]>('searchCoders', []))
  );
}

//////////////////// SAVE METHODS \\\\\\\\\\\\\\\\\\\\\\\\\\

/** POST: add a new coder to the server */
addCoder (coder: Coder): Observable<Coder> {
  return this.http.post<Coder>(this.codersUrl, coder, httpOptions).pipe(
    tap((newCoder: Coder) => this.log(`added coder w/ id=${newCoder.id}`)),
    catchError(this.handleError<Coder>('addCoder'))
  );
}

// Delete the coder from the server
deleteCoder (coder: Coder | number): Observable<Coder> {
  const id = typeof coder === 'number' ? coder : coder.id;
  const url = `${this.codersUrl}/${id}`;

  return this.http.delete<Coder>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted coder id=${id}`)),
    catchError(this.handleError<Coder>('deleteCoder'))
  );
}

// PUT: update the coder on the server

updateCoder (coder: Coder): Observable<any>{
  return this.http.put(this.codersUrl, coder, httpOptions).pipe(
    tap(_ => this.log(`updated coder id=${coder.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
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

 /** Log a CoderService message with the MessageService */
 private log(message: string) {
  this.messageService.add(`CoderService: ${message}`);
  }

}
