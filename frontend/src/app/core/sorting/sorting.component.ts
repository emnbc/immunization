import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {

  @Input() field: string = null;
  @Input() currentState: string = null;
  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  getSorting(): void {
    if(!this.currentState) {
      this.result.emit(`${this.field},asc`);
    } else {
      if(this.currentState.split(',')[0] === this.field && this.currentState.split(',')[1] === 'asc') {
        this.result.emit(`${this.field},desc`);
      } else if(this.currentState.split(',')[0] === this.field && this.currentState.split(',')[1] === 'desc') {
        this.result.emit(`${this.field},asc`);
      } else {
        this.result.emit(`${this.field},asc`);
      }
    }
  }

  direction(direct: string): boolean {
    if(this.currentState) {
      switch(direct) {
        case 'UpDown': 
          if(this.currentState.split(',')[0] !== this.field) return true;
          else return false;
        case 'Up':
          if(this.currentState.split(',')[0] === this.field && this.currentState.split(',')[1] === 'desc') return true;
          else return false;
        case 'Down':
          if(this.currentState.split(',')[0] === this.field && this.currentState.split(',')[1] === 'asc') return true;
          else return false;
      }
    } else {
      if(direct === 'UpDown') return true;
      else return false;
    }
  }

}
