import store from '../../redux/store';
import moment from "moment";
import device from '../../device';
import { printText, drawScaledImage } from "./primitives";
import * as symbols from "../img/symbols";

export default function lcdShowUpdTime(ctx: CanvasRenderingContext2D, 
    prevTime: number | undefined, color: string, bgColor: string
): number {
    const time = store.getState().data.weather.time;
    const ip = store.getState().data.network.ip;
    const numIP = (!/^\d+\.\d+\.\d+\.\d+$/.test(ip)) ? 0 : Number(ip.split('.').map(Number).join(''));
    let hourFormat;
    switch(store.getState().config.clock.format) {
        case 0: hourFormat = 'h'; break;
        case 1: hourFormat = 'hh'; break;
        case 2: hourFormat = 'H'; break;
        default: hourFormat = 'HH'; break;
    }

    if((device() === 'WeatherMonitorBIM32') ? (time !== prevTime) : (numIP !== prevTime)) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const upd = time > 0
            ? moment.unix(time).utc().format((dispModel && device() === 'WeatherMonitorBIM32') 
                ? `DD.MM.YYYY ${hourFormat}:mm` 
                : `DD.MM.YYYY ${hourFormat}:mm:ss`)
            : '';
        const x = dispModel ? (device() === 'WeatherMonitorBIM32' ? 140 : 173) : 188;
        const c = dispModel ? (device() === 'WeatherMonitorBIM32' ? 270 : 303) : 320;

        if(device() === 'WeatherMonitorBIM32') {
            printText(ctx, x, 146, 146, 16, upd, 14, 'right', color, bgColor);
            const w = ctx.measureText(upd).width;
            if(w) drawScaledImage(ctx, symbols.upd(), c - w, 146, 12, 12);
        }
        else {
            printText(ctx, x, 146, 146, 16, ip, 14, 'right', color, bgColor);
        }
    }

    return (device() === 'WeatherMonitorBIM32') ? time : numIP;
}