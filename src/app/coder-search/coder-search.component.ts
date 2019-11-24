import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';


import { Coder } from '../coder';
import { CoderService } from '../coder.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-coder-search',
  templateUrl: './coder-search.component.html',
  styleUrls: ['./coder-search.component.css']
})
export class CoderSearchComponent implements OnInit {
coders$: Observable<Coder[]>;
private searchTerms = new Subject<string>();


  constructor(private coderService: CoderService) { }
// Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.coders$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.coderService.searchCoders(term)),
    );
  }

}
