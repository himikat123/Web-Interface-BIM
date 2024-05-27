import { printText } from "./primitives";

export default function lcdShowPressure(ctx: CanvasRenderingContext2D, pres: number, units: string, font: number, color: string, bgColor: string) {
    let p = (pres >= 800 && pres <= 1200) ? String(Math.round(pres * 0.75)) : '--';
    p += units;
    printText(ctx, 250, 119, 70, 20, p, font, 'center', color, bgColor);
}