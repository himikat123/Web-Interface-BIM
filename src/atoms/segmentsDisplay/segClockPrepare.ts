import moment from 'moment';
import store from '../../redux/store';
import segSymbCodes from './segSymbCodes';

export default function clock(sens: number, dispLength: string, pointsState: boolean, dispNum: number): number[] {
    const SPACE = segSymbCodes().SYMB_SPACE;
    const DASH = segSymbCodes().SYMB_MINUS;
    const DOT = 100;
    const config = store.getState().config;
    const type = config.display.type[dispNum];
    const model = config.display.model[dispNum];
    const hour = moment().hours();
    const hr = config.clock.format ? hour : hour % 12 || 12;
    const hrH = Math.floor(hr < 10 ? SPACE : hr / 10);
    const hrL = hr % 10;
    const mn = moment().minutes();
    const mnH = Math.floor(mn / 10);
    const mnL = mn % 10;
    const sc = moment().seconds();
    const scH = Math.floor(sc / 10);
    const scL = sc % 10;
    const ms = moment().millisecond();
    const msH = Math.floor(ms / 100);
    const msL = Math.floor(ms % 100 / 10);

    function pendulumPattern(millis: number, max: number): number {
        const phase = (millis % 2000) / (2000 / (2 * max));
        return phase <= max ? Math.round(phase) : Math.round(2 * max - phase);
    }

    let pendulum = pendulumPattern(sc * 1000 + ms, dispLength === '4-dig' ? 3 : dispLength === '6-dig' ? 5 : 7);
    let point1 = false;
    let point2 = false;

    switch(config.display.animation.points[dispNum]) {
        case 0: point1 = point2 = pointsState; break;
        case 1: point1 = type === 2 ? pointsState : false; point2 = type === 2 ? !point1 : false; break;
        case 2: point1 = point2 = true; break;
        case 3: point1 = point2 = false; break;
        default: ; break;
    }

    const disp4Img = [
        ((type === 2 && model < 2) || (type === 3 && model === 0)) && point1 ? hrH + DOT : hrH, 
        point2 ? hrL + DOT : hrL, 
        mnH, mnL, 
        SPACE, SPACE, SPACE, SPACE
    ];
    const disp6Img = [
        [SPACE, SPACE, type === 2 && point1 ? hrH + DOT : hrH, point2 ? hrL + DOT : hrL, mnH, mnL, SPACE, SPACE],
        [type === 2 && point1 ? hrH + DOT : hrH, point2 ? hrL + DOT : hrL, type === 2 && point1 ? mnH + DOT : mnH, point2 ? mnL + DOT : mnL, scH, scL, SPACE, SPACE],
        [SPACE, hrH, hrL, point1 ? DASH : SPACE, mnH, mnL]
    ];
    const disp8Img = [
        [SPACE, SPACE, hrH, point1 ? hrL + DOT : hrL, mnH, mnL, SPACE, SPACE],
        [SPACE, hrH, point1 ? hrL + DOT : hrL, mnH, point1 ? mnL + DOT : mnL, scH, scL, SPACE],
        [SPACE, SPACE, hrH, hrL, point1 ? DASH : SPACE, mnH, mnL, SPACE],
        [hrH, hrL, point1 ? DASH : SPACE, mnH, mnL, point1 ? DASH : SPACE, scH, scL],
        [hrH, point1 ? hrL + DOT : hrL, mnH, point1 ? mnL + DOT : mnL, scH, point1 ? scL + DOT : scL, msH, msL]
    ];

    let disp = dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img[sens] : disp8Img[sens];
   
    if(config.display.animation.points[dispNum] === 1 && type !== 2) {
        disp = disp.map((dig, i) => pendulum === i ? dig + DOT : dig);
    }

    return disp; 
}