import { fillRect, drawLine, drawRoundRect, drawImage } from "./primitives";
import Symb_home from '../img/symb/home';
import Symb_hum from '../img/symb/hum';
import Symb_pres from '../img/symb/pres';
import Symb_temp_plus from '../img/symb/temp+';
import Symb_wind from '../img/symb/wind';


export default function lcdDrawSkeleton(ctx: CanvasRenderingContext2D | null, frameColor: string, bgColor: string) {
    if(ctx) {
        fillRect(ctx, 0, 0, ctx?.canvas.width, ctx?.canvas.height, bgColor);
        drawLine(ctx, 0, 80, 319, 0, frameColor);
        drawLine(ctx, 143, 2, 0, 75, frameColor);
        drawRoundRect(ctx, 0, 165, 106, 75, 10, frameColor);
        drawRoundRect(ctx, 106, 165, 106, 75, 10, frameColor);
        drawRoundRect(ctx, 212, 165, 107, 75, 10, frameColor);
        drawImage(ctx, Symb_home(), 145, 48);
        drawImage(ctx, Symb_hum(), 243, 48);
        drawImage(ctx, Symb_temp_plus(), 62, 104);
        drawImage(ctx, Symb_hum(), 143, 109);
        drawImage(ctx, Symb_pres(), 222, 109);
        drawImage(ctx, Symb_wind(), 61, 146);
    }
}