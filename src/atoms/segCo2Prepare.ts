import segSymbCodes from './segSymbCodes';
import { validateCO2 } from './validateValues';

export default function co2(co: number, dispModel: string) {
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const c = segSymbCodes();
    const valid = validateCO2(co);
    const co2 = Math.round(co);
    const c1000 = valid ? (co2 < 1000 ? c.SYMB_SPACE : Math.floor(co2 / 1000)) : c.SYMB_MINUS;
    const c100 = valid ? (co2 < 100 ? c.SYMB_SPACE : Math.floor(co2 % 1000 / 100)) : c.SYMB_MINUS;
    const c10 = valid ? (co2 < 10 ? c.SYMB_SPACE : Math.floor(co2 % 100 / 10)) : c.SYMB_MINUS;
    const c1 = valid ? co2 % 10 : c.SYMB_MINUS;

    dispImg[0] = dispModel === '4-dig' ? c1000 : c.SYMB_C;
    dispImg[1] = dispModel === '4-dig' ? c100 : c.SYMB_o;
    dispImg[2] = dispModel === '4-dig' ? c10 : c1000;
    dispImg[3] = dispModel === '4-dig' ? c1 : c100;
    dispImg[4] = c10;
    dispImg[5] = c1;
    
    return dispImg;
}