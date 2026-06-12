import i18n from '../../i18n/main';
import { printText, drawScaledImage } from "./primitives";
import * as icons from '../img/icons';
import { iPrevForecast } from "../../interfaces";
import * as vl from "../validateValues";
import getWeekday from '../getWeekday';
import * as D from '../constants/displayTypes';
import type { iDat } from '../../redux/dataTypes';

function showTemperature(ctx: CanvasRenderingContext2D, temp: number, x: number, 
    y: number, w: number, h: number, font: number, color: string, bgColor: string
) {
    const t = Math.round(temp);
    const units = '°C';
    printText(ctx, x, y, w, h, vl.validateTemperature(temp) ? `${t}${units}` : `--${units}`, font, 'center', color, bgColor);
}

export default function lcdShowForecast(
    ctx: CanvasRenderingContext2D, dispModel: number, num: number, prevForecast: iPrevForecast | undefined, 
    color: string, colorTempMax: string, colorTempMin: string, bgColor: string, data: iDat
): iPrevForecast {
    const tMax = data.weather.daily.tMax[num];
    const tMin = data.weather.daily.tMin[num];
    const wind = data.weather.daily.wind[num];
    const icon = data.weather.daily.icon[num];
    const time = data.time;
    const wd = getWeekday(time + (86400 * num));
    const units = i18n.t('units.mps');

    let ix = num * 120 + 3, iy = 247, iw = 48, // NX4832K(T)035 
        wx = num * 120 + 12, wy = 225, ww = 45, wh = 25, wf = 24,
        tx = num * 120 + 55, ty1 = 238, ty2 = 270, tw = 63, th = 32, tf = 24, 
        sx = num * 120 + 25, sy = 295, sw = 70, sh = 23, sf = 22;
    switch(dispModel) {
        case D.NX4827K043:
            ix = num * 96 + 4; iy = 208; iw = 40; 
            wx = num * 96 + 25; wy = 185; ww = 45; wh = 24; wf = 24;
            tx = num * 96 + 46; ty1 = 212; ty2 = 230; tw = 48; th = 20; tf = 16; 
            sx = num * 96 + 24; sy = 252; sw = 50; sh = 16; sf = 16;
            break;
        case D.ILI9341: 
            ix = num * 106 + 7; iy = 183; iw = 40; 
            wx = num * 106 + 33; wy = 168; ww = 40; wh = 16; wf = 14;
            tx = num * 106 + 49; ty1 = 183; ty2 = 203; tw = 56; th = 20; tf = 21; 
            sx = num * 106 + 31; sy = 224; sw = 44; sh = 14; sf = 14;
            break;
    }

    /* Show icon */
    if(icon !== prevForecast?.icon[num]) {
        let wIcon = icons.w_01_d();
        switch(icon) {
            case 1: wIcon = icons.w_01_d(); break;
            case 2: wIcon = icons.w_02_d(); break;
            case 4: wIcon = icons.w_04(); break;
            case 9: wIcon = icons.w_09(); break;
            case 10: wIcon = icons.w_10(); break;
            case 11: wIcon = icons.w_11_d(); break;
            case 13: wIcon = icons.w_13(); break;
            case 50: wIcon = icons.w_50(); break;
            default: wIcon = icons.w_loading(); break;
        }
        drawScaledImage(ctx, wIcon, ix, iy, iw, iw);
    }
    
    /* Show weekday */
    if(wd !== prevForecast?.wd[num]) {
        if(wd.length === 2) 
            printText(ctx, wx, wy, ww, wh, wd, wf, 'center', color, bgColor);
    }
    
    /* Show max temperature */
    if(tMax !== prevForecast?.tMax[num]) {
        showTemperature(ctx, Math.round(tMax), tx, ty1, tw, th, tf, colorTempMax, bgColor);
    }

    /* Show min temperature */
    if(tMin !== prevForecast?.tMin[num]) {
        showTemperature(ctx, Math.round(tMin), tx, ty2, tw, th, tf, colorTempMin, bgColor);
    }

    /* Show wind speed */
    if(wind !== prevForecast?.wSpeed[num]) {
        let w = vl.validateWindSpeed(wind) ? String(Math.round(wind)) : '--';
        w += units;
        printText(ctx, sx, sy, sw, sh, w, sf, 'center', color, bgColor);
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