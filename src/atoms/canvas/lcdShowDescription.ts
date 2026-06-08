import { printText, printScrollText } from "./primitives";
import * as D from '../constants/displayTypes';
import { iDat } from '../../redux/dataTypes';

export default function lcdShowDescription(
    ctx: CanvasRenderingContext2D, dispModel: number, 
    prevDescript: string | undefined, shift: number | undefined, 
    color: string, bgColor: string, data: iDat
): [string, number] {
    const NEXTION = (dispModel === D.NX4832K035 || dispModel === D.NX4832T035 || dispModel === D.NX4827K043);
    const description = data.weather.descript;

    let x = 97, y = 110, w = 383, h = 32, f = 32; // NX4832K(T)035
    switch(dispModel) {
        case D.NX4827K043: x = 97; y = 93; w = 383; h = 25; f = 24; break;
        case D.ILI9341: x = 0; y = 84; w = 319; h = 20; f = 21; break;
    }

    ctx.font = `${f}px Ubuntu`;
    const l = ctx.measureText(description).width ?? 0;

    if(l > w && NEXTION) {
        shift = printScrollText(ctx, x, y, w, h, l, shift ?? 0, description, f, color, bgColor);
    }
    else if(description !== prevDescript) {
        if(dispModel === D.ILI9341 && l > 319) f = 14;
        printText(ctx, x, y, w, h, description, f, 'center', color, bgColor, true);
    }

    return [
        description,
        shift ?? 0
    ];
}