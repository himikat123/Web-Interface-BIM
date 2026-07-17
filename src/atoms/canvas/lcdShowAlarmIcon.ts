import device from '../../device';
import { drawScaledImage } from "./primitives";
import { alarm, alarmOff } from '../img/symbols';
import * as D from '../constants/displayTypes';
import { iAlrms } from '../../redux/alarmTypes';

export default function lcdShowAlarmIcon(
    ctx: CanvasRenderingContext2D, dispModel: number, prevAlarmState: boolean | undefined, alarms: iAlrms
): boolean {
    const alarmStates = alarms.alarm.states;
    let alarmState = 0;
    if(device() === 'WeatherMonitorBIM32') {
        alarmStates.map(state => alarmState += state);

        if(!!alarmState !== prevAlarmState) {
            let x = 443, y = 190, w = 30; // NX4832K(T)035
            switch(dispModel) {
                case D.NX4827K043: x = 448; y = 155; w = 25; break;
                case D.ILI9341: x = 296; y = 140; w = 21; break;
            }
            if(alarmState) drawScaledImage(ctx, alarm(), x, y, w, w);
            else drawScaledImage(ctx, alarmOff(), x, y, w, w);
        }
    }

    return !!alarmState;
}