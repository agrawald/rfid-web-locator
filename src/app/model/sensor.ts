import {Data} from './data';

export class Sensor {
  id: string;
  deviceId: string;
  data: Data = new Data();
}
