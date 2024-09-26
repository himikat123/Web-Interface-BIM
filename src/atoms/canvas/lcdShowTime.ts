import moment from "moment";
import store from '../../redux/store';
import { drawImage, fillRect } from "./primitives";
import * as digit from '../img/digits';

function showDigit(ctx: CanvasRenderingContext2D, dig: number, x: number, bgColor: string) {
    switch(dig) {
        case 0: drawImage(ctx, digit.d_0(), x, 0); break;
        case 1: drawImage(ctx, digit.d_1(), x, 0); break;
        case 2: drawImage(ctx, digit.d_2(), x, 0); break;
        case 3: drawImage(ctx, digit.d_3(), x, 0); break;
        case 4: drawImage(ctx, digit.d_4(), x, 0); break;
        case 5: drawImage(ctx, digit.d_5(), x, 0); break;
        case 6: drawImage(ctx, digit.d_6(), x, 0); break;
        case 7: drawImage(ctx, digit.d_7(), x, 0); break;
        case 8: drawImage(ctx, digit.d_8(), x, 0); break;
        case 9: drawImage(ctx, digit.d_9(), x, 0); break;
        default: fillRect(ctx, x, 0, 32, 78, bgColor); break;
    }
}

export default function lcdShowTime(ctx: CanvasRenderingContext2D, prevTime: number | undefined, bgColor: string): number {
    const time = store.getState().data.time;
    if(time !== prevTime) {
        const hr = moment.unix(time).utc().hour();
        const mn = moment.unix(time).utc().minute();
    
        if(hr < 10) showDigit(ctx, 10, 0, bgColor);
        else showDigit(ctx, Math.floor(hr / 10), 0, bgColor);
        showDigit(ctx, hr % 10, 33, bgColor);
        showDigit(ctx, Math.floor(mn / 10), 77, bgColor);
        showDigit(ctx, mn % 10, 109, bgColor);
    }
    return time;
}