import { Component, OnInit } from '@angular/core';
import { Coder } from '../coder';
import { CoderService } from '../coder.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  coders: Coder[] = [];
 
  constructor(private coderService: CoderService) { }
 
  ngOnInit() {
    this.getCoders();
  }
 
  getCoders(): void {
    this.coderService.getCoders()
      .subscribe(coders => this.coders = coders.slice(1, 5));
  }
}