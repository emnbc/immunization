import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../../../shared/http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'imm-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  bar: Observable<any>;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.bar = this.http.get<any>('analytics/register').pipe(map(res => {
      return res.body;
    }));
  }

  onSelect(event) {
    console.log(event);
  }

}
