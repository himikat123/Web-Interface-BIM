import { drawScaledImage, fillRect } from "./primitives";
import { leftArrow } from "../img/symbols";
import * as D from "../../molecules/display/displayTypes";

export default function lcdBackButton(ctx: CanvasRenderingContext2D, dispModel: number, show: boolean) {
    let x = 3, y = 144, size = 32; // NX4832K(T)035
    switch(dispModel) {
        case D.NX4827K043: x = 5; y = 120; size = 32; break;
        case D.ILI9341: x = 0; y = 106; size = 24; break;
    }

    if(show) drawScaledImage(ctx, leftArrow(), x, y, size, size);
    else fillRect(ctx, x, y, size, size, '#000');
}
