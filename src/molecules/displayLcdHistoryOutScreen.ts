import { fillRect } from '../atoms/canvas/primitives';
import { displayLcdHistoryTitle } from './displayLcdHistoryTitle';
import lcdCloseButton from '../atoms/canvas/lcdCloseButton';
import lcdForwardButton from '../atoms/canvas/lcdForwardButton';
import lcdBackButton from '../atoms/canvas/lcdBackButton';
import displayLcdHourlyColumn from './displayLcdHourlyColumn';
import displayLcdHourlyCharts from './displayLcdHourlyCharts';
import { iLcdHourlyState, iHourlyWeather } from '../interfaces';
import i18n from '../i18n/main';

export function displayLcdHistoryOutScreen(ctx: CanvasRenderingContext2D, dispModel: number, 
    weather: iHourlyWeather | undefined, state: iLcdHourlyState | undefined, shift: number
): iLcdHourlyState {
    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, '#000');
        lcdCloseButton(ctx, dispModel);
        displayLcdHistoryTitle(ctx, i18n.t('outdoorHistory'));
    }

    if(JSON.stringify(state?.weather) !== JSON.stringify(weather) || state?.shift !== shift) {
        displayLcdHourlyCharts(ctx, dispModel, weather, shift, 'historyOut');
        for(let i=0; i<8; i++) {
            displayLcdHourlyColumn(ctx, dispModel, weather, i, shift, 'historyOut');
        }
        lcdForwardButton(ctx, dispModel, shift < 16);
        lcdBackButton(ctx, dispModel, shift > 0);
    }

    const prevState: iLcdHourlyState = {
        skeleton: true,
        weather: weather,
        shift: shift
    };

    return prevState;
}