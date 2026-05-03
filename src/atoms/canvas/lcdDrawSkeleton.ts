import { fillRect, drawLine, drawRoundRect, drawImage, drawScaledImage } from "./primitives";
import * as symb from '../img/symbols';
import * as D from "../../molecules/display/displayTypes";

export default function lcdDrawSkeleton(
    ctx: CanvasRenderingContext2D | null | undefined, dispModel:number, frameColor: string, bgColor: string
) {
    if(ctx) {
        fillRect(ctx, 0, 0, ctx?.canvas.width, ctx?.canvas.height, bgColor);

        switch(dispModel) {
            case D.NX4827K043: 
                drawLine(ctx, 10, 90, 460, 1, frameColor);
                drawLine(ctx, 206, 9, 1, 72, frameColor);
                for(let i=0; i<5; i++) drawRoundRect(ctx, i * 96, 182, 95, 87, 10, frameColor);
                drawScaledImage(ctx, symb.home(), 211, 46, 40, 40);
                drawScaledImage(ctx, symb.hum(), 353, 47, 32, 40);
                drawScaledImage(ctx, symb.hum(), 218, 116, 32, 40);
                drawScaledImage(ctx, symb.pres(), 334, 116, 40, 40);
                drawScaledImage(ctx, symb.wind(), 86, 156, 64, 20);
                break;
            case D.ILI9341: 
                drawLine(ctx, 0, 80, 319, 1, frameColor);
                drawLine(ctx, 143, 2, 1, 73, frameColor);
                for(let i=0; i<3; i++) drawRoundRect(ctx, i * 106, 165, 106, 74, 10, frameColor);
                drawImage(ctx, symb.home(), 145, 48);
                drawImage(ctx, symb.hum(), 245, 50);
                drawImage(ctx, symb.hum(), 143, 109);
                drawImage(ctx, symb.pres(), 222, 109);
                drawImage(ctx, symb.wind(), 61, 146);
                break;
            default: // NX4832K(T)035
                drawLine(ctx, 10, 106, 460, 1, frameColor);
                drawLine(ctx, 206, 9, 1, 88, frameColor);
                for(let i=0; i<4; i++) drawRoundRect(ctx, i * 120, 222, 119, 97, 10, frameColor);
                drawScaledImage(ctx, symb.home(), 211, 56, 48, 47);
                drawScaledImage(ctx, symb.hum(), 362, 56, 36, 48);
                drawScaledImage(ctx, symb.hum(), 224, 146, 36, 48);
                drawScaledImage(ctx, symb.pres(), 322, 146, 48, 48);
                drawScaledImage(ctx, symb.wind(), 100, 194, 64, 25);
                break; 
        }
    }
}