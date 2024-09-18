import { inject, Injectable } from "@angular/core";
import { delay, map, Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http'
import { Response } from "../shared/models/response.interface";

@Injectable({
    providedIn: 'root',
})
export class MainService{
    private readonly BASE_URL: string = 'https://api.open-meteo.com/v1/forecast';
    private http = inject(HttpClient)

    private executeQuery<T>(url: string, params: HttpParams): Observable<T> {
        return this.http.get<T>(url, {params})
    }

    private prepareParams(lat: number, lng: number) {
        return new HttpParams()
                .set('latitude', lat.toString())
                .set('longitude', lng.toString())
                .set('current', 'temperature_2m,apparent_temperature,precipitation,rain')
                .set('hourly', 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation')
                .set('timezone', 'auto');
    }

    public getWeatherData(lat: number, lng: number): Observable<{ temperature: number[], apparent_temperature: number[], precipitation: number[] }> {
        const params = this.prepareParams(lat, lng);

        return this.executeQuery<Response>(this.BASE_URL, params).pipe(
            delay(2000),
            map((response: any) => ({
                temperature: response.hourly.temperature_2m,
                apparent_temperature: response.hourly.apparent_temperature,
                precipitation: response.hourly.precipitation
            })))
    }
}