import store from '../../redux/store';
import { printText, printSegment, fillRect, fillCircle, drawScaledImage } from '../../atoms/canvas/primitives';
import * as symb from '../../atoms/img/symbols';
import lcdCloseButton from '../../atoms/canvas/lcdCloseButton';
import moment from 'moment';
import { getLocale } from '../../atoms/getLocale';
import lcdColors from '../../atoms/canvas/lcdColors';
import type { iLcdClockState } from '../../interfaces';
import * as D from '../../atoms/constants/displayTypes';
import lcdSegmentFont from '../../atoms/canvas/lcdSegmentFont';

export function displayLcdClockScreen(
    ctx: CanvasRenderingContext2D, dispModel: number, 
    state: iLcdClockState | undefined, clockType: string
): iLcdClockState {
    const color = lcdColors();

    if(!state?.skeleton || clockType !== state?.clockType) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, color.BG);
        lcdCloseButton(ctx, dispModel);
    }

    let hourFormat;
    switch(store.getState().config.clock.format) {
        case 0: hourFormat = 'h'; break;
        case 1: hourFormat = 'hh'; break;
        case 2: hourFormat = 'H'; break;
        default: hourFormat = 'HH'; break;
    }

    const hour = moment().format(hourFormat);
    const leadZero = hourFormat === 'hh' || hourFormat === 'HH' || Math.floor(+hour / 10) > 0;
    const minute = moment().minute();
    const second = moment().second();
    const dt = new Date();
    const points = (dt.getMilliseconds() % 1000) > 500;
    const dd = moment().locale(getLocale());
    let date = '';
    if(getLocale() === 'es' && dispModel) {
        const monthName = dd.format('MMMM');
        if(monthName.length > 7) date = `${dd.date()} de ${dd.format('MMM')} de ${dd.year()}`;
        else date = dd.format('LL');
    } 
    else if(getLocale() === 'ru' || getLocale() === 'uk') {
        date = dd.format('D MMMM YYYY'); 
    }
    else {
        date = dd.format('LL');
    }

    const wd = moment().locale(getLocale()).format('dddd');
    const weekday = wd.charAt(0).toUpperCase() + wd.slice(1);

    if(points !== state?.points) {
        if(clockType === 'big') { // Big clock
            let x1 = 22, x2 = 272, xp1 = 243, xp2 = 238, y = 88, s = 30, // NX4832K(T)035
                yp1 = 134, yp2 = 202, r = 8, w = 220, f = 212;
            switch(dispModel) {
                case D.NX4827K043: 
                    x1 = 22; x2 = 272; xp1 = 242; xp2 = 237; y = 60; s = 30;
                    yp1 = 114; yp2 = 172; r = 8; w = 220; f = 212; 
                    break;
                case D.ILI9341: 
                    x1 = 10; x2 = 178; xp1 = 158; xp2 = 155; y = 68; s = 19;
                    yp1 = 100; yp2 = 140; r = 6; w = 160; f = 140; 
                    break;
            }
            fillRect(ctx, 0, y, ctx.canvas.width, f, color.BG);
            if(leadZero) lcdSegmentFont(ctx, x1, y, Math.floor(+hour / 10), color.CLOCK, s);
            lcdSegmentFont(ctx, x1 + w / 2.3, y, Math.floor(+hour % 10), color.CLOCK, s);
            fillCircle(ctx, xp1, yp1, r + (points ? 0 : 1), points ? color.CLOCK : color.BG);
            fillCircle(ctx, xp2, yp2, r + (points ? 0 : 1), points ? color.CLOCK : color.BG);
            lcdSegmentFont(ctx, x2, y, Math.floor(minute / 10), color.CLOCK, s);
            lcdSegmentFont(ctx, x2 + w / 2.3, y, Math.floor(minute % 10), color.CLOCK, s);
        }
        if(clockType === 'small') { // Small clock
            let x1 = 12, x2 = 177, x3 = 340, xp1 = 158, xp2 = 156, xp3 = 322, // NX4832K(T)035
                xp4 = 320, y = 104, s = 20, yp1 = 140, yp2 = 179, r = 4, w = 152, f = 144;
            switch(dispModel) {
                case D.NX4827K043: 
                    x1 = 12; x2 = 177; x3 = 340; xp1 = 158; xp2 = 156; xp3 = 322; 
                    xp4 = 320; y = 88; s = 20; yp1 = 124; yp2 = 163; r = 4; w = 152; f = 144; 
                    break;
                case D.ILI9341: 
                    x1 = 11; x2 = 114; x3 = 226; xp1 = 107; xp2 = 105; xp3 = 216; 
                    xp4 = 214; y = 78; s = 14; yp1 = 100; yp2 = 134; r = 4; w = 106; f = 96; 
                    break;
            }
            fillRect(ctx, 0, y, ctx.canvas.width, f, color.BG);
            if(leadZero) lcdSegmentFont(ctx, x1, y, Math.floor(+hour / 10), color.CLOCK, s);
            lcdSegmentFont(ctx, x1 + w / 2.3, y, Math.floor(+hour % 10), color.CLOCK, s);
            fillCircle(ctx, xp1, yp1, r, color.CLOCK);
            fillCircle(ctx, xp2, yp2, r, color.CLOCK);
            lcdSegmentFont(ctx, x2, y, Math.floor(minute / 10), color.CLOCK, s);
            lcdSegmentFont(ctx, x2 + w / 2.3, y, Math.floor(minute % 10), color.CLOCK, s);
            fillCircle(ctx, xp3, yp1, r, color.CLOCK);
            fillCircle(ctx, xp4, yp2, r, color.CLOCK);
            lcdSegmentFont(ctx, x3, y, Math.floor(second / 10), color.CLOCK, s);
            lcdSegmentFont(ctx, x3 + w / 2.3, y, Math.floor(second % 10), color.CLOCK, s);
        }
        if(clockType === 'analog') { // Analog clock
            drawScaledImage(ctx, symb.clockFace(), ctx.canvas.width / 2 - ctx.canvas.height / 2, 0, ctx.canvas.height, ctx.canvas.height);
            let lh = 100, lm = 130, ls = 155; // NX4832K(T)035
            switch(dispModel) {
                case D.NX4827K043: lh = 80; lm = 110; ls = 128; break;
                case D.ILI9341: lh = 70; lm = 100; ls = 110; break;
            }

            setTimeout(() => {
                drawHand(ctx, lh, +hour * 30 + minute / 2, 4, color.ARROW1);
                drawHand(ctx, lm, minute * 6 + second / 10, 2, color.ARROW1);
                drawHand(ctx, ls, second * 6, 1, color.ARROW2);
            }, 1);
        }
        else { // Weekday and date
            let x1 = 48, y1 = 10, y2 = 270, w1 = 384, h = 49, f = 48; // NX4832K(T)035
            switch(dispModel) {
                case D.NX4827K043: x1 = 48; y1 = 2; y2 = 238; w1 = 384; h = 40; f = 36; break;
                case D.ILI9341: x1 = 30; y1 = 8; y2 = 200; w1 = 260; h = 30; f = 29; break;
            }
            printText(ctx, x1, y1, w1, h, weekday, f, 'center', color.WEEKDAY, color.BG);
            printText(ctx, 0, y2, ctx.canvas.width, h, date, f, 'center', color.DATE, color.BG);
        }
    }

    const prevState: iLcdClockState = {
        skeleton: true,
        points: points,
        clockType: clockType
    };

    return prevState;
}

function drawHand(ctx: CanvasRenderingContext2D, length: number, angle: number, width: number, color: string) {
    var centerX = ctx.canvas.width / 2;
    var centerY = ctx.canvas.height / 2;
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