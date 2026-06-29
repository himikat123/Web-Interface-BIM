import { fillRect } from '../../atoms/canvas/primitives';
import { displayLcdHistoryTitle } from './displayLcdHistoryTitle';
import lcdCloseButton from '../../atoms/canvas/lcdCloseButton';
import lcdForwardButton from '../../atoms/canvas/lcdForwardButton';
import lcdBackButton from '../../atoms/canvas/lcdBackButton';
import displayLcdHourlyColumn from './displayLcdHourlyColumn';
import displayLcdHourlyCharts from './displayLcdHourlyCharts';
import type { iLcdHourlyState } from '../../interfaces';
import i18n from '../../i18n/main';
import type { iDat } from '../../redux/dataTypes';
import type { iConf } from '../../redux/configTypes';

export function displayLcdHistoryOutScreen(
    ctx: CanvasRenderingContext2D, dispModel: number, state: iLcdHourlyState | undefined, 
    shift: number, localPres: number, data: iDat, config: iConf
): iLcdHourlyState {
    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, '#000');
        lcdCloseButton(ctx, dispModel);
        displayLcdHistoryTitle(ctx, i18n.t('outdoorHistory'), dispModel);
    }

    const history = data.thing.history;
    const weatherStr = JSON.stringify(history);
    if((state?.weather !== JSON.stringify(history) || state?.shift !== shift) && history) {
        const dates = history[7];
        const temps = history[0];
        const hums = history[1];
        const press = history[2];

        displayLcdHourlyCharts(ctx, dispModel, temps, press, [], hums, shift, 'historyOut');
        for(let i=0; i<8; i++) {
            displayLcdHourlyColumn(ctx, dispModel, temps, hums, press, [], dates, [], [], [], i, shift, 'historyOut', localPres, config);
        }
        lcdForwardButton(ctx, dispModel, shift < 16);
        lcdBackButton(ctx, dispModel, shift > 0);
    }

    const prevState: iLcdHourlyState = {
        skeleton: true,
        weather: weatherStr,
        shift: shift
    };

    return prevState;
}