import segSymbCodes from './segSymbCodes';
import { validateTemperature } from '../validateValues';

export default function temp(temp: number, dispLength: string) {
    const valid = validateTemperature(temp);
    const tmp = Math.round(temp);
    let th = Math.floor(Math.abs(tmp) / 10);
    const tl = Math.abs(tmp) % 10;
    const space = segSymbCodes().SYMB_SPACE;
    const minus = segSymbCodes().SYMB_MINUS;
    const degree = segSymbCodes().SYMB_DEGREE;
    const c = segSymbCodes().SYMB_C;
    if(th === 0) th = space;

    const disp4Img = [
        valid ? (tmp < 0 ? minus : tmp > 9 ? th : space) : minus,
        valid ? (tmp < 0 ? tmp < -9 ? th : tl : tl) : minus,
        valid ? (tmp < 0 ? tmp < -9 ? tl : degree : degree) : degree,
        valid ? (tmp < 0 ? tmp < -9 ? degree : c : c) : c,
        space, space, space, space
    ];
    const disp6Img = [
        space,
        valid ? (tmp < 0 ? minus : tmp > 9 ? th : space) : minus,
        valid ? (tmp < 0 ? tmp < -9 ? th : tl : tl) : minus,
        valid ? (tmp < 0 ? tmp < -9 ? tl : degree : degree) : degree,
        valid ? (tmp <-9 ? degree : c) : c,
        valid ? (tmp <-9 ? c : space) : space,
        space, space
    ];
    const disp8Img = [
        space, space,
        valid ? (tmp < 0 ? minus : tmp > 9 ? th : space) : minus,
        valid ? (tmp < 0 ? tmp < -9 ? th : tl : tl) : minus,
        valid ? (tmp < 0 ? tmp < -9 ? tl : degree : degree) : degree,
        valid ? (tmp <-9 ? degree : c) : c,
        valid ? (tmp <-9 ? c : space) : space,
        space
    ];

    return dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img : disp8Img;
}