import { printText, fillRect } from '../atoms/canvas/primitives';
import lcdCloseButton from '../atoms/canvas/lcdCloseButton';
import lcdForwardButton from '../atoms/canvas/lcdForwardButton';
import lcdBackButton from '../atoms/canvas/lcdBackButton';
import moment from 'moment';
import { getLocale } from '../atoms/getLocale';
import { iLcdCalendarState } from '../interfaces';

export function displayLcdCalendarScreen(ctx: CanvasRenderingContext2D, 
    dispModel: number, state: iLcdCalendarState | undefined, shift: number
): iLcdCalendarState {
    const font = 20;

    const BG_COLOR      = '#000';
    const MONTH_COLOR   = '#F88000';
    const WEEKDAY_COLOR = '#F8FC00';
    const WEEKEND_COLOR = '#F80000';
    const TODAY_COLOR   = '#0000F8';
    const TODAY_BGCOLOR = '#00FCF8';
    const TEXT_COLOR    = '#FFF';

    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, BG_COLOR);
        const x = dispModel ? 36 : 40;
        for(let i=0; i<7; i++) {
            let wd = moment(i, 'e').locale(getLocale()).startOf('week').isoWeekday(i + 1).format('dd');
            wd = wd.charAt(0).toUpperCase() + wd.slice(1);
            printText(ctx, i * x + x, 40, 36, 26, wd, font, 'center', i < 6 ? WEEKDAY_COLOR : WEEKEND_COLOR, BG_COLOR);
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
        printText(ctx, dispModel ? 30 : 36, 8, dispModel ? 260 : 290, font, month, font, 'center', MONTH_COLOR, BG_COLOR);

        let day = 1;
        const cx = dispModel ? 36 : 40;
        const cy = 28;
        const cw = dispModel ? 32 : 36;
        const ch = font + font / 2;
        let clndRun = false;

        for(let w=0; w<6; w++) {
            for(let d=0; d<7; d++) {
                const today = moment().date() === day 
                    && moment().month() === moment().locale(getLocale()).add(shift, 'month').month()
                    && moment().year() === moment().locale(getLocale()).add(shift, 'month').year();
                const color = today ? TODAY_COLOR : TEXT_COLOR;
                const bgColor = today ? TODAY_BGCOLOR : BG_COLOR;
                if(firstWeekday === d) clndRun = true;
                if(day > daysInMonth) clndRun = false;
                if(clndRun) {
                    printText(ctx, d * cx + cx, w * cy + 64, cw, ch, day.toString(), font, 'center', color, bgColor, true);
                    day++;
                }
                else printText(ctx, d * cx + cx, w * cy + 64, cw, ch, '  ', font, 'center', TEXT_COLOR, BG_COLOR);
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