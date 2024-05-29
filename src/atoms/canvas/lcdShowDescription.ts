import store from '../../redux/store';
import { printText } from "./primitives";

export default function lcdShowDescription(ctx: CanvasRenderingContext2D, 
    prevDescript: string, color: string, bgColor: string
): string {
    const description = store.getState().data.weather.descript;

    if(description !== prevDescript) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        ctx.font = '21px Ubuntu';
        const l = ctx.measureText(description).width ?? 0;
        const x = dispModel ? 0 : 82;
        const w = dispModel ? 319 : 279;
        printText(ctx, x, 84, w, 20, description, l > 316 ? 14 : 21, 'center', color, bgColor);
    }
    return description;
}