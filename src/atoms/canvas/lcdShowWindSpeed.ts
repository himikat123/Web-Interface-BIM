import i18n from '../../i18n/main';
import device from '../../device';
import lcdGetWindSpeed from '../lcdGetData/lcdGetWindSpeed';
import { printText } from "./primitives";
import { validateWindSpeed } from "../validateValues";
import * as D from '../constants/displayTypes';
import { iConf } from '../../redux/configTypes';
import { iDat } from '../../redux/dataTypes';

export default function lcdShowWindSpeed(
    ctx: CanvasRenderingContext2D, dispModel: number, prevSpeed: number | undefined, 
    color: string, bgColor: string, config: iConf, data: iDat
): number {
    const speed = device() === 'WeatherMonitorBIM32' ? lcdGetWindSpeed(config, data) : data.weather.wind.speed;

    if(speed !== prevSpeed) {
        const units = i18n.t('units.mps');
        let x = 162, y = 195, w = 69, h = 24, f = 24; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: x = 150; y = 156; w = 69; h = 24; f = 22; break;
            case D.ILI9341: x = 93; y = 146; w = 40; h = 16; f = 14; break;
        }

        let spd = validateWindSpeed(speed) ? String(Math.round(speed)) : '--';
        spd += units;
        printText(ctx, x, y, w, h, spd, f, 'center', color, bgColor);
    }

    return speed;
}