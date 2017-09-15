import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {SensorService} from './services/sensor.service';
import {Sensor} from './model/sensor';
import {AgmMap} from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements AfterContentInit {

  title = 'RFID Web Locator';
  sensors: Sensor[] = [];
  geolocationPosition: Position;
  zoomLevel = 8;
  @ViewChild(AgmMap) public agmMap: AgmMap;

  constructor(private sensorSvc: SensorService) {
  }

  OnMapReady($event) {
    this.initCurrentLocation();
    this.sensorSvc.findAll().subscribe(data => this.sensors = data);
  }

  ngAfterContentInit(): void {
    this.repositionMap();
  }

  initCurrentLocation(): void {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;
          this.repositionMap();
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
  }

  private repositionMap() {
    if (this.geolocationPosition) {
      this.agmMap.latitude = this.geolocationPosition.coords.latitude;
      this.agmMap.longitude = this.geolocationPosition.coords.longitude;
    }
    this.agmMap.zoom = 6;
    this.agmMap.triggerResize(true);
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('map-wrapper').style.marginLeft = '250px';
    document.getElementById('map-wrapper').style.backgroundColor = 'rgba(0,0,0,0.4)';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('map-wrapper').style.marginLeft = '0';
    document.getElementById('map-wrapper').style.backgroundColor = 'white';
  }

  submitForm(form: any): void {
    if (form.rfid) {
      this.sensorSvc.findAllFor(form.rfid).subscribe(data => {
        this.sensors = data;
        this.repositionMap();
      });
    } else {
      this.sensorSvc.findAll().subscribe(data => {
        this.sensors = data;
        this.repositionMap();
      });
    }
  }
}
