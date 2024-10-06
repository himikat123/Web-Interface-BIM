import i18n from '../../i18n/main';
import store from '../../redux/store';
import { printText, drawScaledImage } from "./primitives";
import * as icons from '../img/icons';
import { iPrevForecast } from "../../interfaces";
import * as vl from "../validateValues";
import getWeekday from '../getWeekday';

function showTemperature(ctx: CanvasRenderingContext2D, temp: number, 
    x: number, y: number, w: number, font: number, color: string, bgColor: string
) {
    printText(ctx, x, y, w, 20, vl.validateTemperature(temp) ? `${temp}°C` : '--°C', font, 'center', color, bgColor);
}

export default function lcdShowForecast(ctx: CanvasRenderingContext2D, num: number, 
    prevForecast: iPrevForecast | undefined, color: string, colorTempMax: string, colorTempMin: string, bgColor: string
): iPrevForecast {
    const tMax = store.getState().data.weather.daily.tMax[num];
    const tMin = store.getState().data.weather.daily.tMin[num];
    const wind = store.getState().data.weather.daily.wind[num];
    const icon = store.getState().data.weather.daily.icon[num];
    const time = store.getState().data.time;
    const wd = getWeekday(time + (86400 * num));
    const units = i18n.t('units.mps');
    const model = store.getState().config.display.model[0];
    const dispModel = (model === 0 || model === 1) ? 0 : 1;
    const x = num * (dispModel === 0 ? 90 : 106);
    const imgShift = dispModel === 0 ? 1 : 7;

    /* Show icon */
    if(icon !== prevForecast?.icon[num]) {
        let wIcon = icons.w_01_d();
        switch(icon) { // png 40x40px
            case 1: wIcon = icons.w_01_d(); break;
            case 2: wIcon = icons.w_02_d(); break;
            case 3: wIcon = icons.w_04(); break;
            case 4: wIcon = icons.w_09(); break;
            case 5: wIcon = icons.w_10(); break;
            case 6: wIcon = icons.w_11_d(); break;
            case 7: wIcon = icons.w_13(); break;
            case 8: wIcon = icons.w_50(); break;
            default: wIcon = icons.w_loading(); break;
        }
        drawScaledImage(ctx, wIcon, x + imgShift, 183, 40, 40);
    }
    
    /* Show weekday */
    if(wd !== prevForecast?.wd[num]) {
        if(wd.length === 2) 
            printText(ctx, x + (dispModel ? 33 : 3), 168, 40, 16, wd, dispModel ? 14 : 18, 'center', color, bgColor);
    }
    
    /* Show max temperature */
    if(tMax !== prevForecast?.tMax[num]) {
        showTemperature(ctx, Math.round(tMax), x + (dispModel ? 44 : 41), 183, dispModel ? 61 : 47, dispModel ? 21 : 17, colorTempMax, bgColor);
    }

    /* Show min temperature */
    if(tMin !== prevForecast?.tMin[num]) {
        showTemperature(ctx, Math.round(tMin), x + (dispModel ? 44 : 41), 203, dispModel ? 61 : 47, dispModel ? 21 : 17, colorTempMin, bgColor);
    }

    /* Show wind speed */
    if(wind !== prevForecast?.wSpeed[num]) {
        let w = vl.validateWindSpeed(wind) ? String(Math.round(wind)) : '--';
        w += units;
        printText(ctx, x + (dispModel ? 31 : 22), 224, 44, 15, w, 14, 'center', color, bgColor);
    }

    const dummyForecast = {
        icon: [],
        tMax: [],
        tMin: [],
        wSpeed: [],
        wd: []
    }
    if(prevForecast) {
        prevForecast.icon[num] = icon;
        prevForecast.tMax[num] = tMax;
        prevForecast.tMin[num] = tMin;
        prevForecast.wSpeed[num] = wind;
        prevForecast.wd[num] = wd;
    }

    return prevForecast ?? dummyForecast;
}