import store from '../../redux/store';
import { printText, drawImage } from "./primitives";
import * as icons from '../img/icons/small';
import { iPrevForecast } from "../../interfaces";
import * as vl from "../validateValues";

function showTemperature(ctx: CanvasRenderingContext2D, temp: number, 
    x: number, y: number, font: number, color: string, bgColor: string
) {
    printText(ctx, x, y, 56, 20, vl.validateTemperature(temp) ? `${temp}°C` : '--°C', font, 'right', color, bgColor);
}

export default function lcdShowForecast(ctx: CanvasRenderingContext2D, num: number, 
    prevForecast: iPrevForecast, units: string, font1: number, font2: number, 
    color: string, colorTempMax: string, colorTempMin: string, bgColor: string
): iPrevForecast {
    const tMax = store.getState().data.weather.daily.tMax[num];
    const tMin = store.getState().data.weather.daily.tMin[num];
    const wind = store.getState().data.weather.daily.wind[num];
    const icon = store.getState().data.weather.daily.icon[num];
    const wd = store.getState().data.wd[num]
    const x = num * 106;

    /* Show icon */
    if(icon !== prevForecast.icon[num]) {
        switch(icon) {
            case 1: drawImage(ctx, icons.small_01(), x + 4, 183); break;
            case 2: drawImage(ctx, icons.small_02(), x + 4, 183); break;
            case 3: drawImage(ctx, icons.small_02(), x + 4, 183); break;
            case 4: drawImage(ctx, icons.small_04(), x + 4, 183); break;
            case 9: drawImage(ctx, icons.small_09(), x + 4, 183); break;
            case 10: drawImage(ctx, icons.small_10(), x + 4, 183); break;
            case 11: drawImage(ctx, icons.small_11(), x + 4, 183); break;
            case 13: drawImage(ctx, icons.small_13(), x + 4, 183); break;
            case 50: drawImage(ctx, icons.small_50(), x + 4, 183); break;
            default: drawImage(ctx, icons.small_loading(), x + 4, 183); break;
        }
    }
    
    /* Show weekday */
    if(wd !== prevForecast.wd[num]) {
        if(wd.length === 2) printText(ctx, x + 33, 168, 40, 16, wd, font1, 'center', color, bgColor);
    }
    
    /* Show max temperature */
    if(tMax !== prevForecast.tMax[num]) {
        showTemperature(ctx, Math.round(tMax), x + 46, 183, font2, colorTempMax, bgColor);
    }

    /* Show min temperature */
    if(tMin !== prevForecast.tMin[num]) {
        showTemperature(ctx, Math.round(tMin), x + 46, 203, font2, colorTempMin, bgColor);
    }

    /* Show wind speed */
    if(wind !== prevForecast.wSpeed[num]) {
        let w = vl.validateWindSpeed(wind) ? String(Math.round(wind)) : '--';
        w += units;
        printText(ctx, x + 31, 224, 44, 15, w, font1, 'center', color, bgColor);
    }

    prevForecast.icon[num] = icon;
    prevForecast.tMax[num] = tMax;
    prevForecast.tMin[num] = tMin;
    prevForecast.wSpeed[num] = wind;
    prevForecast.wd[num] = wd;
    
    return prevForecast;
}