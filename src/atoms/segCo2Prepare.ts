import segSymbCodes from './segSymbCodes';
import { validateCO2 } from './validateValues';

export default function co2(co: number) {
    let dispImg = [0, 0, 0, 0];
    const c = segSymbCodes();
    const valid = validateCO2(co);
    co = Math.round(co);
    dispImg[0] = valid ? (co < 1000 ? c.SYMB_SPACE : Math.floor(co / 1000)) : c.SYMB_MINUS;
    dispImg[1] = valid ? (co < 100 ? c.SYMB_SPACE : Math.floor(co % 1000 / 100)) : c.SYMB_MINUS;
    dispImg[2] = valid ? (co < 10 ? c.SYMB_SPACE : Math.floor(co % 100 / 10)) : c.SYMB_MINUS;
    dispImg[3] = valid ? co % 10 : c.SYMB_MINUS;
    
    return dispImg;
}