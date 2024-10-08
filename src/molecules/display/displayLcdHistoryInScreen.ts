import { fillRect } from '../../atoms/canvas/primitives';
import { displayLcdHistoryTitle } from './displayLcdHistoryTitle';
import lcdCloseButton from '../../atoms/canvas/lcdCloseButton';
import lcdForwardButton from '../../atoms/canvas/lcdForwardButton';
import lcdBackButton from '../../atoms/canvas/lcdBackButton';
import displayLcdHourlyColumn from './displayLcdHourlyColumn';
import displayLcdHourlyCharts from './displayLcdHourlyCharts';
import { iHourlyWeather, iLcdHourlyState } from '../../interfaces';
import i18n from '../../i18n/main';
import store from '../../redux/store';
import moment from 'moment';

export function displayLcdHistoryInScreen(ctx: CanvasRenderingContext2D, 
    dispModel: number, state: iLcdHourlyState | undefined, shift: number
): iLcdHourlyState {
    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, '#000');
        lcdCloseButton(ctx, dispModel);
        displayLcdHistoryTitle(ctx, i18n.t('indoorHistory'), dispModel);
    }

    const weather = store.getState().history;
    const weatherStr = JSON.stringify(weather);
    if(state?.weather !== weatherStr || state?.shift !== shift) {
        const dates = weather.feeds.map(feed => moment(feed.created_at).unix());
        const temps = weather.feeds.map(feed => parseFloat(feed.field4));
        const hums = weather.feeds.map(feed => parseFloat(feed.field5)); 
        const data: iHourlyWeather = {
            date: dates, temp: temps, hum: hums, 
            icon: [], pres: [], windSpeed: [], windDir: [], prec: []
        }
        displayLcdHourlyCharts(ctx, dispModel, data, shift, 'historyIn');
        for(let i=0; i<8; i++) {
            displayLcdHourlyColumn(ctx, dispModel, data, i, shift, 'historyIn');
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