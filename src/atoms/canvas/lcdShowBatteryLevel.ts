import { drawImage, fillRect } from "./primitives";
import Bat_1 from '../img/bat/bat_1';
import Bat_2 from '../img/bat/bat_2';
import Bat_3 from '../img/bat/bat_3';
import Bat_4 from '../img/bat/bat_4';

export default function lcdShowBatteryLevel(ctx: CanvasRenderingContext2D, level: number, bgColor: string) {
    switch(level) {
        case 1: drawImage(ctx, Bat_1(), 258, 2); break;
        case 2: drawImage(ctx, Bat_2(), 258, 2); break;
        case 3: drawImage(ctx, Bat_3(), 258, 2); break;
        case 4: drawImage(ctx, Bat_4(), 258, 2); break;
        default: fillRect(ctx, 258, 2, 32, 21, bgColor);
    }
}