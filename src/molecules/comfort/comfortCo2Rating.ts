import store from '../../redux/store';
import * as vl from "../../atoms/validateValues";

export default function comfortCo2Rating() {
    const config = store.getState().config;
    const data = store.getState().data;

    let co2 = -40400;
    if(config.comfort.co2?.source === 1) { // CO2 from Wireless sensor
        co2 = (data.wsensor?.co2.data[config.comfort.co2.wsensNum] ?? 0) + (config.wsensor?.co2.corr[config.comfort.co2.wsensNum] ?? 0);
    }

    let comfort = 0;
    if(vl.validateIaq(co2)) {
        if(co2 >= 800) comfort = 1;
        if(co2 >= 1400) comfort = 2;
    }
    else comfort = -1;

    return comfort;
}