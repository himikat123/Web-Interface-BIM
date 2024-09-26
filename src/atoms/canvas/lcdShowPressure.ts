import i18n from '../../i18n/main';
import store from '../../redux/store';
import { printText } from "./primitives";
import { validatePressure } from "../validateValues";
import lcdGetPres from "../lcdGetPres";

export default function lcdShowPressure(ctx: CanvasRenderingContext2D, 
    prevPres: number | undefined, color: string, bgColor: string
): number {
    const pres = lcdGetPres();

    if(pres !== prevPres) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const units = i18n.t('units.mm');
        let p = validatePressure(pres) ? String(Math.round(pres * 0.75)) : '--';
        p += units;
        const x = dispModel ? 250 : 286; 
        printText(ctx, x, 119, 70, 20, p, 21, 'center', color, bgColor);
    }

    return pres;
}