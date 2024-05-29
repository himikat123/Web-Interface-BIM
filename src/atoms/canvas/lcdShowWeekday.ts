import store from '../../redux/store';
import { printText } from "./primitives";

export default function lcdShowWeekday(ctx: CanvasRenderingContext2D,
    prevWeekDay: string, color: string, bgColor: string
): string {
    const weekDay = store.getState().data.wd[0];

    if(weekDay !== prevWeekDay) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        if(weekDay.length === 2) 
            printText(ctx, 146, dispModel ? 6 : 2, 40, 20, weekDay, dispModel ? 21 : 34, 'left', color, bgColor);
    }

    return weekDay;
}