import segSymbCodes from './segSymbCodes';
import { validateHumidity } from './validateValues';

export default function hum(hum: number, dispModel: string) {
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const c = segSymbCodes();
    const valid = validateHumidity(hum);
    const hm = Math.round(hum);
    let hh = Math.floor(hm / 10);
    const hl = hm % 10;
    if(hh === 0) hh = c.SYMB_SPACE;

    dispImg[0] = dispModel === '4-dig' ? valid ? (hm > 99 ? 1 : hh) : c.SYMB_MINUS : c.SYMB_SPACE;
    dispImg[1] = dispModel === '4-dig' ? valid ? (hm > 99 ? 0 : hl) : c.SYMB_MINUS : (valid && hm > 99) ? 1 : c.SYMB_SPACE;
    dispImg[2] = dispModel === '4-dig' ? valid ? (hm > 99 ? 0 : c.SYMB_SPACE) : c.SYMB_SPACE : valid ? (hm > 99 ? 0 : hh) : c.SYMB_MINUS;
    dispImg[3] = dispModel === '4-dig' ? c.SYMB_H : valid ? (hm > 99 ? 0 : hl) : c.SYMB_MINUS;
    dispImg[4] = c.SYMB_SPACE;
    dispImg[5] = c.SYMB_H;

    return dispImg;
}