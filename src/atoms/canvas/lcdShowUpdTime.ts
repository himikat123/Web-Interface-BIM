import store from '../../redux/store';
import moment from "moment";
import { printText, drawScaledImage } from "./primitives";
import * as symbols from "../img/symbols";

export default function lcdShowUpdTime(ctx: CanvasRenderingContext2D, 
    prevTime: number, color: string, bgColor: string
): number {
    const time = store.getState().data.weather.time;

    if(time !== prevTime) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const lang = store.getState().config.lang;
        const usa = 'YYYY-DD-MM hh:mm:ss';
        const others = 'DD.MM.YYYY hh:mm:ss';
        const upd = moment.unix(time).format(lang === 'en' ? usa : others);
        const x = dispModel ? 150 : 194;
        const c = dispModel ? 270 : 312;

        printText(ctx, x, 148, 133, 16, upd, 11, 'right', color, bgColor);
        const w = ctx.measureText(upd).width;
        if(w) drawScaledImage(ctx, symbols.upd(), c - w, 147, 10, 10);
    }

    return time;
}