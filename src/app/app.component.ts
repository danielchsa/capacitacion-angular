import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PillComponent } from './shared/components/pill/pill.component';
import { LocationService } from './services/location.service';
import { FloatButtonComponent } from './shared/components/float-button/float-button.component';
import { Location } from './shared/models/location.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PillComponent, FloatButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-final';
  private locationService = inject( LocationService )

  public pills: Location[] = [];

  get getPills() {
    return [ ...this.pills, ...this.locationService.getLocations() ]
  }

  pillSelected(pill: Location) {
    this.locationService.updateCurrentLocation(pill)
  }
}
