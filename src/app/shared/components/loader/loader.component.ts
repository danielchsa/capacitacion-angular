import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  loading = signal(false)

  startLoading() {
    this.loading.set(true)  // Usamos el método `set` para cambiar la señal
  }

  stopLoading() {
    this.loading.set(false)
  }
}
