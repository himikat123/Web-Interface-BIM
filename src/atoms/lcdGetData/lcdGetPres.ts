import device from '../../device';
import * as vl from "../validateValues";
import { iConf } from '../../redux/configTypes';
import { iDat } from '../../redux/dataTypes';

export default function lcdGetPres(config: iConf, data: iDat): number {
    let pres = 40400.0;
    const wsensNum = config.display.source.presOut.wsensNum ?? 0;
    const thingNum = config.display.source.presOut.thing;
    let cs = device() === 'WeatherMonitorBIM' 
        ? [1, -1, 2, 3, 4, -2] 
        : [1, 2, 3, 4, 5, 6];

    switch(config.display.source.presOut.sens) {
        case cs[0]: pres = data.weather.pres + config.weather.corr.p; break;
        case cs[1]: if(vl.WsensorDataRelevance(wsensNum)) {
            pres = vl.validatePressureHPA(data.wsensor?.pres.data[wsensNum] ?? 0) 
                ? (data.wsensor?.pres.data[wsensNum] ?? 0) + (config.wsensor?.pres[wsensNum] ?? 0) 
                : 40400
        }; break;
        case cs[2]: if(vl.ThingspeakDataRelevance()) {
            pres = vl.validatePressureHPA(
                data.thing?.data 
                    ? data.thing?.data[thingNum] 
                    : -40400
            )
            ? data.thing?.data 
                ? data.thing?.data[thingNum] 
                : 40400 
            : 40400
        }; break;
        case cs[3]: pres = data.bme280.pres + config.sensors.bme280.p; break;
        case cs[4]: pres = data.bmp180.pres + config.sensors.bmp180.p; break;
        case cs[5]: pres = (data.bme680?.pres ?? 0) + (config.sensors.bme680?.p ?? 0); break;
        default: ; break;
    }

    return pres;
}