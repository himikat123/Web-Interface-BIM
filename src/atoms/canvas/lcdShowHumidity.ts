import store from '../../redux/store';
import { printText } from "./primitives";
import { validateHumidity } from "../validateValues";
import lcdGetHumIn from "../lcdGetHumIn";
import { lcdGetHumOut } from "../lcdGetHum";

function showHumidity(ctx: CanvasRenderingContext2D, hum: number, 
    x: number, y: number, color: string, bgColor: string
) {
    printText(ctx, x, y, 58, 20, validateHumidity(hum) ? `${hum}%` : '--%', 21, 'center', color, bgColor);
}

export function lcdShowHumidityInside(ctx: CanvasRenderingContext2D, prevHum: number | undefined, 
    sequence: number | undefined, color: string, bgColor: string
): number {
    const hum = lcdGetHumIn(sequence ?? 0);
    if(hum !== prevHum) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        showHumidity(ctx, hum, dispModel ? 264 : 300, 58, color, bgColor);
    }
    return hum;
}

export function lcdShowHumidityOutside(ctx: CanvasRenderingContext2D, 
    prevHum: number | undefined, color: string, bgColor: string
): number {
    const hum = lcdGetHumOut();
    if(hum !== prevHum) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        showHumidity(ctx, hum, dispModel ? 164 : 190, 118, color, bgColor);
    }
    return hum;
}