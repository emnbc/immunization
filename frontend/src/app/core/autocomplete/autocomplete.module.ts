import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule { }
