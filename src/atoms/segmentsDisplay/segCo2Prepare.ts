import segSymbCodes from './segSymbCodes';
import { validateCO2 } from '../validateValues';

export default function co2(co: number, dispLength: string) {
    const space = segSymbCodes().SYMB_SPACE;
    const minus = segSymbCodes().SYMB_MINUS;
    const c = segSymbCodes().SYMB_C;
    const valid = validateCO2(co);
    const co2 = Math.round(co);

    const digits = [
        Math.floor(co2 / 10000),
        Math.floor((co2 % 10000) / 1000),
        Math.floor((co2 % 1000) / 100),
        Math.floor((co2 % 100) / 10),
        co2 % 10
    ];

    const len = co2 < 10 ? 1 : co2 < 100 ? 2 : co2 < 1000 ? 3 : co2 < 10000 ? 4 : 5;

    const disp4Img = valid
        ? [
            len === 4 ? digits[1] : c, len === 1 ? 0 : len === 2 ? space : digits[2],
            len === 1 ? space : digits[3], digits[4], space, space, space, space
        ]
        : [c, 0, 2, minus, space, space, space, space];

    const disp6Img = valid
        ? [
            (len === 1 || len === 5) ? space : c,
            len === 1 ? c : len === 4 ? space : len === 5 ? digits[4] : 0,
            len === 1 ? 0 : len === 2 ? 2 : len === 3 ? space : digits[1],
            len === 1 ? 2 : len === 2 ? space : digits[2],
            len === 1 ? space : digits[3], 
            digits[4], 
            space, 
            space
        ]
        : [c, 0, 2, space, minus, minus, space, space];

    const disp8Img = valid
        ? [
            len > 3 ? c : space, 
            len === 1 ? space : (len === 2 || len === 3) ? c : 0,
            len === 1 ? c : (len === 2 || len === 3) ? 0 : len === 4 ? 2 : space,
            len === 1 ? 0 : (len === 2 || len === 3) ? 2 : len === 4 ? space : digits[4],
            len === 1 ? 2 : (len === 2 || len === 3) ? space : digits[1],
            len === 1 ? space : len === 2 ? digits[1] : digits[2],
            (len === 1 || len === 2) ? digits[0] : digits[3], 
            (len === 1 || len === 2) ? space : digits[4]
        ]
        : [c, 0, 2, space, minus, minus, minus, minus];

    return dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img : disp8Img;
}