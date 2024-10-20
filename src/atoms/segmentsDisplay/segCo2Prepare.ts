import segSymbCodes from './segSymbCodes';
import { validateCO2 } from '../validateValues';

export default function co2(co: number, dispLength: string) {
    const space = segSymbCodes().SYMB_SPACE;
    const minus = segSymbCodes().SYMB_MINUS;
    const c = segSymbCodes().SYMB_C;
    const valid = validateCO2(co);
    const co2 = Math.round(co);
    const c1000 = co2 < 1000 ? space : Math.floor(co2 / 1000);
    const c100 = co2 < 100 ? space : Math.floor(co2 % 1000 / 100);
    const c10 = co2 < 10 ? space : Math.floor(co2 % 100 / 10);
    const c1 = co2 % 10;

    const disp4Img = [
        valid ? co2 < 1000 ? c : c1000 : c, valid ? co2 < 100 ? 0 : c100 : 0, 
        valid ? co2 < 10 ? space : c10 : 2, valid ? c1 : minus, space, space, space, space
    ];
    const disp6Img = [
        co2 < 10 ? space : c, co2 < 10 ? c : 0, 
        valid ? co2 < 1000 ? co2 < 100 ? co2 < 10 ? 0 : 2 : space : c1000 : 2, 
        valid ? co2 < 100 ? co2 < 10 ? 2 : space : c100 : space, 
        valid ? co2 < 10 ? space : c10 : minus, valid ? c1 : minus, 
        space, space
    ];
    const disp8Img = [
        valid ? co2 < 1000 ? space : c : c,
        valid ? co2 < 1000 ? co2 < 10 ? space : c : 0 : 0,
        valid ? co2 < 1000 ? co2 < 10 ? c : 0 : 2 : 2,
        valid ? co2 < 1000 ? co2 < 10 ? 0 : 2 : space : space,
        valid ? co2 < 1000 ? co2 < 10 ? 2 : space : c1000 : minus,
        valid ? co2 < 100 ? co2 < 10 ? space : c10 : c100 : minus,
        valid ? co2 < 100 ? c1 : c10 : minus,
        valid ? co2 < 100 ? space : c1 : minus
    ];

    return dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img : disp8Img;
}