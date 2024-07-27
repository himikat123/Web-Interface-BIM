import store from '../../redux/store';
import { drawScaledImage } from "./primitives";
import * as icons from '../img/icons';

export default function lcdShowWeatherIcon(ctx: CanvasRenderingContext2D, prevIcon: number): number {
    const icon = store.getState().data.weather.icon;
    const isDay = store.getState().data.weather.isDay;

    if(prevIcon !== (icon * 100 + isDay)) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;

        const y = dispModel ? 104 : 88;
        const size = dispModel ? 60 : 70;
        let wIcon = icons.w_01_d();
        switch(icon) {
            case 1: wIcon = isDay ? icons.w_01_d() : icons.w_01_n(); break;
            case 2: wIcon = isDay ? icons.w_02_d() : icons.w_02_n(); break;
            case 3: wIcon = icons.w_04(); break;
            case 4: wIcon = icons.w_09(); break;
            case 5: wIcon = icons.w_10(); break;
            case 6: wIcon = isDay ? icons.w_11_d() : icons.w_11_n(); break;
            case 7: wIcon = icons.w_13(); break;
            case 8: wIcon = icons.w_50(); break;
            default: wIcon = icons.w_loading(); break;
        }
        drawScaledImage(ctx, wIcon, 0, y, size, size);
    }
    return icon * 100 + isDay;
}