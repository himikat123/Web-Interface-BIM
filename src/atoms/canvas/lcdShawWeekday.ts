import moment from "moment";
import { printText } from "./primitives";

export default function lcdShowWeekday(ctx: CanvasRenderingContext2D, wd: string, font: number, color: string, bgColor: string) {
    printText(ctx, 146, 6, 40, 20, wd, font, 'left', color, bgColor);
}