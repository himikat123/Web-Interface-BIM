import { fillRect, drawLine, drawRoundRect, drawImage } from "./primitives";
import * as symb from '../img/symbols';

export default function lcdDrawSkeleton(ctx: CanvasRenderingContext2D | null, frameColor: string, bgColor: string) {
    if(ctx) {
        fillRect(ctx, 0, 0, ctx?.canvas.width, ctx?.canvas.height, bgColor);
        drawLine(ctx, 0, 80, 319, 0, frameColor);
        drawLine(ctx, 143, 2, 0, 75, frameColor);
        drawRoundRect(ctx, 0, 165, 106, 75, 10, frameColor);
        drawRoundRect(ctx, 106, 165, 106, 75, 10, frameColor);
        drawRoundRect(ctx, 212, 165, 107, 75, 10, frameColor);
        drawImage(ctx, symb.home(), 145, 48);
        drawImage(ctx, symb.hum(), 243, 50);
        drawImage(ctx, symb.temp_plus(), 62, 104);
        drawImage(ctx, symb.hum(), 143, 111);
        drawImage(ctx, symb.pres(), 222, 109);
        drawImage(ctx, symb.wind(), 61, 146);
    }
}