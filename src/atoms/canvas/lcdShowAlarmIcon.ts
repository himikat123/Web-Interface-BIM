import store from '../../redux/store';
import device from '../../device';
import { drawScaledImage } from "./primitives";
import { alarm, alarmOff } from '../img/symbols';

export default function lcdShowAlarmIcon(
    ctx: CanvasRenderingContext2D, dispModel: number, prevAlarmState: boolean | undefined
): boolean {
    const alarmStates = store.getState().alarm.alarm.states;
    let alarmState = 0;
    if(device() === 'WeatherMonitorBIM32') {
        alarmStates.map(state => alarmState += state);

        if(!!alarmState !== prevAlarmState) {
            const x = dispModel ? 296 : 338;
            if(alarmState) drawScaledImage(ctx, alarm(), x, 140, 21, 21);
            else drawScaledImage(ctx, alarmOff(), x, 140, 21, 21);
        }
    }

    return !!alarmState;
}