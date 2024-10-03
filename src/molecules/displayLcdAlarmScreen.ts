import store from '../redux/store';
import { drawLine, fillRect, printText } from '../atoms/canvas/primitives';
import lcdCloseButton from '../atoms/canvas/lcdCloseButton';
import { iAlarmScreen } from '../interfaces';
import i18n from '../i18n/main';
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/ru';
import 'moment/locale/pl';
import 'moment/locale/uk';
import 'moment/locale/bg';

export function displayLcdAlarmScreen(ctx: CanvasRenderingContext2D, 
    dispModel: number, state: iAlarmScreen | undefined
): iAlarmScreen {
    const config = store.getState().config;
    const alarm = store.getState().alarm;
    const locale = config.lang === 'ua' ? 'uk' : config.lang;
    const BG_COLOR = '#000';
    const TEXT_COLOR = '#FFF';
    const WEEKEND_COLOR = '#F00';
    const BOX_COLOR = '#1828F8';
    const FRAME1_COLOR = '#777';
    const FRAME2_COLOR = '#FFF';

    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, BG_COLOR);
        lcdCloseButton(ctx, dispModel);
        for(let i=0; i<4; i++) drawLine(ctx, 3, i * 80, dispModel ? 288 : 320, 0, TEXT_COLOR);
        for(let i=0; i<5; i++) drawLine(ctx, i * (dispModel ? 72 : 80) + 3, 0, 0, 240, TEXT_COLOR);
    }

    const alarmStr = JSON.stringify(alarm);
    if(state?.alarm !== alarmStr) {
        let mo = moment().locale(locale).isoWeekday(1).format('dd');
        mo = mo.charAt(0).toUpperCase() + mo.slice(1);
        let su = moment().locale(locale).isoWeekday(0).format('dd');
        su = su.charAt(0).toUpperCase() + su.slice(1);
        let alarmNr = 0;

        for(let v=0; v<3; v++) {
            for(let h=0; h<4; h++) {
                // alarm number
                const x = h * (dispModel ? 72 : 80), y = v * 80;
                const alarmNum = i18n.t('alarm') + (alarmNr + 1).toString();
                printText(ctx, x + (dispModel ? 4 : 8), y + 5, 70, 11, alarmNum, 10, 'center', TEXT_COLOR, BG_COLOR);
                // time
                let time = alarm.alarm.time[alarmNr][0].toString().padStart(2, '0') + ':';
                time += alarm.alarm.time[alarmNr][1].toString().padStart(2, '0');
                printText(ctx, x + (dispModel ? 4 : 8), y + 27, 46, 16, time, 16, 'center', TEXT_COLOR, BG_COLOR);
                // checkbox
                const xc = x + (dispModel ? 51 : 55);
                drawLine(ctx, xc, y + 24, 18, 0, FRAME1_COLOR);
                drawLine(ctx, xc, y + 24, 0, 18, FRAME1_COLOR);
                drawLine(ctx, xc, y + 42, 18, 0, FRAME2_COLOR);
                drawLine(ctx, xc + 18, y + 24, 0, 18, FRAME2_COLOR);
                if(alarm.alarm.states[alarmNr]) fillRect(ctx, xc + 2, y + 26, 14, 14, BOX_COLOR);
                // weekdays
                printText(ctx, x + (dispModel ? 4 : 8), y + 48, 16, 11, mo, 10, 'right', TEXT_COLOR, BG_COLOR);
                printText(ctx, x + (dispModel ? 20 : 24), y + 48, 40, 11, '. . . . . . . .', 10, 'center', TEXT_COLOR, BG_COLOR);
                printText(ctx, x + (dispModel ? 59 : 63), y + 48, 15, 11, su, 10, 'left', WEEKEND_COLOR, BG_COLOR);
                for(let i=0; i<7; i++) {
                    const xw = x + i * 9 + (dispModel ? 8 : 12);
                    drawLine(ctx, xw, y + 62, 7, 0, FRAME1_COLOR);
                    drawLine(ctx, xw, y + 62, 0, 7, FRAME1_COLOR);
                    drawLine(ctx, xw, y + 69, 7, 0, FRAME2_COLOR);
                    drawLine(ctx, xw + 7, y + 62, 0, 7, FRAME2_COLOR);
                    if(alarm.alarm.weekdays[alarmNr][i]) fillRect(ctx, xw + 1, y + 63, 5, 5, i < 6 ? BOX_COLOR : WEEKEND_COLOR);
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