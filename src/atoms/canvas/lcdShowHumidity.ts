import { printText } from "./primitives";

function showHumidity(ctx: CanvasRenderingContext2D, hum: number, 
    x: number, y: number, font: number, color: string, bgColor: string
) {
    printText(ctx, x, y, 58, 20, (hum >= 0 && hum <= 100) ? `${hum}%` : '--%', font, 'center', color, bgColor);
}

export function lcdShowHumidityInside(ctx: CanvasRenderingContext2D, 
    hum: number, prevHum: number, font: number, color: string, bgColor: string
): number {
    if(hum !== prevHum) {
        showHumidity(ctx, hum, 264, 58, font, color, bgColor);
    }
    return hum;
}

export function lcdShowHumidityOutside(ctx: CanvasRenderingContext2D, 
    hum: number, prevHum: number, font: number, color: string, bgColor: string
): number {
    if(hum != prevHum) {
        showHumidity(ctx, hum, 164, 119, font, color, bgColor);
    }
    return hum;
}