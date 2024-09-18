import store from '../redux/store';
import { iSegState } from "../interfaces";
import segAnimations from './segAnimations';

export default function slotTick(dispNum: number, state: iSegState): iSegState {
    const config = store.getState().config;

    /* Slot switch */
    const millis = Date.now();
    const period = config.display.timeSlot.period[state.slot][dispNum];
    if((millis - state.prevSlotMillis) > (period * 1000) || period === 0) {
        state.prevSlot = state.slot;
        state.slot++;
        state.animSlot = 0;
        state.animMillis = millis;
        for(let i=state.slot; i<8; i++) {
            if(config.display.timeSlot.period[state.slot][dispNum] === 0) {
                state.slot++;
                state.animSlot = 0;
                state.animMillis = millis;
            }
            else break;
        }
        if(state.slot > 7) {
            state.slot = 0;
            state.animSlot = 0;
            state.animMillis = millis;
        }
        state.prevSlotMillis = millis;
    }

    const segData = segAnimations(dispNum, state);
    const date = new Date();

    return {
        segments: segData.dispImg,
        colors: segData.colors,
        clockpoints: segData.clockpoints,
        points: date.getMilliseconds() < 500,
        pointsColor: config.display.timeSlot.color[state.slot][dispNum],
        slot: state.slot,
        prevSlot: state.prevSlot,
        prevSlotMillis: state.prevSlotMillis,
        animMillis: segData.animMillis,
        animSlot: segData.animSlot
    };
}