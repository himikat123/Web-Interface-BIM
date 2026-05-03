import { printText, printScrollText } from "./primitives";
import lcdGetComfort from "../lcdGetData/lcdGetComfort";
import * as D from "../constants/displayTypes";

export default function lcdShowComfort(
    ctx: CanvasRenderingContext2D, dispModel: number, prevComfort: string | undefined, 
    shift: number | undefined, sequence: string | undefined, color: string, bgColor: string
): [string, number] {
    const NEXTION = (dispModel === D.NX4832K035 || dispModel === D.NX4832T035 || dispModel === D.NX4827K043);
    const comfort = lcdGetComfort(sequence ?? '');

    let x = 280, y = 34, w = 151, h = 24, f = 24; // NX4832K(T)035
    switch(dispModel) {
        case D.NX4827K043: x = 280; y = 25; w = 151; h = 24; f = 24; break;
        case D.ILI9341: x = 145; y = 28; w = 174; h = 16; f = 14; break;
    }
    ctx.font = `${f}px Ubuntu`;
    const l = Math.round(ctx.measureText(comfort).width ?? 0);

    if(l > w && NEXTION) {
        shift = printScrollText(ctx, x, y, w, h, l, shift ?? 0, comfort, f, color, bgColor);
    }
    else if(comfort !== prevComfort) {
        printText(ctx, x, y, w, h, comfort, f, 'center', color, bgColor, true);
    }

    return [
        comfort,
        shift ?? 0
    ];
}