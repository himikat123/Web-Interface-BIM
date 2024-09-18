import segSymbCodes from './segSymbCodes';
import { validateTemperature } from './validateValues';

export default function temp(temp: number, dispModel: string) {
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const c = segSymbCodes();
    const valid = validateTemperature(temp);
    const tmp = Math.round(temp);
    let th = Math.floor(Math.abs(tmp) / 10);
    const tl = Math.abs(tmp) % 10;
    if(th === 0) th = c.SYMB_SPACE;

    dispImg[0] = dispModel === '4-dig' ? valid ? (tmp < 0 ? c.SYMB_MINUS : tmp > 9 ? th : c.SYMB_SPACE) : c.SYMB_MINUS : c.SYMB_SPACE;
    dispImg[1] = dispModel === '4-dig' ? valid ? (tmp < 0 ? tmp < -9 ? th : tl : tl) : c.SYMB_MINUS : ((tmp < 0 && tmp < -9) ? c.SYMB_MINUS : c.SYMB_SPACE);
    dispImg[2] = dispModel === '4-dig' ? valid ? (tmp < 0 ? tmp < -9 ? tl : c.SYMB_DEGREE : c.SYMB_DEGREE) : c.SYMB_MINUS : (tmp < 0 ? tmp < -9 ? th : c.SYMB_MINUS : th);
    dispImg[3] = dispModel === '4-dig' ? valid ? (tmp < 0 ? tmp < -9 ? c.SYMB_DEGREE : c.SYMB_C : c.SYMB_C) : c.SYMB_C : tl;
    dispImg[4] = c.SYMB_DEGREE;
    dispImg[5] = c.SYMB_C;

    return dispImg;
}