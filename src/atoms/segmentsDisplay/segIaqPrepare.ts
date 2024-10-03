import segSymbCodes from './segSymbCodes';
import { validateIaq } from '../validateValues';

export default function iaq(iq: number, dispModel: string) {
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const c = segSymbCodes();
    const valid = validateIaq(iq);
    const iaq = Math.round(iq);
    const i100 = iaq < 100 ? c.SYMB_SPACE : Math.floor(iaq / 100);
    const i10 = iaq < 10 ? c.SYMB_SPACE : Math.floor(iaq % 100 / 10);
    const i1 = iaq % 10;

    dispImg[0] = dispModel === '4-dig' ? c.SYMB_A : c.SYMB_SPACE;
    dispImg[1] = dispModel === '4-dig' ? valid ? i100 : c.SYMB_MINUS : (valid && iaq < 100) ? c.SYMB_SPACE : c.SYMB_A;
    dispImg[2] = dispModel === '4-dig' ? valid ? i10 : c.SYMB_MINUS : (valid && iaq < 100) ? c.SYMB_A : c.SYMB_SPACE;
    dispImg[3] = dispModel === '4-dig' ? valid ? i1 : c.SYMB_MINUS : valid ? i100 : c.SYMB_MINUS;
    dispImg[4] = valid ? i10 : c.SYMB_MINUS;
    dispImg[5] = valid ? i1 : c.SYMB_MINUS;

    return dispImg;
}