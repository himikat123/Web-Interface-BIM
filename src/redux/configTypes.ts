import { iSensors } from "./configTypes/sensors";
import iSensorWeatherConfig from "./configTypes/weather";
import iSensorWsensConfig from "./configTypes/wsensor";
import iComfort from "./configTypes/comfort";
import { iAccessPoint, iNetwork } from "./configTypes/network";
import iClock from "./configTypes/clock";
import iDisplay from "./configTypes/display";
import iSound from "./configTypes/sound";
import { iThingspeakSend, iThingspeakReceive } from "./configTypes/thingspeak";
import iNarodmonSend from "./configTypes/narodmon";
import iMqttSend from "./configTypes/mqtt";
import iHistory from "./configTypes/history";

export interface iConfig {
    config: {
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
}