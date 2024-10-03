import { printText, printSegment, fillRect, fillCircle, drawScaledImage } from '../atoms/canvas/primitives';
import * as symb from '../atoms/img/symbols';
import lcdCloseButton from '../atoms/canvas/lcdCloseButton';
import moment from 'moment';
import { getLocale } from '../atoms/getLocale';
import lcdColors from '../atoms/canvas/lcdColors';
import { iLcdClockState } from '../interfaces';

export function displayLcdClockScreen(ctx: CanvasRenderingContext2D, 
    model: number, dispModel: number, state: iLcdClockState | undefined, clockType: string
): iLcdClockState {
    const color = lcdColors();

    if(!state?.skeleton || clockType !== state?.clockType) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, color.BG);
        lcdCloseButton(ctx, dispModel);
    }

    const hour = moment().hour();
    const minute = moment().minute();
    const second = moment().second();
    const dt = new Date();
    const points = (dt.getMilliseconds() % 1000) > 500;
    const ll = moment().locale(getLocale()).format('LL').match(/^.+\d{4}/gm);
    const date = ll ? ll[0] : '';
    const wd = moment().locale(getLocale()).format('dddd');
    const weekday = wd.charAt(0).toUpperCase() + wd.slice(1);

    if(points !== state?.points) {
        if(clockType === 'big') { // Big clock
            const font = dispModel ? 140 : 160;
            const w = dispModel ? 160 : 181;
            const x = dispModel ? 178 : 200;
            const y = dispModel ? 68 : 64;
            const p = dispModel ? 6 : 8;
            printSegment(ctx, 4, y, w, font, hour.toString().padStart(2, ' '), font, color.CLOCK, color.BG);
            fillCircle(ctx, dispModel ? 160 : 182, 100, p + (points ? 0 : 1), points ? color.CLOCK : color.BG);
            fillCircle(ctx, dispModel ? 158 : 177, 150, p + (points ? 0 : 1), points ? color.CLOCK : color.BG);
            printSegment(ctx, x, y, w, font, minute.toString().padStart(2, '0'), font, color.CLOCK, color.BG);
        }
        if(clockType === 'small') { // Small clock
            const font = dispModel ? 96 : 110;
            const w = dispModel ? 106 : 120;
            const x1 = dispModel ? 113 : 127;
            const x2 = dispModel ? 222 : 250;
            const y = dispModel ? 82 : 74;
            const p = dispModel ? 4 : 5;
            printSegment(ctx, 4, y, w, font, hour.toString().padStart(2, ' '), font, color.CLOCK, color.BG);
            fillCircle(ctx, dispModel ? 107 : 121, 100, p + 1, color.BG);
            fillCircle(ctx, dispModel ? 107 : 121, 100, p, color.CLOCK);
            fillCircle(ctx, dispModel ? 105 : 119, 134, p + 1, color.BG);
            fillCircle(ctx, dispModel ? 105 : 119, 134, p, color.CLOCK);
            printSegment(ctx, x1, y, w, font, minute.toString().padStart(2, '0'), font, color.CLOCK, color.BG);
            fillCircle(ctx, dispModel ? 216 : 244, 100, p + 1, color.BG);
            fillCircle(ctx, dispModel ? 216 : 244, 100, p, color.CLOCK);
            fillCircle(ctx, dispModel ? 214 : 242, 134, p + 1, color.BG);
            fillCircle(ctx, dispModel ? 214 : 242, 134, p, color.CLOCK);
            printSegment(ctx, x2, y, w, font, second.toString().padStart(2, '0'), font, color.CLOCK, color.BG);
        }
        if(clockType === 'analog') { // Analog clock
            drawScaledImage(ctx, symb.clockFace(), dispModel ? 40 : 61, 0, 240, 240);
            setTimeout(() => {
                drawHand(ctx, 70, hour * 30 + minute / 2, 4, color.ARROW1, dispModel);
                drawHand(ctx, 100, minute * 6 + second / 10, 2, color.ARROW1, dispModel);
                if(model !== 1) drawHand(ctx, 110, second * 6, 1, color.ARROW2, dispModel);
            }, 1);
        }
        else { // Weekday and date
            printText(ctx, dispModel ? 30 : 36, 8, dispModel ? 260 : 290, 30, weekday, 28, 'center', color.WEEKDAY, color.BG);
            printText(ctx, dispModel ? 30 : 36, 200, dispModel ? 260 : 290, 30, date, 28, 'center', color.DATE, color.BG);
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