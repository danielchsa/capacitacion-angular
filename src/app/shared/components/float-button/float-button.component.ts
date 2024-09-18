import { Component, inject } from '@angular/core';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-float-button',
  standalone: true,
  imports: [],
  templateUrl: './float-button.component.html',
  styleUrl: './float-button.component.css'
})
export class FloatButtonComponent {
  private locationService = inject( LocationService)

  cleanLocations() {
    this.locationService.cleanAllLocations()
  }
}
