import i18n from '../../i18n/main';
import { printText } from "./primitives";
import * as vl from "../validateValues";
import lcdGetPres from "../lcdGetData/lcdGetPres";
import { hPaToMM, mmToHPA } from '../indications/hPaMM';

export default function lcdShowPressure(
    ctx: CanvasRenderingContext2D, dispModel: number,
    prevPres: number | undefined, color: string, bgColor: string, local: number
): number {
    const pres = lcdGetPres();

    if(pres !== prevPres) {
        const units = local ? i18n.t('units.hpa') : i18n.t('units.mm');
        let p = vl.validatePressureHPA(pres) 
            ? local 
                ? String(Math.round(pres))
                : String(Math.round(hPaToMM(pres))) 
            : vl.validatePressureMM(pres)
                ? local
                    ? String(Math.round(mmToHPA(pres)))
                    : String(Math.round(pres))
                : '--';
        p += units; 
        printText(
            ctx, 
            dispModel ? 250 : 286, 
            120, 
            70, 
            (local && dispModel) ? 16 : (local ? 16 : 20), 
            p, 
            (local && dispModel) ? 18 : (local ? 18 : 21), 
            'center', 
            color, 
            bgColor
        );
    }

    return pres;
}