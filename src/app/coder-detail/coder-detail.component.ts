import { Component, OnInit, Input } from '@angular/core';
import { Coder } from '../coder';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CoderService }  from '../coder.service';


@Component({
  selector: 'app-coder-detail',
  templateUrl: './coder-detail.component.html',
  styleUrls: ['./coder-detail.component.css']
})



export class CoderDetailComponent implements OnInit {
  @Input() coder: Coder;
  
  constructor(
    private route: ActivatedRoute,
    private coderService: CoderService,
    private location: Location) { }

  ngOnInit(): void {
    this.getCoder();
  }

  getCoder(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.coderService.getCoder(id).
    subscribe(coder => this.coder = coder);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.coderService.updateCoder(this.coder)
    .subscribe(() => this.goBack());
  }
}
