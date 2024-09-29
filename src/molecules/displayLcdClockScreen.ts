import store from '../redux/store';
import { printText, printSegment, fillRect, fillCircle, drawScaledImage } from '../atoms/canvas/primitives';
import * as symb from '../atoms/img/symbols';
import lcdCloseButton from '../atoms/canvas/lcdCloseButton';
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/ru';
import 'moment/locale/pl';
import 'moment/locale/uk';
import 'moment/locale/bg';
import { iLcdClockState } from '../interfaces';

export function displayLcdClockScreen(ctx: CanvasRenderingContext2D, 
    model: number, dispModel: number, state: iLcdClockState | undefined, clockType: string
): iLcdClockState {
    const config = store.getState().config;
    const locale = config.lang === 'ua' ? 'uk' : config.lang;

    const BG_COLOR    = '#000';
    const CLOCK_COLOR = '#0F0';
    const ARROW1_COLOR = '#00FC00';
    const ARROW2_COLOR = '#F80000';
    const WEEKDAY_COLOR = '#F8FC00';
    const DATE_COLOR = '#F88000';

    if(!state?.skeleton || clockType !== state?.clockType) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, BG_COLOR);
        lcdCloseButton(ctx, dispModel);
    }

    const hour = moment().hour();
    const minute = moment().minute();
    const second = moment().second();
    const dt = new Date();
    const points = (dt.getMilliseconds() % 1000) > 500;
    const ll = moment().locale(locale).format('LL').match(/^.+\d{4}/gm);
    const date = ll ? ll[0] : '';
    const wd = moment().locale(locale).format('dddd');
    const weekday = wd.charAt(0).toUpperCase() + wd.slice(1);

    if(points !== state?.points) {
        if(clockType === 'big') { // Big clock
            const font = dispModel ? 140 : 160;
            const w = dispModel ? 160 : 181;
            const x = dispModel ? 178 : 200;
            const y = dispModel ? 68 : 64;
            const p = dispModel ? 6 : 8;
            printSegment(ctx, 4, y, w, font, hour.toString().padStart(2, ' '), font, CLOCK_COLOR, BG_COLOR);
            fillCircle(ctx, dispModel ? 160 : 182, 100, p + (points ? 0 : 1), points ? CLOCK_COLOR : BG_COLOR);
            fillCircle(ctx, dispModel ? 158 : 177, 150, p + (points ? 0 : 1), points ? CLOCK_COLOR : BG_COLOR);
            printSegment(ctx, x, y, w, font, minute.toString().padStart(2, '0'), font, CLOCK_COLOR, BG_COLOR);
        }
        if(clockType === 'small') { // Small clock
            const font = dispModel ? 96 : 110;
            const w = dispModel ? 106 : 120;
            const x1 = dispModel ? 113 : 127;
            const x2 = dispModel ? 222 : 250;
            const y = dispModel ? 82 : 74;
            const p = dispModel ? 4 : 5;
            printSegment(ctx, 4, y, w, font, hour.toString().padStart(2, ' '), font, CLOCK_COLOR, BG_COLOR);
            fillCircle(ctx, dispModel ? 107 : 121, 100, p + 1, BG_COLOR);
            fillCircle(ctx, dispModel ? 107 : 121, 100, p, CLOCK_COLOR);
            fillCircle(ctx, dispModel ? 105 : 119, 134, p + 1, BG_COLOR);
            fillCircle(ctx, dispModel ? 105 : 119, 134, p, CLOCK_COLOR);
            printSegment(ctx, x1, y, w, font, minute.toString().padStart(2, '0'), font, CLOCK_COLOR, BG_COLOR);
            fillCircle(ctx, dispModel ? 216 : 244, 100, p + 1, BG_COLOR);
            fillCircle(ctx, dispModel ? 216 : 244, 100, p, CLOCK_COLOR);
            fillCircle(ctx, dispModel ? 214 : 242, 134, p + 1, BG_COLOR);
            fillCircle(ctx, dispModel ? 214 : 242, 134, p, CLOCK_COLOR);
            printSegment(ctx, x2, y, w, font, second.toString().padStart(2, '0'), font, CLOCK_COLOR, BG_COLOR);
        }
        if(clockType === 'analog') { // Analog clock
            drawScaledImage(ctx, symb.clockFace(), dispModel ? 40 : 61, 0, 240, 240);
            setTimeout(() => {
                drawHand(ctx, 70, hour * 30 + minute / 2, 4, ARROW1_COLOR, dispModel);
                drawHand(ctx, 100, minute * 6 + second / 10, 2, ARROW1_COLOR, dispModel);
                if(model !== 1) drawHand(ctx, 110, second * 6, 1, ARROW2_COLOR, dispModel);
            }, 1);
        }
        else { // Weekday and date
            printText(ctx, dispModel ? 30 : 36, 8, dispModel ? 260 : 290, 30, weekday, 28, 'center', WEEKDAY_COLOR, BG_COLOR);
            printText(ctx, dispModel ? 30 : 36, 200, dispModel ? 260 : 290, 30, date, 28, 'center', DATE_COLOR, BG_COLOR);
        }
    }

    const prevState: iLcdClockState = {
        skeleton: true,
        points: points,
        clockType: clockType
    };

    return prevState;
}

function drawHand(ctx: CanvasRenderingContext2D, length: number, angle: number, width: number, color: string, dispModel: number) {
    var centerX = dispModel ? 160 : 181;
    var centerY = 240 / 2;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.save();
    ctx.beginPath();
    ctx.translate(centerX, centerY);
    ctx.rotate(-180 * Math.PI / 180);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, length);
    ctx.lineTo(0, -10 + width * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}