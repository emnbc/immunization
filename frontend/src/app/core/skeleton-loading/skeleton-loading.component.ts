import { Component, Input } from '@angular/core';

@Component({
  selector: 'skeleton-loading',
  template: `<div class="loader" [style.width]="width" [style.opacity]="opacity"></div>`,
  styleUrls: ['./skeleton-loading.component.scss']
})
export class SkeletonLoadingComponent {

  @Input() width?: string = '100%';
  @Input() opacity?: string = '0.05';

}
