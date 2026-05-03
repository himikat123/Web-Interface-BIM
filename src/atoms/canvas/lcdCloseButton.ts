import { drawScaledImage } from "./primitives";
import { close } from "../img/symbols";
import * as D from "../../molecules/display/displayTypes";

export default function lcdCloseButton(ctx: CanvasRenderingContext2D, dispModel: number) {
    let x = 432, y = 1, size = 48; // NX4832K(T)035
    switch(dispModel) {
        case D.NX4827K043: x = 432; y = 1; size = 48; break;
        case D.ILI9341: x = 290; y = 0; size = 32; break;
    }

    drawScaledImage(ctx, close(), x, y, size, size);
}