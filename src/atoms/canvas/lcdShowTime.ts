import moment from "moment";
import { drawImage, fillRect } from "./primitives";
import D_0 from '../img/digits/0';
import D_1 from '../img/digits/1';
import D_2 from '../img/digits/2';
import D_3 from '../img/digits/3';
import D_4 from '../img/digits/4';
import D_5 from '../img/digits/5';
import D_6 from '../img/digits/6';
import D_7 from '../img/digits/7';
import D_8 from '../img/digits/8';
import D_9 from '../img/digits/9';

function showDigit(ctx: CanvasRenderingContext2D, dig: number, x: number, bgColor: string) {
    switch(dig) {
        case 0: drawImage(ctx, D_0(), x, 0); break;
        case 1: drawImage(ctx, D_1(), x, 0); break;
        case 2: drawImage(ctx, D_2(), x, 0); break;
        case 3: drawImage(ctx, D_3(), x, 0); break;
        case 4: drawImage(ctx, D_4(), x, 0); break;
        case 5: drawImage(ctx, D_5(), x, 0); break;
        case 6: drawImage(ctx, D_6(), x, 0); break;
        case 7: drawImage(ctx, D_7(), x, 0); break;
        case 8: drawImage(ctx, D_8(), x, 0); break;
        case 9: drawImage(ctx, D_9(), x, 0); break;
        default: fillRect(ctx, x, 0, 32, 78, bgColor); break;
    }
}

export default function lcdShowTime(ctx: CanvasRenderingContext2D, time: number, bgColor: string) {
    const hr = moment.unix(time).hour();
    const mn = moment.unix(time).minute();
    
    if(hr < 10) showDigit(ctx, 10, 0, bgColor);
    else showDigit(ctx, Math.floor(hr / 10), 0, bgColor);
    showDigit(ctx, hr % 10, 33, bgColor);
    showDigit(ctx, Math.floor(mn / 10), 77, bgColor);
    showDigit(ctx, mn % 10, 109, bgColor);
}