import { printText } from "./primitives";
import { validateHumidity } from "../validateValues";
import lcdGetHumIn from "../lcdGetData/lcdGetHumIn";
import { lcdGetHumOut } from "../lcdGetData/lcdGetHum";
import * as D from "../constants/displayTypes";

function showHumidity(
    ctx: CanvasRenderingContext2D, hum: number, x: number, y: number, 
    w: number, h: number, f: number, color: string, bgColor: string, out: boolean = false
) {
    printText(ctx, x, y, w, h, validateHumidity(hum) ? `${hum}${hum > 99 && out ? '' : '%'}` : '--%', f, 'center', color, bgColor);
}

export function lcdShowHumidityInside(
    ctx: CanvasRenderingContext2D, dispModel: number, prevHum: number | undefined, 
    sequence: number | undefined, color: string, bgColor: string
): number {
    const hum = lcdGetHumIn(sequence ?? 0);
    if(hum !== prevHum) {
        let x = 398, y = 76, w = 77, h = 30, f = 30; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: x = 385; y = 58; w = 80; h = 30; f = 32; break;
            case D.ILI9341: x = 264; y = 58; w = 58; h = 20; f = 21; break;
        }
        showHumidity(ctx, hum, x, y, w, h, f, color, bgColor);
    }
    return hum;
}

export function lcdShowHumidityOutside(
    ctx: CanvasRenderingContext2D, dispModel: number, 
    prevHum: number | undefined, color: string, bgColor: string
): number {
    const hum = lcdGetHumOut();
    if(hum !== prevHum) {
        let x = 260, y = 163, w = 60, h = 30, f = 30; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: x = 250; y = 125; w = 80; h = 32; f = 32; break;
            case D.ILI9341: x = 164; y = 119; w = 58; h = 20; f = 21; break;
        }
        showHumidity(ctx, hum, x, y, w, h, f, color, bgColor, dispModel === D.NX4832K035 || dispModel === D.NX4832T035);
    }
    return hum;
}