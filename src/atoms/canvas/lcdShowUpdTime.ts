import store from '../../redux/store';
import moment from "moment";
import device from '../../device';
import { printText, drawScaledImage } from "./primitives";
import * as symbols from "../img/symbols";

export default function lcdShowUpdTime(ctx: CanvasRenderingContext2D, 
    prevTime: number | undefined, color: string, bgColor: string
): number {
    const time = store.getState().data.weather.time;

    if(time !== prevTime) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const upd = time > 0
            ? moment.unix(time).utc().format((dispModel && device() === 'WeatherMonitorBIM32') 
                ? 'DD.MM.YYYY HH:mm' 
                : 'DD.MM.YYYY HH:mm:ss')
            : '';
        const x = dispModel ? (device() === 'WeatherMonitorBIM32' ? 140 : 173) : 188;
        const c = dispModel ? (device() === 'WeatherMonitorBIM32' ? 270 : 303) : 320;

        printText(ctx, x, 146, 146, 16, upd, 14, 'right', color, bgColor);
        const w = ctx.measureText(upd).width;
        if(w) drawScaledImage(ctx, symbols.upd(), c - w, 146, 12, 12);
    }

    return time;
}