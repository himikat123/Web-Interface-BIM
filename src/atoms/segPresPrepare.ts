import segSymbCodes from './segSymbCodes';
import { validatePressure } from './validateValues';

export default function pres(prs: number) {
    let dispImg = [0, 0, 0, 0];
    const c = segSymbCodes();
    const valid = validatePressure(prs);
    prs = Math.round(prs * 0.75);
    dispImg[0] = valid ? Math.floor(prs / 100) : c.SYMB_MINUS;
    dispImg[1] = valid ? Math.floor(prs % 100 / 10) : c.SYMB_MINUS;
    dispImg[2] = valid ? prs % 10 : c.SYMB_MINUS;
    dispImg[3] = c.SYMB_P;
    
    return dispImg;
}