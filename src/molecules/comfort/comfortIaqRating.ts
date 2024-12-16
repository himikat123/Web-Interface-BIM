import store from '../../redux/store';
import * as vl from "../../atoms/validateValues";

export default function comfortIaqRating() {
    const config = store.getState().config;
    const data = store.getState().data;

    let iaq = -40400;
    if(config.comfort.iaq?.source === 1) iaq = (data.bme680?.iaq ?? 0) + (config.sensors.bme680?.i ?? 0); // IAQ from BME680

    let comfort = 0;
    if(vl.validateIaq(iaq)) {
        if(iaq >= 100) comfort = 1;
        if(iaq >= 200) comfort = 2;
    }
    else comfort = -1;

    return comfort;
}