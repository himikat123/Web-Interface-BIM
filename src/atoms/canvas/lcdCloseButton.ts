import { drawScaledImage } from "./primitives";
import { close } from "../img/symbols";

export default function lcdCloseButton(ctx: CanvasRenderingContext2D, dispModel: number) {
    const x = dispModel ? 292 : 326;
    const size = dispModel ? 30 : 36;
    drawScaledImage(ctx, close(), x, 0, size, size);
}