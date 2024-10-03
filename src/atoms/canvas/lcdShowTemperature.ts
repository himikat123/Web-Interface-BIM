import store from '../../redux/store';
import { printText, drawScaledImage, fillRect } from "./primitives";
import { temp_minus, temp_plus } from "../img/symbols";
import { validateTemperature } from "../validateValues";
import lcdGetTempIn from "../lcdGetData/lcdGetTempIn";
import { lcdGetTempOut } from "../lcdGetData/lcdGetTemp";

function showTemperature(ctx: CanvasRenderingContext2D, temp: number, 
    x: number, y: number, color: string, bgColor: string
) {
    const model = store.getState().config.display.model[0];
    const dispModel = (model === 0 || model === 1) ? 0 : 1;
    const w = dispModel ? 70 : 88;
    const h = dispModel ? 27 : 29;
    const font = dispModel ? 29 : 32;
    fillRect(ctx, x, y - 1, w, h, bgColor);
    printText(ctx, x, y, w, 26, validateTemperature(temp) ? `${temp}°C` : '--°C', font, 'center', color, bgColor);
}

export function lcdShowTemperatureInside(ctx: CanvasRenderingContext2D, 
    prevTemp: number | undefined, sequence: number | undefined, color: string, bgColor: string
): number {
    const temp = lcdGetTempIn(sequence ?? 0);

    if(temp !== prevTemp) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const x = dispModel ? 173 : 186;
        const y = dispModel ? 53 : 51;
        showTemperature(ctx, temp, x, y, color, bgColor);
    }
    return temp;
}

export function lcdShowTemperatureOutside(ctx: CanvasRenderingContext2D, 
    prevTemp: number | undefined, color: string, bgColor: string
): number {
    const temp = lcdGetTempOut();

    if(temp !== prevTemp) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const xi = dispModel ? 62 : 72;
        const yi = dispModel ? 104 : 101;
        const xt = dispModel ? 71 : 78;
        const yt = dispModel ? 113 : 110;
        const w = dispModel ? 9 : 10;
        const h = dispModel ? 33 : 38;
        let icon = temp_plus();
        if(temp < 0) icon = temp_minus();
        drawScaledImage(ctx, icon, xi, yi, w, h);
        showTemperature(ctx, temp, xt, yt, color, bgColor);
    }
    return temp;
}