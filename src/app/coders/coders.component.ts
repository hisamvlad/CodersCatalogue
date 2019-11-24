import { Component, OnInit } from '@angular/core';
import { Coder } from '../coder';
import { CoderService } from '../coder.service';




@Component({
  selector: 'app-coders',
  templateUrl: './coders.component.html',
  styleUrls: ['./coders.component.css']
})
export class CodersComponent implements OnInit {
 coders: Coder[];

  

  constructor(private coderService: CoderService) { }

  ngOnInit() {
    this.getCoders();
  }

 

  getCoders(): void {
    this.coderService.getCoders()
    .subscribe(coders => this.coders = coders);

  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.coderService.addCoder({ name } as Coder )
     .subscribe(coder => {
       this.coders.push(coder);
     });
  }

  delete(coder: Coder): void {
    this.coders = this.coders.filter(h => h !== coder);
    this.coderService.deleteCoder(coder).subscribe();
  }

  



}
