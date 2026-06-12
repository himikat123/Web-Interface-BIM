import { drawScaledImage, fillRect } from "./primitives";
import { bat_1, bat_2, bat_3, bat_4 } from '../img/bat';
import lcdGetBatteryLevel from "../lcdGetData/lcdGetBatLevel";
import * as D from "../constants/displayTypes";
import type { iConf } from "../../redux/configTypes";
import type { iDat } from "../../redux/dataTypes";

export default function lcdShowBatteryLevel(
    ctx: CanvasRenderingContext2D, dispModel: number, prevLevel: number | undefined, 
    bgColor: string, config: iConf, data: iDat
): number {
    const level = lcdGetBatteryLevel(config, data);

    if(level !== prevLevel) {
        let x = 377, y = 1, w = 48, h = 32; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: x = 377; y = 1; w = 48; h = 22; break;
            case D.ILI9341: x = 258; y = 2; w = 32; h = 21; break;
        }

        switch(level) {
            case 1: drawScaledImage(ctx, bat_1(), x, y, w, h); break;
            case 2: drawScaledImage(ctx, bat_2(), x, y, w, h); break;
            case 3: drawScaledImage(ctx, bat_3(), x, y, w, h); break;
            case 4: drawScaledImage(ctx, bat_4(), x, y, w, h); break;
            default: fillRect(ctx, x, y, w, h, bgColor);
        }
    }
    return level;
}