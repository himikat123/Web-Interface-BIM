import store from '../../redux/store';
import { printText } from "./primitives";
import { validateWindSpeed } from "../validateValues";

export default function lcdShowWindSpeed(ctx: CanvasRenderingContext2D, 
    prevSpeed: number, units: string, font: number, color: string, bgColor:string
): number {
    const speed = store.getState().data.weather.wind.speed;
    if(speed !== prevSpeed) {
        let w = validateWindSpeed(speed) ? String(Math.round(speed)) : '--';
        w += units;
        printText(ctx, 95, 146, 40, 16, w, font, 'left', color, bgColor);
    }

    return speed;
}