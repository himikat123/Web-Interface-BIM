import { drawLine, printText } from "../../atoms/canvas/primitives";
import * as D from "../../atoms/constants/displayTypes";

export function displayLcdHistoryTitle(ctx: CanvasRenderingContext2D, title: string, dispModel: number) {
    let x = 91, y1 = 243, y2 = 273, y3 = 252, w = 295, h = 31, f = 16; // NX4832K(T)035
    switch(dispModel) {
        case D.NX4827K043: x = 91; y1 = 233; y2 = 264; y3 = 242; w = 295; h = 31; f = 16; break;
        case D.ILI9341: x = 38; y1 = 190; y2 = 215; y3 = 196; w = 248; h = 26; f = 14; break;
    }

    drawLine(ctx, x, y1 + 1, w - 1, 0, '#777');
    drawLine(ctx, x + 1, y2, w - 1, 0, '#FFF');
    drawLine(ctx, x, y1, 0, h, '#777');
    drawLine(ctx, x + w, y1, 0, h, '#FFF');
    printText(ctx, x + 1, y3, w - 2, f, title, f, 'center', '#FFF', '#000');
}