import store from '../../redux/store';
import moment from "moment";
import device from '../../device';
import { printText, drawScaledImage } from "./primitives";
import * as symbols from "../img/symbols";
import * as D from '../constants/displayTypes';

export default function lcdShowUpdTime(
    ctx: CanvasRenderingContext2D, dispModel: number, 
    prevTime: number | undefined, color: string, bgColor: string
): number {
    const time = store.getState().data.weather.time;
    const ip = store.getState().data.network.ip;
    const numIP = (!/^\d+\.\d+\.\d+\.\d+$/.test(ip)) ? 0 : Number(ip.split('.').map(Number).join(''));
    let hourFormat;
    switch(store.getState().config?.clock.format) {
        case 0: hourFormat = 'h'; break;
        case 1: hourFormat = 'hh'; break;
        case 2: hourFormat = 'H'; break;
        default: hourFormat = 'HH'; break;
    }

    if((device() === 'WeatherMonitorBIM32') ? (time !== prevTime) : (numIP !== prevTime)) {
        const upd = time > 0
            ? moment.unix(time).utc().format((dispModel <= D.NX4827K043 && device() === 'WeatherMonitorBIM32') 
                ? `DD.MM.YYYY ${hourFormat}:mm:ss` 
                : `DD.MM.YYYY ${hourFormat}:mm`)
            : '';

        if(device() === 'WeatherMonitorBIM32') {
            let x = 255, y = 200, w = 180, h = 18, f = 16, c = 420; // NX4832K(T)035
            switch(dispModel) {
                case D.NX4827K043: x = 252; y = 162; w = 180; h = 18; f = 16; c = 418; break;
                case D.ILI9341: x = 140; y = 146; w = 146; h = 16; f = 14; c = 270; break;
            }
            printText(ctx, x, y, w, h, upd, f, 'right', color, bgColor);
            const wd = ctx.measureText(upd).width;
            if(wd) drawScaledImage(ctx, symbols.upd(), c - wd, y, 12, 12);
        }
        else if(device() === 'WeatherMonitorBIM') {
            printText(ctx, 173, 146, 146, 16, ip, 14, 'right', color, bgColor);
        }
    }

    return (device() === 'WeatherMonitorBIM32') ? time : numIP;
}


// TODO в истории и почасовом вместо гпа только г 
// нет данных истории и почасовых после логина
//при выборе bme680 в качестве датчика йак вместо напряжения батарейки указать что это IAQ