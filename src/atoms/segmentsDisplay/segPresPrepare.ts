import store from '../../redux/store';
import segSymbCodes from './segSymbCodes';
import { validatePressure } from '../validateValues';
import { hPaToMM } from '../indications/hPaToMM';

export default function pres(pres: number, dispLength: string) {
    const config = store.getState().config;
    const valid = validatePressure(pres);
    const space = segSymbCodes().SYMB_SPACE;
    const minus = segSymbCodes().SYMB_MINUS;
    const p = segSymbCodes().SYMB_P;
    const prs = Math.round(config.units.pres ? pres : hPaToMM(pres));
    const p1000 = valid ? Math.floor(prs / 1000) : minus;
    const p100 = valid ? Math.floor(prs % 1000 / 100) : minus;
    const p10 = valid ? Math.floor(prs % 100 / 10) : minus;
    const p1 = valid ? prs % 10 : minus;

    const disp4Img = (config.units.pres && prs > 999) 
        ? [p1000, p100, p10, p1, space, space, space, space]
        : [p100, p10, p1, p, space, space, space, space];
    const disp6Img = [p1000 === 0 ? space : p1000, p100, p10, p1, space, p, space, space];
    const disp8Img = [p1000 === 0 ? space : p1000, space, p100, p10, p1, space, p, space];

    return dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img : disp8Img;
}