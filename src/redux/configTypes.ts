import type { iSensors } from "./configTypes/sensors";
import type { iSensorWeatherConfig } from "./configTypes/weather";
import type { iSensorWsensConfig } from "./configTypes/wsensor";
import type { iComfort } from "./configTypes/comfort";
import type { iAccessPoint, iNetwork } from "./configTypes/network";
import type { iClock } from "./configTypes/clock";
import type { iDisplay } from "./configTypes/display";
import type { iSound } from "./configTypes/sound";
import type { iThingspeakSend, iThingspeakReceive } from "./configTypes/thingspeak";
import type { iNarodmonSend } from "./configTypes/narodmon";
import type { iMqttSend } from "./configTypes/mqtt";
import type { iHistory } from "./configTypes/history";

export interface iConf {
    configState: string,
    v: string,
    comfort: iComfort,
    network: iNetwork,
    accessPoint: iAccessPoint,
    weather: iSensorWeatherConfig,
    lang: string,
    sleep?: number,
    batK?: number,
    clock: iClock,
    display: iDisplay,
    sound?: iSound,
    sensors: iSensors,
    wsensor?: iSensorWsensConfig,
    thingspeakSend: iThingspeakSend,
    thingspeakReceive: iThingspeakReceive,
    narodmonSend: iNarodmonSend,
    mqttSend?: iMqttSend,
    history?: iHistory,
    account: {
        name: string,
        required: number
    },
    units: {
        pres: number
    }
}

export interface iConfig {
    config: iConf
}