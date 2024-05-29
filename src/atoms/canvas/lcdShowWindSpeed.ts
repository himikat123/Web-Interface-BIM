import store from '../../redux/store';
import { printText } from "./primitives";
import { validateWindSpeed } from "../validateValues";

export default function lcdShowWindSpeed(ctx: CanvasRenderingContext2D, 
    prevSpeed: number, color: string, bgColor: string
): number {
    const speed = store.getState().data.weather.wind.speed;

    if(speed !== prevSpeed) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const units = store.getState().data.units.ms;
        const x = dispModel ? 95 : 125;
        let spd = validateWindSpeed(speed) ? String(Math.round(speed)) : '--';
        spd += units;
        printText(ctx, x, 146, 40, 16, spd, 14, 'left', color, bgColor);
    }

    return speed;
}