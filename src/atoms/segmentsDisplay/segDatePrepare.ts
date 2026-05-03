import moment from 'moment';
import segSymbCodes from './segSymbCodes';
import { PIXEL } from '../constants/displayTypes';

export default function date(sens: number, dispLength: string, dispNum: number, config: any, data: any): number[] {
    const dt = moment.unix(data.time).utc().date();
    const dtH = Math.floor(dt / 10);
    const dtL = dt % 10;
    const mt = moment.unix(data.time).utc().month() + 1;
    const mtH = Math.floor(mt / 10);
    const mtL = mt % 10;
    const yr = moment.unix(data.time).utc().year();
    const yr1 = Math.floor(yr / 1000);
    const yr2 = Math.floor(yr % 1000 / 100);
    const yr3 = Math.floor(yr % 100 / 10);
    const yr4 = Math.floor(yr % 10);
    const space = segSymbCodes().SYMB_SPACE;
    const dot = 100;
    const dispType = config.display.type ? config.display.type[dispNum] : 0;

    const disp4Img = [dtH, dtL + dot, mtH, mtL, space, space, space, space];
    const disp6Img = [
        [space, space, dtH, dtL + dot, mtH, mtL, space, space],
        [dtH, dtL + dot, mtH, mtL + dot, yr3, yr4, space, space]
    ];
    const disp8Img = [
        [space, space, dtH, dtL + dot, mtH, mtL, space, space],
        [space, dispType === PIXEL ? space : dtH, dispType === PIXEL ? dtH : (dtL + dot), dispType === PIXEL ? (dtL + dot) : mtH, dispType === PIXEL ? mtH : (mtL + dot), dispType === PIXEL ? (mtL + dot) : yr3, dispType === PIXEL ? yr3 : yr4, dispType === PIXEL ? yr4 : space],
        [dtH, dtL + dot, mtH, mtL + dot, yr1, yr2, yr3, yr4]
    ];

    return dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img[sens] : disp8Img[sens]; 
}