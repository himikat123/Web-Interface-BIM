import store from '../../redux/store';
import moment from "moment";
import { printText } from "./primitives";

export default function lcdShowUpdTime(ctx: CanvasRenderingContext2D, 
    prevTime: number | undefined, color: string, bgColor: string
): number {
    const time = store.getState().data.weather.time;

    if(time !== prevTime) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const upd = time > 0
            ? moment.unix(time).utc().format(dispModel ? '⭮ DD.MM.YYYY HH:mm' : '⭮ DD.MM.YYYY HH:mm :ss')
            : '';
        const x = dispModel ? 150 : 194;

        printText(ctx, x, 148, 146, 16, upd, 14, 'center', color, bgColor);
    }

    return time;
}