import { Component, Input } from '@angular/core';


@Component({
  selector: 'ng-lazy-progress',
  template: `
    <div class="lazy-progress-bar">
      <div [style.backgroundColor]="color" [ngClass]="progress"></div>
    </div>
  `,
  styleUrls: ['./lazy-progress.component.scss']
})
export class NgLazyProgressComponent {

  /**
   * Color of progress bar, string value
   */
  @Input() color?: string = '#007bff';

  /**
   * State of progress bar, can only take the string value "start" or "end"
   */
  @Input() progress?: string = null;

  start() { this.progress = 'start'; }
  end() { this.progress = 'end'; }

}
