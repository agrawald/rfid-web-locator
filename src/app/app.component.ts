import {Component} from '@angular/core';
import {SensorService} from './services/sensor.service';
import {Sensor} from './model/sensor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title = 'RFID Web Locator';

  constructor(private sensorSvc: SensorService) {
    this.sensorSvc.getAll().subscribe(data => {
      console.log(data);
      this.sensors = data;
    });
  }

  sensors: Sensor[] = [];
}
