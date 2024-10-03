import store from '../../redux/store';
import { fillRect } from '../../atoms/canvas/primitives';
import lcdCloseButton from '../../atoms/canvas/lcdCloseButton';
import lcdForwardButton from '../../atoms/canvas/lcdForwardButton';
import lcdBackButton from '../../atoms/canvas/lcdBackButton';
import displayLcdHourlyColumn from './displayLcdHourlyColumn';
import displayLcdHourlyCharts from './displayLcdHourlyCharts';
import { iLcdHourlyState } from '../../interfaces';

export function displayLcdHourlyScreen(ctx: CanvasRenderingContext2D, 
    dispModel: number, state: iLcdHourlyState | undefined, shift: number
): iLcdHourlyState {
    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, '#000');
        lcdCloseButton(ctx, dispModel);
    }

    const weather = store.getState().hourly;
    const weatherStr = JSON.stringify(weather);
    if(state?.weather !== weatherStr || state?.shift !== shift) {
        displayLcdHourlyCharts(ctx, dispModel, weather, shift, 'hourly');
        for(let i=0; i<8; i++) {
            displayLcdHourlyColumn(ctx, dispModel, weather, i, shift, 'hourly');
        }
        lcdForwardButton(ctx, dispModel, shift < 32);
        lcdBackButton(ctx, dispModel, shift > 0);
    }

    const prevState: iLcdHourlyState = {
        skeleton: true,
        weather: weatherStr,
        shift: shift
    };

    return prevState;
}