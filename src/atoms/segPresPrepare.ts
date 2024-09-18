import segSymbCodes from './segSymbCodes';
import { validatePressure } from './validateValues';

export default function pres(pres: number, dispModel: string) {
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const c = segSymbCodes();
    const valid = validatePressure(pres);
    const prs = Math.round(pres * 0.75);
    const p100 = Math.floor(prs / 100);
    const p10 = Math.floor(prs % 100 / 10);
    const p1 = prs % 10;

    dispImg[0] = dispModel === '4-dig' ? valid ? p100 : c.SYMB_MINUS : c.SYMB_SPACE;
    dispImg[1] = dispModel === '4-dig' ? valid ? p10 : c.SYMB_MINUS : valid ? p100 : c.SYMB_MINUS;
    dispImg[2] = dispModel === '4-dig' ? valid ? p1 : c.SYMB_MINUS : valid ? p10 : c.SYMB_MINUS;
    dispImg[3] = dispModel === '4-dig' ? c.SYMB_P : valid ? p1 : c.SYMB_MINUS;
    dispImg[4] = c.SYMB_SPACE;
    dispImg[5] = c.SYMB_P;

    return dispImg;
}