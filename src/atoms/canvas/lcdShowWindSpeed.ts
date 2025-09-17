import i18n from '../../i18n/main';
import store from '../../redux/store';
import device from '../../device';
import lcdGetWindSpeed from '../lcdGetData/lcdGetWindSpeed';
import { printText } from "./primitives";
import { validateWindSpeed } from "../validateValues";

export default function lcdShowWindSpeed(
    ctx: CanvasRenderingContext2D, dispModel: number, 
    prevSpeed: number | undefined, color: string, bgColor: string
): number {
    const speed = device() === 'WeatherMonitorBIM32' ? lcdGetWindSpeed() : store.getState().data.weather.wind.speed;

    if(speed !== prevSpeed) {
        const units = i18n.t('units.mps');
        const x = dispModel ? 93 : 125;
        let spd = validateWindSpeed(speed) ? String(Math.round(speed)) : '--';
        spd += units;
        printText(ctx, x, 146, 40, 16, spd, 14, 'center', color, bgColor);
    }

    return speed;
}