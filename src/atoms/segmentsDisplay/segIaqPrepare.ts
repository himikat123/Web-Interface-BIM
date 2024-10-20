import segSymbCodes from './segSymbCodes';
import { validateIaq } from '../validateValues';

export default function iaq(iq: number, dispLength: string) {
    const space = segSymbCodes().SYMB_SPACE;
    const minus = segSymbCodes().SYMB_MINUS;
    const a = segSymbCodes().SYMB_A;
    const valid = validateIaq(iq);
    const iaq = Math.round(iq);
    const i100 = valid ? iaq < 100 ? space : Math.floor(iaq / 100) : minus;
    const i10 = valid ? iaq < 10 ? space : Math.floor(iaq % 100 / 10) : minus;
    const i1 = valid ? iaq % 10 : minus;
    
    const disp4Img = [
        iaq < 10 ? space : a, iaq < 100 ? iaq < 10 ? a : space : i100, 
        iaq < 10 ? space : i10, i1, space, space, space, space
    ];
    const disp6Img = [
        space, iaq < 10 ? space : a, iaq < 10 ? a : space, iaq < 100 ? iaq < 10 ? space : i10 : i100,
        iaq < 100 ? i1 : i10, iaq < 100 ? space : i1, space, space
    ];
    const disp8Img = [
        space, space, iaq < 10 ? space : a, iaq < 10 ? a : space, iaq < 100 ? iaq < 10 ? space : i10 : i100, 
        iaq < 100 ? i1 : i10, iaq < 100 ? space : i1, space
    ];

    return dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img : disp8Img;
}