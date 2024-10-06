import store from '../../redux/store';
import { printText, printScrollText } from "./primitives";
import lcdGetComfort from "../lcdGetData/lcdGetComfort";

export default function lcdShowComfort(ctx: CanvasRenderingContext2D, prevComfort: string | undefined, 
    shift: number | undefined, sequence: string | undefined, color: string, bgColor: string
): [string, number] {
    const comfort = lcdGetComfort(sequence ?? '');
    const model = store.getState().config.display.model[0];
    const dispModel = (model === 0 || model === 1) ? 0 : 1;
    const font = dispModel ? 14 : 18;
    ctx.font = `${font}px Ubuntu`;
    const l = Math.round(ctx.measureText(comfort).width ?? 0);
    const x = dispModel ? 145 : 196;
    const y = dispModel ? 29 : 27;
    const w = dispModel ? 175 : 130;

    if(l > w && dispModel === 0) {
        shift = printScrollText(ctx, x, y, w, 18, l, shift ?? 0, comfort, font, color, bgColor);
    }
    else if(comfort !== prevComfort) {
        printText(ctx, x, y, w, 18, comfort, font, 'center', color, bgColor);
    }

    return [
        comfort,
        shift ?? 0
    ];
}