import store from '../../redux/store';
import { drawLine, fillRect, printText } from '../../atoms/canvas/primitives';
import lcdCloseButton from '../../atoms/canvas/lcdCloseButton';
import type { iAlarmScreen } from '../../interfaces';
import i18n from '../../i18n/main';
import moment from 'moment';
import { getLocale } from '../../atoms/getLocale';
import lcdColors from '../../atoms/canvas/lcdColors';
import * as D from '../../atoms/constants/displayTypes';

export function displayLcdAlarmScreen(ctx: CanvasRenderingContext2D, 
    dispModel: number, state: iAlarmScreen | undefined
): iAlarmScreen {
    const alarm = store.getState().alarm;
    const color = lcdColors();
    let xs = 10, ws = 420, bs = 105, nxs = 11, nys = 6, tys = 31, wys = 90, f1 = 16, f2 = 24, // NX4832K(T)035 
        cb1 = 30, wy = 68, wx1 = 4, wx2 = 42, wx3 = 80, cb2 = 10, wg = 14, cs1 = 6, cs2 = 16; 
    switch(dispModel) {
        case D.NX4827K043: 
            xs = 10; ws = 420; bs = 105; nxs = 11; nys = 5; tys = 22; wys = 74; f1 = 16; f2 = 24; 
            cb1 = 30; wy = 56; wx1 = 4; wx2 = 42; wx3 = 80; cb2 = 10; wg = 14; cs1 = 6; cs2 = 16;
            break;
        case D.ILI9341: 
            xs = 1; ws = 288; bs = 72; nxs = 2; nys = 5; tys = 24; wys = 64; f1 = 10; f2 = 16; 
            cb1 = 18; wy = 50; wx1 = 2; wx2 = 28; wx3 = 55; cb2 = 7; wg = 9; cs1 = -2; cs2 = 6;
            break;
    }
    const ch3 = ctx.canvas.height / 3;

    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, color.BG);
        lcdCloseButton(ctx, dispModel);
        for(let i=0; i<4; i++) drawLine(ctx, xs, i * ch3, ws, 0, color.TEXT);
        for(let i=0; i<5; i++) drawLine(ctx, i * bs + xs, 0, 0, ctx.canvas.height, color.TEXT);
    }

    const alarmStr = JSON.stringify(alarm);
    if(state?.alarm !== alarmStr) {
        let mo = moment().locale(getLocale()).isoWeekday(1).format('dd');
        mo = mo.charAt(0).toUpperCase() + mo.slice(1);
        let su = moment().locale(getLocale()).isoWeekday(0).format('dd');
        su = su.charAt(0).toUpperCase() + su.slice(1);
        let alarmNr = 0;
        const WEEKEND = 6;

        for(let v=0; v<3; v++) {
            for(let h=0; h<4; h++) {
                // alarm number
                const x = h * bs, y = v * ch3;
                const alarmNum = i18n.t('alarm') + ' ' + (alarmNr + 1).toString();
                printText(ctx, x + nxs, y + nys, bs - 2, f1, alarmNum, f1, 'center', color.TEXT, color.BG);
                // time
                let time = alarm.alarm.time[alarmNr][0].toString().padStart(2, '0') + ':';
                time += alarm.alarm.time[alarmNr][1].toString().padStart(2, '0');
                printText(ctx, x + nxs, y + tys + 4, bs - cb1, f2, time, f2, 'center', color.TEXT, color.BG);
                // checkbox
                const xc = x + (bs - cb1) + cs1;
                drawLine(ctx, xc, y + tys, cb1, 0, color.FRAME1);
                drawLine(ctx, xc, y + tys, 0, cb1, color.FRAME1);
                drawLine(ctx, xc, y + tys + cb1, cb1, 0, color.FRAME2);
                drawLine(ctx, xc + cb1, y + tys, 0, cb1, color.FRAME2);
                if(alarm.alarm.states[alarmNr]) fillRect(ctx, xc + 2, y + tys + 2, cb1 - 4, cb1 - 4, color.BOX);
                // weekdays
                printText(ctx, x + nxs + wx1, y + wy, f1, f1, mo, f1, 'right', color.TEXT, color.BG);
                printText(ctx, x + nxs + wx2, y + wy, f1, f1, '. . . . . . . .', f1, 'center', color.TEXT, color.BG);
                printText(ctx, x + nxs + wx3, y + wy, f1, f1, su, f1, 'left', color.WEEKEND, color.BG);
                for(let i=0; i<7; i++) {
                    const xw = x + i * wg + cs2;
                    drawLine(ctx, xw, y + wys, cb2, 0, color.FRAME1);
                    drawLine(ctx, xw, y + wys, 0, cb2, color.FRAME1);
                    drawLine(ctx, xw, y + wys + cb2, cb2, 0, color.FRAME2);
                    drawLine(ctx, xw + cb2, y + wys, 0, cb2, color.FRAME2);
                    if(alarm.alarm.weekdays[alarmNr][i]) {
                        fillRect(ctx, xw + 1, y + wys + 1, cb2 - 2, cb2 - 2, i < WEEKEND ? color.BOX : color.WEEKEND);
                    }
                }
                alarmNr++;
            }
        }
    }

    const prevState: iAlarmScreen = {
        x: state?.x ?? 0,
        y: state?.y ?? 0,
        click: false,
        skeleton: true,
        alarm: alarmStr
    };

    return prevState;
}