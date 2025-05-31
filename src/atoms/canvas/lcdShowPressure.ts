import i18n from '../../i18n/main';
import store from '../../redux/store';
import { printText } from "./primitives";
import { validatePressure } from "../validateValues";
import lcdGetPres from "../lcdGetData/lcdGetPres";
import { hPaToMM } from '../indications/hPaToMM';

export default function lcdShowPressure(ctx: CanvasRenderingContext2D, prevPres: number | undefined, 
    color: string, bgColor: string, local: number
): number {
    const pres = lcdGetPres();

    if(pres !== prevPres) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const units = local ? i18n.t('units.hpa') : i18n.t('units.mm');
        let p = validatePressure(pres) 
            ? local 
                ? String(Math.round(pres))
                : String(Math.round(hPaToMM(pres))) 
            : '--';
        p += units;
        const x = dispModel ? 250 : 286; 
        printText(
            ctx, 
            x, 
            (local && dispModel) ? 121 : 118, 
            70, 
            (local && dispModel) ? 16 : 20, 
            p, 
            (local && dispModel) ? 18 : 21, 
            'center', 
            color, 
            bgColor
        );
    }

    return pres;
}