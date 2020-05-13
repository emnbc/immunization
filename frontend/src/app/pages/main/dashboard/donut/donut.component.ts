import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../../../shared/http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'imm-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {

  donut: Observable<any>;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.donut = this.http.get<any>('analytics/gender').pipe(map(res => {
      return res.body;
    }));
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }


}
