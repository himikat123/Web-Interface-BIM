import { drawScaledImage, fillRect } from "./primitives";
import { leftArrow } from "../img/symbols";

export default function lcdBackButton(ctx: CanvasRenderingContext2D, dispModel: number, show: boolean) {
    const size = dispModel ? 24 : 28;
    if(show) drawScaledImage(ctx, leftArrow(), 0, 106, size, size);
    else fillRect(ctx, 0, 106, size, size, '#000');
}