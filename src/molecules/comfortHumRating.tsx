import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as vl from "../atoms/validateValues";

export default function ComfortHumRating() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    let hum = 40400;
    switch(config.comfort.hum.source) {
        case 1: hum = data.weather.hum; break; // humidity from weather forecast
        case 2: // humidity from wireless sensor
            hum = data.wsensor.hum.data[config.comfort.hum.wsensNum] + config.wsensor.hum.corr[config.comfort.temp.wsensNum];
            break;
        case 3: // humidity from thingspeak
            hum = data.thing?.data ? data.thing?.data[config.comfort.hum.thing] : -40400;
            break;
        case 4: hum = data.bme280.hum + config.sensors.bme280.h; break; // humidity from BME280
        case 5: hum = data.sht21.hum + config.sensors.sht21.h; break; // humidity from SHT21
        case 6: hum = data.dht22.hum + config.sensors.dht22.h; break; // humidity from DHT22
        case 7: hum = data.bme680.hum + config.sensors.bme680.h; break; // humidity from BME680
    }

    let comfort = i18n.t('comfortable');
    if(vl.validateHumidity(hum)) {
        if(hum > ((config.comfort.hum.max[0] + config.comfort.hum.max[1]) / 2)) comfort = i18n.t('tooHumid');
        if(hum < ((config.comfort.hum.min[0] + config.comfort.hum.min[1]) / 2)) comfort = i18n.t('tooDry');
    }
    else comfort = '--';

    return <div className="mt-6">
        <Indication error={false} value={comfort} />
    </div>
}