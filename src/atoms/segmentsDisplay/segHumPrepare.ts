import segSymbCodes from './segSymbCodes';
import { validateHumidity } from '../validateValues';

export default function hum(hum: number, dispLength: string) {
    const valid = validateHumidity(hum);
    const hm = Math.round(hum);
    let hh = Math.floor(hm / 10);
    const hl = hm % 10;
    const space = segSymbCodes().SYMB_SPACE;
    const minus = segSymbCodes().SYMB_MINUS;
    const h = segSymbCodes().SYMB_H;
    if(hh === 0) hh = space;

    const disp4Img = [
        valid ? (hm > 99 ? 1 : hh) : minus, valid ? (hm > 99 ? 0 : hl) : minus,
        valid ? (hm > 99 ? 0 : space) : space, h, space, space, space, space
    ];
    const disp6Img = [
        space, valid ? (hm > 9 ? hm > 99 ? 1 : hh : space) : minus,
        valid ? (hm > 99 ? 0 : hl) : minus, valid ? (hm > 99 ? 0 : space) : space,
        valid ? (hm > 99 ? space : h) : h, valid ? (hm > 99 ? h : space) : space, space, space
    ];
    const disp8Img = [
        space, space, valid ? (hm > 9 ? hm > 99 ? 1 : hh : space) : minus,
        valid ? (hm > 99 ? 0 : hl) : minus, valid ? (hm > 99 ? 0 : space) : space,
        valid ? (hm > 99 ? space : h) : h, valid ? (hm > 99 ? h : space) : space, space
    ];

    return dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img : disp8Img;
}