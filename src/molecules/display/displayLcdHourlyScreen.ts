import { fillRect } from '../../atoms/canvas/primitives';
import lcdCloseButton from '../../atoms/canvas/lcdCloseButton';
import lcdForwardButton from '../../atoms/canvas/lcdForwardButton';
import lcdBackButton from '../../atoms/canvas/lcdBackButton';
import displayLcdHourlyColumn from './displayLcdHourlyColumn';
import displayLcdHourlyCharts from './displayLcdHourlyCharts';
import type { iLcdHourlyState } from '../../interfaces';
import type { iDat } from '../../redux/dataTypes';
import type { iConf } from '../../redux/configTypes';

export function displayLcdHourlyScreen(
    ctx: CanvasRenderingContext2D, dispModel: number, state: iLcdHourlyState | undefined, 
    shift: number, localPres: number, data: iDat, config: iConf
): iLcdHourlyState {
    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, '#000');
        lcdCloseButton(ctx, dispModel);
    }

    const weather = data.weather;
    const weatherStr = JSON.stringify(weather);
    if(state?.weather !== weatherStr || state?.shift !== shift) {
        displayLcdHourlyCharts(
            ctx, dispModel, weather.hourly?.temp, weather.hourly?.pres,
            weather.hourly?.prec, weather.hourly?.hum, shift, 'hourly'
        );
        for(let i=0; i<8; i++) {
            displayLcdHourlyColumn(
                ctx, dispModel, weather.hourly?.temp, weather.hourly?.hum, weather.hourly?.pres, 
                weather.hourly?.icon, weather.hourly?.date, weather.hourly?.windSpeed, 
                weather.hourly?.windDir, weather.hourly?.prec, i, shift, 'hourly', localPres, config
            );
        }
        lcdForwardButton(ctx, dispModel, shift < (config.weather.provider === 3 ? 8 : 32));
        lcdBackButton(ctx, dispModel, shift > 0);
    }

    const prevState: iLcdHourlyState = {
        skeleton: true,
        weather: weatherStr,
        shift: shift
    };

    return prevState;
}