import { printText, drawScaledImage, fillRect } from "./primitives";
import { temp_minus, temp_plus } from "../img/symbols";
import { validateTemperature } from "../validateValues";
import lcdGetTempIn from "../lcdGetData/lcdGetTempIn";
import { lcdGetTempOut } from "../lcdGetData/lcdGetTemp";
import * as D from "../constants/displayTypes";
import { iConf } from '../../redux/configTypes';
import { iDat } from "../../redux/dataTypes";

function showTemperature(
    ctx: CanvasRenderingContext2D, temp: number, x: number, y: number, 
    w: number, h: number, f: number, color: string, bgColor: string
) {
    const t = Math.round(temp);
    const units = '°C';
    fillRect(ctx, x, y - 1, w, h, bgColor);
    printText(ctx, x, y, w, 26, validateTemperature(temp) ? `${t}${units}` : `--${units}`, f, 'center', color, bgColor);
}

export function lcdShowTemperatureInside(
    ctx: CanvasRenderingContext2D, dispModel: number, prevTemp: number | undefined, 
    sequence: number | undefined, color: string, bgColor: string, config: iConf, data: iDat
): number {
    const temp = lcdGetTempIn(sequence ?? 0, config, data);

    if(temp !== prevTemp) {
        let x = 258, y = 68, w = 101, h = 38, f = 44; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: x = 252; y = 54; w = 101; h = 36; f = 40; break;
            case D.ILI9341: x = 173; y = 53; w = 70; h = 26; f = 29; break;
        }
        showTemperature(ctx, temp, x, y, w, h, f, color, bgColor);
    }
    return temp;
}

export function lcdShowTemperatureOutside(
    ctx: CanvasRenderingContext2D, dispModel: number, prevTemp: number | undefined, 
    color: string, bgColor: string, config: iConf, data: iDat
): number {
    const temp = lcdGetTempOut(config, data);

    if(temp !== prevTemp) {
        let x = 112, y = 154, w = 107, h = 44, f = 44, xi = 99, yi = 140, wi = 13, hi = 48; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: x = 106; y = 122; w = 106; h = 36; f = 40; xi = 84; yi = 112; wi = 13; hi = 40; break;
            case D.ILI9341: x = 71; y = 113; w = 70; h = 26; f = 29; xi = 61; yi = 104; wi = 9; hi = 33; break;
        }

        let icon = (temp < 0 ? temp_minus() : temp_plus());
        drawScaledImage(ctx, icon, xi, yi, wi, hi);
        showTemperature(ctx, temp, x, y, w, h, f, color, bgColor);
    }
    return temp;
}