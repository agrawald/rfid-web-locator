import {Injectable} from '@angular/core';
import {Sensor} from '../model/sensor';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class SensorService {
  private queryParams = new URLSearchParams();
  private headers = new Headers();

  constructor(private http: Http) {
    const sas = environment.sas;
    const keys = Object.keys(sas);
    for (const key of keys) {
      this.queryParams.set(key, sas[key]);
    }
    this.headers.append('Accept', 'application/json');
  }

  getAll(): Observable<Sensor[]> {
    const sensors$ = this.http
      .get(`${environment.baseUrl}`, {
        headers: this.headers,
        search: this.queryParams
      })
      .map((response) => {
        const json = response.json();
        return json.value.map(record => record.message[0]);
      });
    return sensors$;
  }

  get(id: string): Sensor {
    return this.clone(SENSORS.find(p => p.id === id));
  }

  save(sensor: Sensor) {
    const originalSensor = SENSORS.find(p => p.id === sensor.id);
    if (originalSensor) {
      Object.assign(originalSensor, sensor);
    }
    // saved muahahaha
  }

  private clone(object: any) {
    // hack
    return JSON.parse(JSON.stringify(object));
  }

  toSensor(r: any): Sensor {
    const sensors = <Sensor>({
      id: r.id,
      deviceId: r.deviceId,
      data: {
        temperature: r.data.temperature,
        humidity: r.data.humidity,
        location: {
          lat: r.data.location.lat,
          lng: r.data.location.lng
        }
      },
    });
    console.log('Parsed person:', sensors);
    return sensors;
  }
}


const SENSORS: Sensor[] = [
  {
    id: '0ed06a7b',
    deviceId: 'RFID Raspberry Pi Node',
    data: {
      temperature: 23.932926196139306, humidity: 61.26553820911795, location: {
        lat: -33.86785, lng: 151.20732
      }
    }
  },
  {
    id: '0ed06a7b',
    deviceId: 'RFID Raspberry Pi Node',
    data: {
      temperature: 23.932926196139306, humidity: 61.26553820911795, location: {
        lat: -42.87936, lng: 147.32941
      }
    }
  },
  {
    id: '0ed06a7b',
    deviceId: 'RFID Raspberry Pi Node',
    data: {
      temperature: 23.932926196139306,
      humidity: 61.26553820911795,
      location: {
        lat: -37.814251,
        lng: 144.963169
      }
    }
  },
];

