import moment from 'moment';
import segSymbCodes from './segSymbCodes';
import * as D from '../constants/displayTypes';
import { iConf } from '../../redux/configTypes';
import { iDat } from '../../redux/dataTypes';

export default function clock(
    sens: number, dispLength: string, pointsState: boolean, dispNum: number, config: iConf, data: iDat, millisec: number
): number[] {
    let isDemo = true;
    if(data.dataState !== 'DEMO' && window.location.port !== "3000") isDemo = false;

    const SPACE = segSymbCodes().SYMB_SPACE;
    const DASH = segSymbCodes().SYMB_MINUS;
    const DOT = 100;
    const dispType = config.display.type ? config.display.type[dispNum] : 0;
    const model = config.display.model[dispNum];
    const hr = +moment().format(config.clock.format > 1 ? 'H' : 'h');
    const hrH = Math.floor((config.clock.format % 2 === 0 && hr < 10) ? SPACE : hr / 10);
    const hrL = hr % 10;
    const mn = moment().minutes();
    const mnH = Math.floor(mn / 10);
    const mnL = mn % 10;
    const sc = moment().seconds();
    const scH = Math.floor(sc / 10);
    const scL = sc % 10;
    const ms = isDemo ? (moment().millisecond() / 10) : millisec;
    const msH = Math.floor(ms / 10);
    const msL = Math.floor(ms % 10);

    function pendulumPattern(millis: number, max: number): number {
        const phase = (millis % 2000) / (2000 / (2 * max));
        return phase <= max ? Math.round(phase) : Math.round(2 * max - phase);
    }

    let pendulum = pendulumPattern(sc * 1000 + ms, dispLength === '4-dig' ? 3 : dispLength === '6-dig' ? 5 : 7);
    let point1 = false;
    let point2 = false;

    switch(config.display.animation ? config.display.animation.points[dispNum] : 0) {
        case D.ANIM_POINTS_TOGETHER: point1 = point2 = pointsState; break;
        case D.ANIM_POINTS_PENDULUM: point1 = dispType === D.PIXEL ? pointsState : false; point2 = dispType === D.PIXEL ? !point1 : false; break;
        case D.ANIM_POINTS_ALWAYS_ON: point1 = point2 = true; break;
        case D.ANIM_POINTS_ALWAYS_OFF: point1 = point2 = false; break;
        default: ; break;
    }

    const disp4Img = [
        (dispType === D.PIXEL || (dispType === D.SEGMENT && model === D.TM1637_4)) && point1 ? hrH + DOT : hrH, 
        point2 ? hrL + DOT : hrL, 
        mnH, mnL, 
        SPACE, SPACE, SPACE, SPACE
    ];
    const disp6Img = [
        [SPACE, SPACE, dispType === D.PIXEL && point1 ? hrH + DOT : hrH, point2 ? hrL + DOT : hrL, mnH, mnL, SPACE, SPACE],
        [dispType === D.PIXEL && point1 ? hrH + DOT : hrH, point2 ? hrL + DOT : hrL, dispType === D.PIXEL && point1 ? mnH + DOT : mnH, point2 ? mnL + DOT : mnL, scH, scL, SPACE, SPACE],
        [SPACE, hrH, hrL, point1 ? DASH : SPACE, mnH, mnL]
    ];
    const disp8Img = [
        [SPACE, SPACE, hrH, point1 ? hrL + DOT : hrL, mnH, mnL, SPACE, SPACE],
        [SPACE, dispType === D.PIXEL ? SPACE : hrH, dispType === D.PIXEL ? (point2 ? hrH + DOT : hrH) : (point1 ? hrL + DOT : hrL), dispType === D.PIXEL ? (point1 ? hrL + DOT : hrL) : mnH, dispType === D.PIXEL ? (point2 ? mnH + DOT : mnH) : (point1 ? mnL + DOT : mnL), dispType === D.PIXEL ? (point1 ? mnL + DOT : mnL) : scH, dispType === D.PIXEL ? scH : scL, dispType === D.PIXEL ? scL : SPACE],
        [SPACE, SPACE, hrH, hrL, point1 ? DASH : SPACE, mnH, mnL, SPACE],
        [hrH, hrL, point1 ? DASH : SPACE, mnH, mnL, point1 ? DASH : SPACE, scH, scL],
        [dispType === D.PIXEL && point1 ? hrH + DOT : hrH, point1 ? hrL + DOT : hrL, dispType === D.PIXEL && point1 ? mnH + DOT : mnH, point1 ? mnL + DOT : mnL, dispType === D.PIXEL && point1 ? scH + DOT : scH, point1 ? scL + DOT : scL, msH, msL]
    ];

    let disp = dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img[sens] : disp8Img[sens];
   
    if((config.display.animation ? config.display.animation.points[dispNum] : 0) === 1 && dispType !== 2) {
        disp = disp.map((dig, i) => pendulum === i ? dig + DOT : dig);
    }

    return disp; 
}