import store from '../../redux/store';
import { printText } from "./primitives";
import { validatePressure } from "../validateValues";
import lcdGetPres from "../lcdGetPres";

export default function lcdShowPressure(ctx: CanvasRenderingContext2D, 
    prevPres: number, font: number, color: string, bgColor: string
): number {
    const pres = lcdGetPres();
    const units = store.getState().data.units.mm;
    if(pres !== prevPres) {
        let p = validatePressure(pres) ? String(Math.round(pres * 0.75)) : '--';
        p += units;
        printText(ctx, 250, 119, 70, 20, p, font, 'center', color, bgColor);
    }

    return pres;
}