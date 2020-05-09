import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonLoadingComponent } from './skeleton-loading.component';

@NgModule({
  declarations: [SkeletonLoadingComponent],
  imports: [CommonModule],
  exports: [SkeletonLoadingComponent]
})
export class SkeletonLoadingModule { }
