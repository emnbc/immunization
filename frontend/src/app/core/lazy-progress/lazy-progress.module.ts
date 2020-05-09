import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLazyProgressComponent } from './lazy-progress.component';

@NgModule({
  declarations: [NgLazyProgressComponent],
  imports: [CommonModule],
  exports: [NgLazyProgressComponent],
  providers: []
})
export class NgLazyProgressModule { }
