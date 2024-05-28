import { drawImage } from "./primitives";
import * as icons from '../img/icons/big';

export default function lcdShowWeatherIcon(ctx: CanvasRenderingContext2D, icon: number, isDay: number, prevIcon: number): number {
    if(prevIcon !== (icon * 100 + isDay)) {
        switch(icon) {
            case 1: drawImage(ctx, isDay ? icons.big_01_d() : icons.big_01_n(), 0, 104); break;
            case 2: drawImage(ctx, isDay ? icons.big_02_d() : icons.big_02_n(), 0, 104); break;
            case 3: drawImage(ctx, isDay ? icons.big_02_d() : icons.big_02_n(), 0, 104); break;
            case 4: drawImage(ctx, icons.big_04(), 0, 104); break;
            case 9: drawImage(ctx, icons.big_09(), 0, 104); break;
            case 10: drawImage(ctx, icons.big_10(), 0, 104); break;
            case 11: drawImage(ctx, isDay ? icons.big_11_d() : icons.big_11_n(), 0, 104); break;
            case 13: drawImage(ctx, icons.big_13(), 0, 104); break;
            case 50: drawImage(ctx, icons.big_50(), 0, 104); break;
            default: drawImage(ctx, icons.big_loading(), 0, 104); break;
        }
    }
    return icon * 100 + isDay;
}