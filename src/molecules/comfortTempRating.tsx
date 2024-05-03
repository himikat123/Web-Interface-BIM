import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as vl from "../atoms/validateValues";

export default function ComfortTempRating() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    let temp = 40400;
    switch(config.comfort.temp.source) {
        case 1: temp = data.weather.temp; break; // temperature from weather forecast
        case 2: // temperature from wireless sensor
            temp = data.wsensor.temp.data[config.comfort.temp.sens][config.comfort.temp.wsensNum] + config.wsensor.temp.corr[config.comfort.temp.wsensNum][config.comfort.temp.sens];
            break;
        case 3: // temperature from thingspeak
            temp = data.thing?.data ? data.thing?.data[config.comfort.temp.thing] : -40400;
            break;
        case 4: temp = data.bme280.temp + config.sensors.bme280.t; break; // temperature from BME280
        case 5: temp = data.bmp180.temp + config.sensors.bmp180.t; break; // temperature from BMP180
        case 6: temp = data.sht21.temp + config.sensors.sht21.t; break; // temperature from SHT21
        case 7: temp = data.dht22.temp + config.sensors.dht22.t; break; // temperature from DHT22
        case 8: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break; // temperature from DS18B20
        case 9: temp = data.bme680.temp + config.sensors.bme680.t; break; // temperature from BME680
    }

    let comfort = i18n.t('comfortable');
    if(vl.validateTemperature(temp)) {
        if(temp > config.comfort.temp.max[0]) comfort = i18n.t('tooHot');
        if(temp < config.comfort.temp.min[0]) comfort = i18n.t('tooCold');
    }
    else comfort = '--';

    return <div className="mt-6">
        <Indication error={false} value={comfort} />
    </div>
}