import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-flex-test',
  imports: [ButtonModule],
  template: `
<div class="div1 flex gap-6 space-x-4">
  <div class="divx w-64 flex-none ...">01</div>
  <div class="divx w-64 flex-1 ...">02</div>
  <div class="divx w-64 flex-1 ...">03</div>
</div>

  `,
  styles: [`
    .div1{
      width: 100vw;
    }
    .divx{
      background-color: lightblue;
    }
    `]
})
export class FlexTestComponent {

}
