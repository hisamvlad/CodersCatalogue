import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Coder } from './coder';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const coders = [
    { id: 11, name: 'Javaman' },
    { id: 12, name: 'Crussader' },
    { id: 13, name: 'OAKie' },
    { id: 14, name: 'JavaScribble' },
    { id: 15, name: 'Rubyn' },
    { id: 16, name: 'Rrrrrrrrrrr' },
    { id: 17, name: 'Go-Go-Go-er' },
    { id: 18, name: 'Taylor Swift' },
    { id: 19, name: 'Scally' },
    { id: 20, name: 'Perlman' }
    ];
    return {coders};
  }

  // Overrides the genId method to ensure that a coder always has an id.
  // If the coders array is empty,
  // the method below returns the initial number (11).
  // if the coders array is not empty, the method below returns the highest
  // coder id + 1.
  
  genId(coders: Coder[]): number {
    return coders.length > 0 ? Math.max(...coders.map(coder => coder.id)) + 1 : 11;
  }
}