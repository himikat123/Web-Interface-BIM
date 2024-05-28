import store from '../../redux/store';
import moment from "moment";
import { printText, drawImage } from "./primitives";
import * as symbols from "../img/symbols";

export default function lcdShowUpdTime(ctx: CanvasRenderingContext2D, 
    prevTime: number, lang: string, font: number, color: string, bgColor: string
): number {
    const time = store.getState().data.weather.time;
    if(time !== prevTime) {
        const usa = 'YYYY-DD-MM hh:mm:ss';
        const others = 'DD.MM.YYYY hh:mm:ss';
        const upd = moment.unix(time).format(lang === 'en' ? usa : others);

        printText(ctx, 184, 148, 133, 16, upd, font, 'right', color, bgColor);
        let w = ctx.measureText(upd).width;
        if(w) drawImage(ctx, symbols.upd(), 300 - w, 147);
    }

    return time;
}