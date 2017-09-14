import {Injectable} from '@angular/core';
import {Sensor} from '../model/sensor';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Data} from "../model/data";

function getParams() {
  const params = new URLSearchParams();
  const sas = environment.sas;
  const keys = Object.keys(sas);
  keys.forEach(key => params.set(key, sas[key]));
  return params;
}

function getHeaders() {
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  return headers;
}

function getOptions() {
  const options = new RequestOptions({headers: getHeaders()});
  options.params = getParams();
  return options;
}


@Injectable()
export class SensorService {

  constructor(private http: Http) {
  }

  getAll(): Observable<Sensor[]> {
    const sensors$ = this.http
      .get(`${environment.baseUrl}`, getOptions())
      .map((response) => {
        const json = response.json();
        return json.value.map(this.toSensor);
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

  toSensor(record: any): Sensor {
    const message = JSON.parse(record.message)[0];
    const sensor = new Sensor();
    sensor.id = message.id;
    sensor.deviceId = message.deviceId;
    if (message.data) {
      sensor.data.temperature = message.data.temperature;
      sensor.data.humidity = message.data.humidity;
      if (message.data.location) {
        sensor.data.location.lng = message.data.location.lng;
        sensor.data.location.lat = message.data.location.lat;
      }
    }
    console.log('Parsed person:', sensor);
    return sensor;
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

