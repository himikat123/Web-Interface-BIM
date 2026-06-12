import { drawScaledImage } from "./primitives";
import * as icons from '../img/icons';
import * as D from '../constants/displayTypes';
import type { iDat } from '../../redux/dataTypes';

export default function lcdShowWeatherIcon(
    ctx: CanvasRenderingContext2D, dispModel: number, 
    prevIcon: number | undefined, data: iDat
): number {
    const icon = data.weather.icon;
    const isDay = data.weather.isDay;

    if(prevIcon !== (icon * 100 + isDay)) {
        let wIcon;
        let y = 116, w = 96; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: y = 94; w = 80; break;
            case D.ILI9341: y = 104; w = 60; break;
        }

        switch(icon) {
            case 1: wIcon = isDay ? icons.w_01_d() : icons.w_01_n(); break;
            case 2: wIcon = isDay ? icons.w_02_d() : icons.w_02_n(); break;
            case 4: wIcon = icons.w_04(); break;
            case 9: wIcon = icons.w_09(); break;
            case 10: wIcon = icons.w_10(); break;
            case 11: wIcon = isDay ? icons.w_11_d() : icons.w_11_n(); break;
            case 13: wIcon = icons.w_13(); break;
            case 50: wIcon = icons.w_50(); break;
            default: wIcon = icons.w_loading(); break;
        }
        drawScaledImage(ctx, wIcon, 0, y, w, w);
    }
    return icon * 100 + isDay;
}