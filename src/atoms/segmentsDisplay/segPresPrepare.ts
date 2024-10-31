import segSymbCodes from './segSymbCodes';
import { validatePressure } from '../validateValues';

export default function pres(pres: number, dispLength: string) {
    const valid = validatePressure(pres);
    const space = segSymbCodes().SYMB_SPACE;
    const minus = segSymbCodes().SYMB_MINUS;
    const p = segSymbCodes().SYMB_P;
    const prs = Math.round(pres * 0.75);
    const p100 = valid ? Math.floor(prs / 100) : minus;
    const p10 = valid ? Math.floor(prs % 100 / 10) : minus;
    const p1 = valid ? prs % 10 : minus;

    const disp4Img = [p100, p10, p1, p, space, space, space, space];
    const disp6Img = [space, p100, p10, p1, space, p, space, space];
    const disp8Img = [space, space, p100, p10, p1, space, p, space];

    return dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img : disp8Img;
}