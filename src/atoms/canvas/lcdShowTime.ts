import moment from "moment";
import { drawScaledImage, fillRect } from "./primitives";
import * as digit from '../img/digits';
import * as D from "../constants/displayTypes";
import { iConf } from '../../redux/configTypes';
import { iDat } from '../../redux/dataTypes';

function showDigit(ctx: CanvasRenderingContext2D, w: number, h: number, dig: number, x: number, y: number, bgColor: string) {
    switch(dig) {
        case 0: drawScaledImage(ctx, digit.d_0(), x, y, w, h); break;
        case 1: drawScaledImage(ctx, digit.d_1(), x, y, w, h); break;
        case 2: drawScaledImage(ctx, digit.d_2(), x, y, w, h); break;
        case 3: drawScaledImage(ctx, digit.d_3(), x, y, w, h); break;
        case 4: drawScaledImage(ctx, digit.d_4(), x, y, w, h); break;
        case 5: drawScaledImage(ctx, digit.d_5(), x, y, w, h); break;
        case 6: drawScaledImage(ctx, digit.d_6(), x, y, w, h); break;
        case 7: drawScaledImage(ctx, digit.d_7(), x, y, w, h); break;
        case 8: drawScaledImage(ctx, digit.d_8(), x, y, w, h); break;
        case 9: drawScaledImage(ctx, digit.d_9(), x, y, w, h); break;
        default: fillRect(ctx, x, y, w, h, bgColor); break;
    }
}

export default function lcdShowTime(
    ctx: CanvasRenderingContext2D, dispModel: number, prevTime: number | undefined, 
    bgColor: string, config: iConf, data: iDat
): number {
    const time = data.time;
    const format = config.clock.format;

    if(time !== prevTime) {
        const hr = +moment.unix(time).utc().format(format > 1 ? 'H' : 'h');
        const mn = moment.unix(time).utc().minute();
    
        let size = { w: 42, h: 102, x: 2, y: 2, m: 4, p: 26 }; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: size = { w: 42, h: 86, x: 2, y: 2, m: 4, p: 26 }; break;
            case D.ILI9341: size = { w: 32, h: 78, x: 0, y: 0, m: 1, p: 12 }; break;
        }

        if(format % 2 === 0 && hr < 10) showDigit(ctx, size.w, size.h, 10, size.x, size.y, bgColor);
        else showDigit(ctx, size.w, size.h, Math.floor(hr / 10), size.x, size.y, bgColor);
        showDigit(ctx, size.w, size.h, hr % 10, size.x + size.w + size.m, size.y, bgColor);
        showDigit(ctx, size.w, size.h, Math.floor(mn / 10), size.x + size.w * 2 + size.m + size.p, size.y, bgColor);
        showDigit(ctx, size.w, size.h, mn % 10, size.x + size.w * 3 + size.m * 2 + size.p, size.y, bgColor);
    }
    return time;
}