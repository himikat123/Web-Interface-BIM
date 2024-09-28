import { drawScaledImage } from "./primitives";
import { leftArrow } from "../img/symbols";

export default function lcdBackButton(ctx: CanvasRenderingContext2D, dispModel: number) {
    const size = dispModel ? 24 : 28;
    drawScaledImage(ctx, leftArrow(), 0, 106, size, size);
}