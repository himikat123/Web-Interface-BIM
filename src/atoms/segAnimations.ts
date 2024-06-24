import store from '../redux/store';
import segGetData from "./segGetData";
import segSymbCodes from './segSymbCodes';
import { iSegState } from '../interfaces';
 
export default function segAnimations(dispNum: number, state: iSegState) {
    const config = store.getState().config;
    const segData = segGetData(dispNum, state.slot);
    const segPrevData = segGetData(dispNum, state.prevSlot);
    const color = config.display.timeSlot.color[state.slot][dispNum];
    const prevColor = config.display.timeSlot.color[state.prevSlot][dispNum];
    let dispImg = [0, 0, 0, 0];
    let colors = ['', '', '', ''];
    let animIsRunnung = true;
    const millis = Date.now();
    const type = config.display.animation.type[dispNum];
    // TODO первые 2 анимации неправильно работают, не сдвигают весь экран
    const frames = [1, 5, 5, 8, 8, 4, 4, 4]; // number of frames in effect
    const shifts = [ /* shifts[effect num][frame num][segment num] =0: blank, >0: new data, <0: old data. */
        [[1, 2, 3, 4],    [0, 0, 0, 0],   [0, 0, 0, 0],  [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, -1, -2, -3], [4, 0, -1, -2], [3, 4, 0, -1], [2, 3, 4, 0], [1, 2, 3, 4], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[-2, -3, -4, 0], [-3, -4, 0, 1], [-4, 0, 1, 2], [0, 1, 2, 3], [1, 2, 3, 4], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, -1, -2, -3], [0, 0, -1, -2], [0, 0, 0, -1], [0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 2], [0, 1, 2, 3], [1, 1, 3, 4]],
        [[-2, -3, -4, 0], [-3, -4, 0, 0], [-4, 0, 0, 0], [0, 0, 0, 0], [4, 0, 0, 0], [3, 4, 0, 0], [2, 3, 4, 0], [1, 2, 3, 4]],
        [[-2, 0, 0, -3],  [0, 0, 0, 0],   [2, 0, 0, 3],  [1, 2, 3, 4], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[-1, -2, -3, 4], [-1, -2, 3, 4], [-1, 2, 3, 4], [1, 2, 3, 4], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[1, -2, -3, -4], [1, 2, -3, -4], [1, 2, 3, -4], [1, 2, 3, 4], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    ];
    const shift = shifts[type][state.animSlot];

    const getImg = (n: number) => {
        return Math.abs(shift[n] === 0 
            ? segSymbCodes().SYMB_SPACE 
            : shift[n] < 0 
                ? segPrevData.dispImg[n] 
                : segData.dispImg[n]
        );
    }
    const getColor = (n: number) => {
        return shift[n] < 0 ? prevColor : color;
    }

    dispImg = [getImg(0), getImg(1), getImg(2), getImg(3)];
    colors = [getColor(0), getColor(1), getColor(2), getColor(3)];

    if(millis - state.animMillis > 1000 / config.display.animation.speed[dispNum]) {
        state.animMillis = millis;
        if(state.animSlot < frames[type] - 1) state.animSlot++;
    }

    if(state.animSlot >= frames[type] - 1) animIsRunnung = false;

    return {
        dispImg: dispImg,
        clockpoints: animIsRunnung ? false : segData.clockpoints,
        colors: colors,
        animMillis: state.animMillis,
        animSlot: state.animSlot
    }
}