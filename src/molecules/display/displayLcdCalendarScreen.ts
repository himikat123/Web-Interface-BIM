import { printText, fillRect } from '../../atoms/canvas/primitives';
import lcdCloseButton from '../../atoms/canvas/lcdCloseButton';
import lcdForwardButton from '../../atoms/canvas/lcdForwardButton';
import lcdBackButton from '../../atoms/canvas/lcdBackButton';
import moment from 'moment';
import { getLocale } from '../../atoms/getLocale';
import lcdColors from '../../atoms/canvas/lcdColors';
import type { iLcdCalendarState } from '../../interfaces';
import * as D from '../../atoms/constants/displayTypes';

export function displayLcdCalendarScreen(ctx: CanvasRenderingContext2D, 
    dispModel: number, state: iLcdCalendarState | undefined, shift: number
): iLcdCalendarState {
    let font = 32, xm = 50, ym = 8, wm = 380, y = 44, cx = 52, cy = 40, cw = 54, ch = 30, h = 78; // NX4832K(T)035
    switch(dispModel) {
        case D.NX4827K043: font = 28; xm = 50; ym = 8; wm = 380; y = 46; cx = 52; cy = 30; cw = 54; ch = 26; h = 78; break;
        case D.ILI9341: font = 20; xm = 30; ym = 8; wm = 260; y = 40; cx = 36; cy = 28; cw = 32; ch = 30; h = 64; break;
    }
    const color = lcdColors();

    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, color.BG);
        for(let i=0; i<7; i++) {
            let wd = moment(i, 'e').locale(getLocale()).startOf('week').isoWeekday(i + 1).format('dd');
            wd = wd.charAt(0).toUpperCase() + wd.slice(1);
            printText(ctx, i * cx + cx, y, cw, ch, wd, font, 'center', i < 6 ? color.WEEKDAY : color.WEEKEND, color.BG);
        }
        lcdCloseButton(ctx, dispModel);
        lcdForwardButton(ctx, dispModel, true);
        lcdBackButton(ctx, dispModel, true);
    }

    const date = moment().date();
    let firstWeekday = moment().add(shift, 'month').startOf('month').weekday();
    let daysInMonth = moment().add(shift, 'month').daysInMonth();
    firstWeekday -= 1;
    if(firstWeekday < 0) firstWeekday = 6;

    if(state?.shift !== shift || state?.date !== date) {
        let month = moment().locale(getLocale()).add(shift, 'month').format('MMMM YYYY');
        month = month.charAt(0).toUpperCase() + month.slice(1);
        printText(ctx, xm, ym, wm, font, month, font, 'center', color.MONTH, color.BG);

        let day = 1;
        let clndRun = false;

        for(let w=0; w<6; w++) {
            for(let d=0; d<7; d++) {
                const today = moment().date() === day 
                    && moment().month() === moment().locale(getLocale()).add(shift, 'month').month()
                    && moment().year() === moment().locale(getLocale()).add(shift, 'month').year();
                const tdColor = today ? color.TODAY : (d === 6 ? color.WEEKEND : color.TEXT);
                const bgColor = today ? color.TODAY_BG : color.BG;
                if(firstWeekday === d) clndRun = true;
                if(day > daysInMonth) clndRun = false;
                if(clndRun) {
                    printText(ctx, d * cx + cx, w * cy + h, cw, ch, day.toString(), font, 'center', tdColor, bgColor, true);
                    day++;
                }
                else printText(ctx, d * cx + cx, w * cy + h, cw, ch, '  ', font, 'center', color.TEXT, color.BG);
            }
        }
    }

    const prevState: iLcdCalendarState = {
        skeleton: true,
        shift: shift,
        date: date
    };

    return prevState;
}