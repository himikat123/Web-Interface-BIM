import store from '../../redux/store';
import { printText } from "./primitives";

export default function lcdShowWeekday(ctx: CanvasRenderingContext2D, 
    prevWeekDay: string, font: number, color: string, bgColor: string
): string {
    const weekDay = store.getState().data.wd[0];
    if(weekDay !== prevWeekDay) {
        if(weekDay.length === 2) printText(ctx, 146, 6, 40, 20, weekDay, font, 'left', color, bgColor);
    }

    return weekDay;
}