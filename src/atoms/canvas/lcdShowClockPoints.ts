import { fillCircle } from "./primitives";
import * as D from "../constants/displayTypes";

export default function lcdShowClockPoints(ctx: CanvasRenderingContext2D, color: string, dispModel: number) {
    let x = 103, y1 = 36, y2 = 70, r = 5; // NX4832K(T)035
    switch(dispModel) {
        case D.NX4827K043: x = 103; y1 = 30; y2 = 60; r = 5; break;
        case D.ILI9341: x = 71; y1 = 24; y2 = 52; r = 3; break;
    }

    fillCircle(ctx, x, y1, r, color);
    fillCircle(ctx, x, y2, r, color);
}