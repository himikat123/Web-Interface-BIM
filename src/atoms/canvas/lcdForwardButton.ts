import { drawScaledImage, fillRect } from "./primitives";
import { rightArrow } from "../img/symbols";

export default function lcdForwardButton(ctx: CanvasRenderingContext2D, dispModel: number, show: boolean) {
    const x = dispModel ? 296 : 334;
    const size = dispModel ? 24 : 28;
    if(show) drawScaledImage(ctx, rightArrow(), x, 106, size, size);
    else fillRect(ctx, x, 106, size, size, '#000');
}