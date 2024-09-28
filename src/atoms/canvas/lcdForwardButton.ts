import { drawScaledImage } from "./primitives";
import { rightArrow } from "../img/symbols";

export default function lcdForwardButton(ctx: CanvasRenderingContext2D, dispModel: number) {
    const x = dispModel ? 296 : 334;
    const size = dispModel ? 24 : 28;
    drawScaledImage(ctx, rightArrow(), x, 106, size, size);
}