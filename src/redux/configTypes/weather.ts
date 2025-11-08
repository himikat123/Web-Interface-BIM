import { iSensorTHPconfig } from "./sensors";

export interface iSensorWeatherConfig {
    appid: string[],
    city: string,
    cityid: number,
    lat: number,
    lon: number,
    provider: number,
    citysearch: number,
    corr: iSensorTHPconfig
}