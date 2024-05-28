import { printText } from "./primitives";

export default function lcdShowWindSpeed(ctx: CanvasRenderingContext2D, 
    speed: number, prevSpeed: number, units: string, font: number, color: string, bgColor:string
): number {
    if(speed !== prevSpeed) {
        let w = (speed >= 0 && speed < 100) ? String(Math.round(speed)) : '--';
        w += units;
        printText(ctx, 95, 146, 40, 16, w, font, 'left', color, bgColor);
    }

    return speed;
}