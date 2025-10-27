import i18n from "../../i18n/main";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import { iDisplayTimeSlot } from "../../interfaces";
import forecast from "../../atoms/indications/forecast";
import tempHumPres from "../../atoms/indications/tempHumPres";
import tempPres from "../../atoms/indications/tempPres";
import tempHum from "../../atoms/indications/tempHum";
import temp from "../../atoms/indications/temp";
import ESP32 from "../../atoms/indications/ESP32";
import tempHumPresIaq from "../../atoms/indications/tempHumPresIaq";

export default function TimeSlotSensorType(props: iDisplayTimeSlot) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const bme280indications = tempHumPres(config.sensors.bme280, data.bme280);
    const bmp180indications = tempPres(config.sensors.bmp180, data.bmp180);
    const sht21indications = tempHum(config.sensors.sht21, data.sht21);
    const dht22indications = tempHum(config.sensors.dht22, data.dht22);
    const ds18b20indications = temp(config.sensors.ds18b20, data.ds18b20);
    const bme680indications = tempHumPresIaq(config.sensors.bme680, data.bme680);
    const forecastindications = forecast(config.weather, data.weather);

    const sensor = config.display.timeSlot ? config.display.timeSlot.sensor[props.slot][props.num] : 0;
    let hourFormat;
    switch(config.clock.format) {
        case 0: hourFormat = 'h'; break;
        case 1: hourFormat = 'hh'; break;
        case 2: hourFormat = 'H'; break;
        default: hourFormat = 'HH'; break;
    }

    const types = [
        /* Time */ [
            `${i18n.t('withoutSeconds')} (${moment.unix(data.time).utc().format(`${hourFormat}:mm`)})`,
            `${i18n.t('withSeconds')} (${moment.unix(data.time).utc().format(`${hourFormat}:mm:ss`)})`,
            `${i18n.t('withoutSeconds')} (${moment.unix(data.time).utc().format(`${hourFormat}-mm`)})`,
            `${i18n.t('withSeconds')} (${moment.unix(data.time).utc().format(`${hourFormat}-mm-ss`)})`,
            `${i18n.t('withMilliSeconds')} (${moment.unix(data.time).utc().format(`${hourFormat}:mm:ss:88`)})`
        ],
        /* Data */ [
            `${i18n.t('day')}, ${i18n.t('month')} (${moment.unix(data.time).utc().format('DD.MM')})`,
            `${i18n.t('day')}, ${i18n.t('month')}, ${i18n.t('year')} (${moment.unix(data.time).utc().format('DD.MM.YY')})`,
            `${i18n.t('day')}, ${i18n.t('month')}, ${i18n.t('year')} (${moment.unix(data.time).utc().format('DD.MM.YYYY')})`
        ],
        /* BME280 */ [
            `${i18n.t('temperature')} (${bme280indications.temp})`, 
            `${i18n.t('humidity')} (${bme280indications.hum})`, 
            `${i18n.t('pressure')} (${bme280indications.pres})`
        ],
        /* BMP180 */ [
            `${i18n.t('temperature')} (${bmp180indications.temp})`, 
            `${i18n.t('pressure')} (${bmp180indications.pres})`
        ],
        /* SHT21 */ [
            `${i18n.t('temperature')} (${sht21indications.temp})`, 
            `${i18n.t('humidity')} (${sht21indications.hum})`
        ],
        /* DHT22 */ [
            `${i18n.t('temperature')} (${dht22indications.temp})`, 
            `${i18n.t('humidity')} (${dht22indications.hum})`
        ],
        /* DS18B20 */ [
            `${i18n.t('temperature')} (${ds18b20indications})`
        ],
        /* ESP32 */ [
            `${i18n.t('temperature')} (${ESP32(config.sensors.esp32, data.esp32, data.runtime, config.lang).temp})`
        ],
        /* Thingspeak */ [],
        /* Forecast */ [
            `${i18n.t('temperature')} (${forecastindications.temp})`, 
            `${i18n.t('humidity')} (${forecastindications.hum})`, 
            `${i18n.t('pressure')} (${forecastindications.pres})`
        ],
        /* Wireless Sensor */ [],
        /* BME680 */ [
            `${i18n.t('temperature')} (${bme680indications.temp})`, 
            `${i18n.t('humidity')} (${bme680indications.hum})`, 
            `${i18n.t('pressure')} (${bme680indications.pres})`, 
            `${i18n.t('indexForAirQuality')} (${bme680indications.iaq})`
        ]
    ];

    const disabled = [
        [ /* clock */ [], [],
            [ // type: Neopixel
                [0, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 0, 1, 1, 1], [0, 0, 1, 1, 1], [0, 0, 1, 1, 1]
            ],
            [ // type: 7 Segment
                [0, 1, 1, 1, 1], [0, 0, 0, 1, 1], [0, 1, 1, 1, 1], [0, 0, 0, 1, 1], [0, 0, 0, 0, 0]
            ],
            [ // type: Numitron
                [0, 1, 1, 1, 1], [0, 0, 0, 1, 1], [0, 0, 0, 0, 0]
            ],
            [ // type: VFD
                [0, 1, 1, 1, 1], [0, 0, 0, 1, 1], [0, 0, 0, 0, 0]
            ],
            [ // type: Nixie
                [0, 1, 1, 1, 1], [0, 0, 0, 1, 1], [0, 0, 0, 0, 0]
            ],
            [ // type: Matrix
                [0, 1, 1, 1, 1], [0, 0, 0, 1, 1], [0, 0, 0, 0, 0]
            ]
        ],
        [ /* date */ [], [],
            [ // type: Neopixel
                [0, 1, 1], [0, 1, 1], [0, 1, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]
            ],
            [ // type: 7 Segment
                [0, 1, 1], [0, 0, 1], [0, 1, 1], [0, 0, 1], [0, 0, 0]
            ],
            [ // type: Numitron
                [0, 1, 1], [0, 0, 1], [0, 0, 0]
            ],
            [ // type: VFD
                [0, 1, 1], [0, 0, 1], [0, 0, 0]
            ],
            [ // type: Nixie
                [0, 1, 1], [0, 0, 1], [0, 0, 0]
            ],
            [ // type: Matrix
                [0, 1, 1], [0, 0, 1], [0, 0, 0]
            ]
        ]
    ];

    return <>
        {types[sensor].length > 0 && <div className="mt-8">
            <SelectSwitch label={i18n.t('sensorType')}
                options={types[sensor]}
                value={config.display.timeSlot ? config.display.timeSlot.data[props.slot][props.num] : 0}
                onChange={val => dispatch(cf.displayTimeslotDataChange({slot: props.slot, num: props.num, val: val}))}
                disabled={sensor < 2
                    ? disabled[sensor][config.display.type ? config.display.type[props.num] : 0][config.display.model[props.num]]
                    : []
                }
            />
        </div>}
    </> 
}