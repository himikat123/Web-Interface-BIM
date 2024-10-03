import i18n from '../../i18n/main';
import store from '../../redux/store';
import * as vl from "../validateValues";
import { voltage, percentage } from '../indications/battery';

interface iReturn {
    val: string,
    type: number
}

export default function lcdGetVoltage(): iReturn {
    const config = store.getState().config;
    const data = store.getState().data;

    let value = '';
    let type = 0;
    const wsensNum = config.display.source.volt.wsensNum;
    const thingNum = config.display.source.volt.thing;

    switch(config.display.source.volt.sens) {
        case 1: if(vl.WsensorDataRelevance(wsensNum)) switch(config.display.source.volt.volt) { // Wireless sensor
            case 0: value = vl.validateBatteryADC(data.wsensor.bat[wsensNum]) // Battery voltage
                ? voltage(data.wsensor.bat[wsensNum], config.wsensor.bat.k[wsensNum]).toFixed(2) + i18n.t('units.v')
                : ''; break;
            case 1: value = vl.validateBatteryADC(data.wsensor.bat[wsensNum]) // Battery percentage
                ? Math.round(percentage(config.wsensor.bat.type[wsensNum], data.wsensor.bat[wsensNum], config.wsensor.bat.k[wsensNum])) + '%'
                : ''; break;
            case 2: value = vl.validateHighVoltage(data.wsensor.voltage.data[wsensNum]) // High voltage
                ? (data.wsensor.voltage.data[wsensNum]).toFixed(2) + i18n.t('units.v')
                : ''; break;
            case 3: value = vl.validateCO2(data.wsensor.co2.data[wsensNum]) // CO2
                ? Math.round(data.wsensor.co2.data[wsensNum]) + 'ppm'
                : ''; 
                type = 1; break;
        }; break;
        case 2: if(vl.ThingspeakDataRelevance()) { // Thingspeak
            value = vl.validateThingspeak(
                data.thing?.data 
                    ? data.thing?.data[thingNum] 
                    : -40400
            )
            ? data.thing?.data 
                ? config.display.source.volt.thingType
                    ? Math.round(data.thing?.data[thingNum]) + '%'
                    : (data.thing?.data[thingNum]).toFixed(2) + i18n.t('units.v')
                : ''
            : ''
        }; break;
        case 3: value = vl.validateIaq(data.bme680.iaq) // BME680 IAQ
            ? 'IAQ ' + Math.round(data.bme680.iaq)
            : ''
        ; 
        type = 1; break; 
        default: ; break;
    }

    const res = {
        val: value,
        type: type
    }
    return res;
}