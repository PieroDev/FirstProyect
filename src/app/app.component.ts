import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainViewComponent } from './views/Game/main-view/main-view.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  styles: [`body:{background-color: blue;}`]
})
export class AppComponent {
  title = 'FirstProyect';
}
