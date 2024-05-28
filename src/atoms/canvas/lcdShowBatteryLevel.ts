import { drawImage, fillRect } from "./primitives";
import { bat_1, bat_2, bat_3, bat_4 } from '../img/bat';
import lcdGetBatteryLevel from "../lcdGetBatLevel";

export default function lcdShowBatteryLevel(ctx: CanvasRenderingContext2D, prevLevel: number, bgColor: string): number {
    const level = lcdGetBatteryLevel();
    if(level !== prevLevel) {
        switch(level) {
            case 1: drawImage(ctx, bat_1(), 258, 2); break;
            case 2: drawImage(ctx, bat_2(), 258, 2); break;
            case 3: drawImage(ctx, bat_3(), 258, 2); break;
            case 4: drawImage(ctx, bat_4(), 258, 2); break;
            default: fillRect(ctx, 258, 2, 32, 21, bgColor);
        }
    }
    return level;
}