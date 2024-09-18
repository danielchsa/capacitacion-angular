import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import * as Highcharts from 'highcharts';
import { MainService } from "../../services/main.service";
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { LocationService } from "../../services/location.service";
import { dateRange, getDayNamesForNextDays } from "../../shared/utils/dates";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { Location } from "../../shared/models/location.interface";

@Component({
    selector: '',
    standalone: true,
    imports: [ModalComponent, CommonModule, LoaderComponent],
    templateUrl: './index.component.html',
    styles: `
        .example{
            padding: 1rem 0;
            max-width: 100%;
            word-break: break-all;
        }
    `,
})
export class IndexComponent implements OnInit, AfterViewInit{
    private chart!: Highcharts.Chart;
    location: Location = {
        id: '',
        name: '',
        lat: 0,
        lng: 0
    }

    temperatures: number[] = []
    apparentTemperatures: number[] = []
    precipitations: number[] = []


    @ViewChild(ModalComponent) modal!: ModalComponent
    @ViewChild(LoaderComponent) loader!: LoaderComponent

    constructor(public mainServ: MainService, private locationService: LocationService) {
        this.location = locationService.getLocations()[0]
    }

    ngOnInit(): void {
       this.locationService.currentLocation$.subscribe( x => {
        this.location = x
        this.getWeatherFromLocation(x)
       })
       this.getWeatherFromLocation(this.location)
       this.initGraph()            
    }

    ngAfterViewInit(): void {
        this.loader.startLoading()
    }

    initGraph() {
        this.chart = Highcharts.chart('graph', {
            title: {
                text: 'Pronóstico de clima (x días)'
            },
            subtitle: {
                text: dateRange()
            },
            xAxis: {
                categories: getDayNamesForNextDays(5),
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: [
                {
                    name: 'Temperatura',
                    data: this.temperatures,
                    type: "line",

                },
                {
                    name: 'Sensación térmica',
                    data: this.apparentTemperatures,
                    type: "line"
                },
                {
                    name: 'Precipitación',
                    data: this.precipitations,
                    type: "column"
                }
            ],
            credits: {
                enabled: false
            }
        });
    }

    getWeatherFromLocation(x: Location) {
        this.loader?.startLoading()
        this.mainServ.getWeatherData(x.lat, x.lng).subscribe( data => {
            this.temperatures = data.temperature.slice(0, 5);
            this.apparentTemperatures = data.apparent_temperature.slice(0, 5);
            this.precipitations = data.precipitation.slice(0, 5);
            this.updateGraph()
            this.loader.stopLoading()
        })
        
    }

    updateGraph() {
        if (this.chart) {
            this.chart.series[0].setData(this.temperatures)
            this.chart.series[1].setData(this.apparentTemperatures)
            this.chart.series[2].setData(this.precipitations)
        }
    }

    handleClick(){
        this.modal.openModal()
    }
}
