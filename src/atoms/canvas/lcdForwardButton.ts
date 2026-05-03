import { drawScaledImage, fillRect } from "./primitives";
import { rightArrow } from "../img/symbols";
import * as D from "../constants/displayTypes";

export default function lcdForwardButton(ctx: CanvasRenderingContext2D, dispModel: number, show: boolean) {
    let x = 445, y = 144, size = 32; // NX4832K(T)035
    switch(dispModel) {
        case D.NX4827K043: x = 445; y = 120; size = 32; break;
        case D.ILI9341: x = 295; y = 106; size = 24; break;
    }

    if(show) drawScaledImage(ctx, rightArrow(), x, y, size, size);
    else fillRect(ctx, x, y, size, size, '#000');
}