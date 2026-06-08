import type { 
    iSensorAdata, iSensorLdata, iSensorTdata, iSensorTPdata, 
    iSensorTHdata, iSensorTHPdata, iSensorTHPIdata 
} from './dataTypes/sensors';
import type { iSensorWeatherData } from './dataTypes/weather';
import type { iSensorWsensData } from './dataTypes/wsensor';
import type { iNetwork } from './dataTypes/network';

export interface iDat {
    dataState: string,
    updateData: boolean,
    dataFetching: boolean,
    logged: string,
    adc?: number,
    fw: string,
    esp32?: iSensorTdata,
    runtime: number,
    time: number,
    cyd?: number,
    dispState?: number[],
    network: iNetwork,
    ssids: [ [string, number] ],
    bme680?: iSensorTHPIdata,
    bme280: iSensorTHPdata,
    bmp180: iSensorTPdata,
    sht21: iSensorTHdata,
    dht22: iSensorTHdata,
    ds18b20: iSensorTdata,
    max44009: iSensorLdata,
    bh1750: iSensorLdata,
    analog: iSensorAdata,
    wsensor?: iSensorWsensData,
    weather: iSensorWeatherData,
    thing: {
        time: number,
        data: number[]
    },
    fs: { 
        total: number,
        free: number,
        list: string
    }
}

export interface iData {
    data: iDat
}