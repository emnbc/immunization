import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styles: [` .on-front { z-index: 10; } .pointer { cursor: pointer; } `]
})
export class AutocompleteComponent implements OnInit {

  inputValue: string = null;
  isOpen: boolean = false;

  @Input() results: any;
  @Input() default?: string = null;
  @Input() loading?: boolean = false;
  @Input() handleSuggestion: (val: any) => string;

  @Output() outValue: EventEmitter<any> = new EventEmitter<string>();
  @Output() selectedValue: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.inputValue = this.default;
  }

  private listener: ReturnType<typeof setTimeout>;
  getSuggestions() {
    clearTimeout(this.listener);
    this.listener = setTimeout(() => {
      this.outValue.emit(this.inputValue);
    }, 500);
  }

  selected(val: any) {
    this.inputValue = this.handleSuggestion(val);
    this.selectedValue.emit(val);
  }

  focus() {
    this.isOpen = true;
    this.outValue.emit(this.inputValue);
  }

  focusOut() {
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
  }

}
