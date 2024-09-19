import store from '../../redux/store';
import { printText, printScrollText } from "./primitives";

export default function lcdShowDescription(ctx: CanvasRenderingContext2D, prevDescript: string, shift: number, color: string, bgColor: string): [string, number] {
    const description = store.getState().data.weather.descript;
    const model = store.getState().config.display.model[0];
    const dispModel = (model === 0 || model === 1) ? 0 : 1;
    ctx.font = '21px Ubuntu';
    const l = ctx.measureText(description).width ?? 0;
    const x = dispModel ? 0 : 82;
    const w = dispModel ? 319 : 279;
    const font = l > 316 ? 14 : 21;

    if(l > w) {
        shift = printScrollText(ctx, x, 84, w, 20, l, shift, description, font, color, bgColor);
    }
    else if(description !== prevDescript) {
        printText(ctx, x, 84, w, 20, description, font, 'center', color, bgColor);
    }

    return [
        description,
        shift
    ];
}