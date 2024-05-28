import { printText } from "./primitives";
import { validatePressure } from "../validateValues";

export default function lcdShowPressure(ctx: CanvasRenderingContext2D, 
    pres: number, prevPres: number, units: string, font: number, color: string, bgColor: string
): number {
    if(pres !== prevPres) {
        let p = validatePressure(pres) ? String(Math.round(pres * 0.75)) : '--';
        p += units;
        printText(ctx, 250, 119, 70, 20, p, font, 'center', color, bgColor);
    }

    return pres;
}