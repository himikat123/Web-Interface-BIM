import store from '../../redux/store';
import { fillRect, drawLine, drawRoundRect, drawImage, drawScaledImage } from "./primitives";
import * as symb from '../img/symbols';

export default function lcdDrawSkeleton(ctx: CanvasRenderingContext2D | null, frameColor: string, bgColor: string) {
    if(ctx) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;

        fillRect(ctx, 0, 0, ctx?.canvas.width, ctx?.canvas.height, bgColor);
        drawLine(ctx, 0, 80, dispModel ? 319 : 361, 0, frameColor);
        drawLine(ctx, 143, 2, 0, 75, frameColor);
        drawRoundRect(ctx, 0, 165, dispModel ? 106 : 90, 75, 10, frameColor);
        drawRoundRect(ctx, dispModel ? 106 : 90, 165, dispModel ? 106 : 90, 75, 10, frameColor);
        drawRoundRect(ctx, dispModel ? 212 : 180, 165, dispModel ? 107 : 90, 75, 10, frameColor);
        if(dispModel === 0) drawRoundRect(ctx, 270, 165, 91, 75, 10, frameColor)
        if(dispModel) drawImage(ctx, symb.home(), 145, 48);
        else drawScaledImage(ctx, symb.home(), 146, 44, 34, 33);
        if(dispModel) drawImage(ctx, symb.hum(), 243, 50);
        else drawScaledImage(ctx, symb.hum(), 275, 46, 24, 32);
        if(dispModel) drawImage(ctx, symb.temp_plus(), 62, 104);
        else drawScaledImage(ctx, symb.temp_minus(), 72, 101, 10, 38);
        if(dispModel) drawImage(ctx, symb.hum(), 143, 111);
        else drawScaledImage(ctx, symb.hum(), 166, 107, 24, 32);
        if(dispModel) drawImage(ctx, symb.pres(), 222, 109);
        else drawScaledImage(ctx, symb.pres(), 248, 109, 32, 32);
        if(dispModel) drawImage(ctx, symb.wind(), 61, 146);
        else drawScaledImage(ctx, symb.wind(), 74, 146, 42, 17);
    }
}