import store from '../../redux/store';
import segGetData from "./segGetData";
import segSymbCodes from './segSymbCodes';
import { frames, shifts } from './segAnimationsShifts';
import displayLength from './displayLength';
import { iSegState } from '../../interfaces';
 
export default function segAnimations(dispNum: number, state: iSegState) {
    const config = store.getState().config;
    const segData = segGetData(dispNum, state.slot, state.points);
    const segPrevData = segGetData(dispNum, state.prevSlot, state.points);
    const color = config.display.timeSlot.color[state.slot][dispNum];
    const prevColor = config.display.timeSlot.color[state.prevSlot][dispNum];
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    let colors = ['', '', '', '', '', '', '', ''];
    let animIsRunnung = true;
    const millis = Date.now();
    const type = config.display.animation.type[dispNum];
    const dispLength = displayLength(dispNum, 0);
    const shift = shifts[dispLength][type][state.animSlot];

    const getImg = (n: number) => {
        const shf = Math.abs(shift[n]) - 1;
        return shift[n] === 0
            ? segSymbCodes().SYMB_SPACE
            : shift[n] < 0 
                ? segPrevData.dispImg[shf] 
                : segData.dispImg[shf]
    }
    const getColor = (n: number) => {
        return shift[n] === 0 ? '#222' : shift[n] < 0 ? prevColor : color;
    }

    for(let i=0; i<8; i++) {
        dispImg[i] = getImg(i);
        colors[i] = getColor(i);
    }

    if(millis - state.animMillis > 1000 / config.display.animation.speed[dispNum]) {
        state.animMillis = millis;
        if(state.animSlot < frames[dispLength][type] - 1) state.animSlot++;
    }

    if(state.animSlot >= frames[dispLength][type] - 1) animIsRunnung = false;

    return {
        dispImg: dispImg,
        clockpoints: animIsRunnung ? false : segData.clockpoints,
        colors: colors,
        animMillis: state.animMillis,
        animSlot: state.animSlot
    }
}