import store from '../../redux/store';
import { printText } from "./primitives";
import getWeekday from '../getWeekday';

export default function lcdShowWeekday(
    ctx: CanvasRenderingContext2D, dispModel: number,
    prevWeekDay: string | undefined, color: string, bgColor: string
): string {
    const weekDay = getWeekday(store.getState().data.time);

    if(weekDay !== prevWeekDay) {
        if(weekDay.length === 2) 
            printText(ctx, 146, dispModel ? 6 : 2, 40, 20, weekDay, dispModel ? 21 : 34, 'left', color, bgColor);
    }

    return weekDay;
}