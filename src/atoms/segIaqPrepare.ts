import segSymbCodes from './segSymbCodes';
import { validateIaq } from './validateValues';

export default function iaq(iaq: number) {
    let dispImg = [0, 0, 0, 0];
    const c = segSymbCodes();
    const valid = validateIaq(iaq);
    iaq = Math.round(iaq);
    dispImg[0] = c.SYMB_A;
    dispImg[1] = valid ? (iaq < 100 ? c.SYMB_SPACE : Math.floor(iaq / 100)) : c.SYMB_MINUS;
    dispImg[2] = valid ? (iaq < 10 ? c.SYMB_SPACE : Math.floor(iaq % 100 / 10)) : c.SYMB_MINUS;
    dispImg[3] = valid ? iaq % 10 : c.SYMB_MINUS;
    
    return dispImg;
}