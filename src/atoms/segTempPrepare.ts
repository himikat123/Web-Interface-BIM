import segSymbCodes from './segSymbCodes';
import { validateTemperature } from './validateValues';

export default function temp(tmp: number) {
    let dispImg = [0, 0, 0, 0];
    const c = segSymbCodes();
    const valid = validateTemperature(tmp);
    tmp = Math.round(tmp);
    let th = Math.floor(Math.abs(tmp) / 10);
    const tl = Math.abs(tmp) % 10;
    if(th === 0) th = c.SYMB_SPACE;
    dispImg[0] = valid ? (tmp < 0 ? c.SYMB_MINUS : tmp > 9 ? th : c.SYMB_SPACE) : c.SYMB_MINUS;
    dispImg[1] = valid ? (tmp < 0 ? tmp < -9 ? th : tl : tl) : c.SYMB_MINUS;
    dispImg[2] = valid ? (tmp < 0 ? tmp < -9 ? tl : c.SYMB_DEGREE : c.SYMB_DEGREE) : c.SYMB_DEGREE;
    dispImg[3] = valid ? (tmp < 0 ? tmp < -9 ? c.SYMB_DEGREE : c.SYMB_C : c.SYMB_C) : c.SYMB_C;
    return dispImg;
}