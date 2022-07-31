import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-type',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class InputTypeComponent {

  @Input() name: string;
}
