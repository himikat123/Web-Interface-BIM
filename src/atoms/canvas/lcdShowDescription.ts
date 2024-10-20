import store from '../../redux/store';
import { printText, printScrollText } from "./primitives";

export default function lcdShowDescription(ctx: CanvasRenderingContext2D, 
    prevDescript: string | undefined, shift: number | undefined, 
    color: string, bgColor: string
): [string, number] {
    const description = store.getState().data.weather.descript;
    const model = store.getState().config.display.model[0];
    const dispModel = (model === 0 || model === 1) ? 0 : 1;
    ctx.font = '21px Ubuntu';
    const l = ctx.measureText(description).width ?? 0;
    const x = dispModel ? 0 : 82;
    const w = dispModel ? 319 : 279;

    if(l > w && dispModel === 0) {
        shift = printScrollText(ctx, x, 84, w, 20, l, shift ?? 0, description, 21, color, bgColor);
    }
    else if(description !== prevDescript) {
        const font = dispModel ? l > w ? 14 : 21 : 21;
        printText(ctx, x, 84, w, 20, description, font, 'center', color, bgColor);
    }

    return [
        description,
        shift ?? 0
    ];
}