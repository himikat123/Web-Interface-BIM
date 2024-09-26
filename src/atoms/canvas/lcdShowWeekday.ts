import store from '../../redux/store';
import { printText } from "./primitives";
import getWeekday from '../getWeekday';

export default function lcdShowWeekday(ctx: CanvasRenderingContext2D,
    prevWeekDay: string | undefined, color: string, bgColor: string
): string {
    const weekDay = getWeekday(store.getState().data.time);

    if(weekDay !== prevWeekDay) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        if(weekDay.length === 2) 
            printText(ctx, 146, dispModel ? 6 : 2, 40, 20, weekDay, dispModel ? 21 : 34, 'left', color, bgColor);
    }

    return weekDay;
}