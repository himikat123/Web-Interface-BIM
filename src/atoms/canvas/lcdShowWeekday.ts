import { printText } from "./primitives";
import getWeekday from '../getWeekday';
import * as D from '../constants/displayTypes';
import type { iDat } from '../../redux/dataTypes';

export default function lcdShowWeekday(
    ctx: CanvasRenderingContext2D, dispModel: number, prevWeekDay: string | undefined, 
    color: string, bgColor: string, data: iDat
): string {
    const weekDay = getWeekday(data.time);

    if(weekDay !== prevWeekDay) {
        if(weekDay.length === 2) {
            let x = 208, y = 0, w = 64, h = 48, f = 44; // NX4832K(T)035
            switch(dispModel) {
                case D.NX4827K043: x = 208; y = 4; w = 64; h = 36; f = 34; break;
                case D.ILI9341: x = 146; y = 6; w = 40; h = 20; f = 21; break;
            } 
            printText(ctx, x, y, w, h, weekDay, f, 'left', color, bgColor);
        }
    }

    return weekDay;
}