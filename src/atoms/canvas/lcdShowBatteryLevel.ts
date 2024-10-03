import store from '../../redux/store';
import { drawImage, drawScaledImage, fillRect } from "./primitives";
import { bat_1, bat_2, bat_3, bat_4 } from '../img/bat';
import lcdGetBatteryLevel from "../lcdGetData/lcdGetBatLevel";

export default function lcdShowBatteryLevel(ctx: CanvasRenderingContext2D, prevLevel: number | undefined, bgColor: string): number {
    const level = lcdGetBatteryLevel();

    if(level !== prevLevel) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const x1 = 258;
        const x2 = 284;
        if(dispModel) {
            switch(level) {
                case 1: drawImage(ctx, bat_1(), x1, 2); break;
                case 2: drawImage(ctx, bat_2(), x1, 2); break;
                case 3: drawImage(ctx, bat_3(), x1, 2); break;
                case 4: drawImage(ctx, bat_4(), x1, 2); break;
                default: fillRect(ctx, x1, 2, 32, 21, bgColor);
            }
        }
        else {
            switch(level) {
                case 1: drawScaledImage(ctx, bat_1(), x2, 0, 37, 24); break;
                case 2: drawScaledImage(ctx, bat_2(), x2, 0, 37, 24); break;
                case 3: drawScaledImage(ctx, bat_3(), x2, 0, 37, 24); break;
                case 4: drawScaledImage(ctx, bat_4(), x2, 0, 37, 24); break;
                default: fillRect(ctx, x2, 2, 32, 21, bgColor);
            }
        }
    }
    return level;
}