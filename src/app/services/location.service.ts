import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Location } from '../shared/models/location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private localStorageKey = 'ubicaciones';
  currentLocation: Subject<Location> = new Subject()
  currentLocation$: Observable<Location> = this.currentLocation.asObservable()

    locations: Location[] = [
        {
            id: '1',
            name: 'Nicaragua - Managua',
            lat: 12.375,
            lng: -86.875
        },
        {
            id: '2',
            name: 'Costa Rica - Cartago',
            lat: 9.865410845819426,
            lng: -83.92289753683127
        },
        {
            id: '3',
            name: 'Colombia - Bogotá',
            lat: 4.6533816,
            lng: -74.0836333
        },
        {
            id: '4',
            name: 'México - Ciudad de México',
            lat: 19.425712204515243,
            lng:  -99.1381335906965
        }
    ]

    getLocations(): Location[] {
        const locations = localStorage.getItem(this.localStorageKey);
        return locations ? JSON.parse(locations) : this.locations;
      }
    
    newLocation(nueva: Location): void {
      const ubicaciones = this.getLocations();
      ubicaciones.push({...nueva, id: (ubicaciones.length+1).toString() });
      localStorage.setItem(this.localStorageKey, JSON.stringify(ubicaciones));
    }

    cleanAllLocations(): void {
      localStorage.removeItem(this.localStorageKey);
      this.locations = []
    }

    updateCurrentLocation(location: Location) {
      this.currentLocation.next(location)
    }
}
