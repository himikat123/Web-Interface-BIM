import moment from 'moment';
import store from '../../redux/store';
import segSymbCodes from './segSymbCodes';

export default function clock(sens: number, dispLength: string, pointsState: boolean, dispNum: number): number[] {
    const config = store.getState().config;
    const hour = moment().hours();
    const hr = config.clock.format ? hour : hour % 12 || 12;
    const hrH = Math.floor(hr < 10 ? segSymbCodes().SYMB_SPACE : hr / 10);
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
    const space = segSymbCodes().SYMB_SPACE;
    const dash = segSymbCodes().SYMB_MINUS;
    const dot = 100;
    let point1 = false;
    let point2 = false;
    switch(config.display.animation.points[dispNum]) {
        case 0: point1 = point2 = pointsState; break;
        case 1: point1 = pointsState; point2 = !point1; break;
        case 2: point1 = point2 = true; break;
        case 3: point1 = point2 = false; break;
        default: ; break;
    }

    const disp4Img = [
        (config.display.type[dispNum] === 2 || config.display.model[dispNum] < 2) && point1 ? hrH + dot : hrH, 
        point2 ? hrL + dot : hrL, 
        mnH, mnL, 
        space, space, space, space
    ];
    const disp6Img = [
        [space, space, config.display.type[dispNum] === 2 && point1 ? hrH + dot : hrH, 
            point2 ? hrL + dot : hrL, mnH, mnL, space, space
        ],
        [config.display.type[dispNum] === 2 && point1 ? hrH + dot : hrH, point2 ? hrL + dot : hrL, 
            config.display.type[dispNum] === 2 && point1 ? mnH + dot : mnH, point2 ? mnL + dot : mnL, scH, scL, space, space
        ],
        [space, hrH, hrL, point1 ? dash : space, mnH, mnL]
    ];
    const disp8Img = [
        [space, space, hrH, point1 ? hrL + dot : hrL, mnH, mnL, space, space],
        [space, hrH, point1 ? hrL + dot : hrL, mnH, point1 ? mnL + dot : mnL, scH, scL, space],
        [space, space, hrH, hrL, point1 ? dash : space, mnH, mnL, space],
        [hrH, hrL, point1 ? dash : space, mnH, mnL, point1 ? dash : space, scH, scL],
        [hrH, point1 ? hrL + dot : hrL, mnH, point1 ? mnL + dot : mnL, scH, point1 ? scL + dot : scL, msH, msL]
    ];

    return dispLength === '4-dig' ? disp4Img : dispLength === '6-dig' ? disp6Img[sens] : disp8Img[sens]; 
}