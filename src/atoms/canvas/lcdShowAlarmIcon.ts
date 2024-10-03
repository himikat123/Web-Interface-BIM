import store from '../../redux/store';
import { drawScaledImage } from "./primitives";
import { alarm, alarmOff } from '../img/symbols';

export default function lcdShowAlarmIcon(ctx: CanvasRenderingContext2D, 
    prevAlarmState: boolean | undefined, bgColor: string
): boolean {
    const alarmStates = store.getState().alarm.alarm.states;
    let alarmState = 0;
    alarmStates.map(state => alarmState += state);
    
    if(!!alarmState !== prevAlarmState) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const x = dispModel ? 296 : 338;
        if(alarmState) drawScaledImage(ctx, alarm(), x, 138, 24, 24);
        else drawScaledImage(ctx, alarmOff(), x, 138, 24, 24);
    }

    return !!alarmState;
}