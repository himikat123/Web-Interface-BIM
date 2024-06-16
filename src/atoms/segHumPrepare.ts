import segSymbCodes from './segSymbCodes';
import { validateHumidity } from './validateValues';

export default function hum(hm: number) {
    let dispImg = [0, 0, 0, 0];
    const c = segSymbCodes();
    const valid = validateHumidity(hm);
    hm = Math.round(hm);
    let hh = Math.floor(hm / 10);
    const hl = hm % 10;
    if(hh === 0) hh = c.SYMB_SPACE;
    dispImg[0] = valid ? (hm > 99 ? 1 : hh) : c.SYMB_MINUS;
    dispImg[1] = valid ? (hm > 99 ? 0 : hl) : c.SYMB_MINUS;
    dispImg[2] = valid ? (hm > 99 ? 0 : c.SYMB_SPACE) : c.SYMB_SPACE;
    dispImg[3] = c.SYMB_H;
    
    return dispImg;
}