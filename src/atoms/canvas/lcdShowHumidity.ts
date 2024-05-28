import { printText } from "./primitives";
import { validateHumidity } from "../validateValues";
import lcdGetHumIn from "../lcdGetHumIn";
import { lcdGetHumOut } from "../lcdGetHum";

function showHumidity(ctx: CanvasRenderingContext2D, hum: number, 
    x: number, y: number, font: number, color: string, bgColor: string
) {
    printText(ctx, x, y, 58, 20, validateHumidity(hum) ? `${hum}%` : '--%', font, 'center', color, bgColor);
}

export function lcdShowHumidityInside(ctx: CanvasRenderingContext2D, 
    prevHum: number, sequence: number, font: number, color: string, bgColor: string
): number {
    const hum = lcdGetHumIn(sequence);
    if(hum !== prevHum) {
        showHumidity(ctx, hum, 264, 58, font, color, bgColor);
    }
    return hum;
}

export function lcdShowHumidityOutside(ctx: CanvasRenderingContext2D, 
    prevHum: number, font: number, color: string, bgColor: string
): number {
    const hum = lcdGetHumOut();
    if(hum !== prevHum) {
        showHumidity(ctx, hum, 164, 119, font, color, bgColor);
    }
    return hum;
}