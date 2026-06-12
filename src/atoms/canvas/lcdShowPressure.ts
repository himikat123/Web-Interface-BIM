import i18n from '../../i18n/main';
import { printText, fillRect } from "./primitives";
import * as vl from "../validateValues";
import lcdGetPres from "../lcdGetData/lcdGetPres";
import { hPaToMM, mmToHPA } from '../indications/hPaMM';
import * as D from '../constants/displayTypes';
import lcdColors from './lcdColors';
import type { iConf } from '../../redux/configTypes';
import type { iDat } from '../../redux/dataTypes';

export default function lcdShowPressure(
    ctx: CanvasRenderingContext2D, dispModel: number, prevPres: number | undefined, 
    color: string, bgColor: string, local: number, config: iConf, data: iDat
): number {
    const pres = lcdGetPres(config, data);
    const bg = lcdColors().BG;
    const NEXTION = (dispModel === D.NX4832K035 || dispModel === D.NX4832T035 || dispModel === D.NX4827K043);

    if(pres !== prevPres) {
        const units = local ? i18n.t('units.hpa') : i18n.t('units.mm');
        const p = vl.validatePressureHPA(pres) 
            ? local 
                ? Math.round(pres)
                : Math.round(hPaToMM(pres)) 
            : vl.validatePressureMM(pres)
                ? local 
                    ? Math.round(mmToHPA(pres))
                    : Math.round(pres)
                : undefined;
        const prs = (p ? String(Math.round(p)) : '--') + units;
        const u1000 = (p ?? 0) < 1000;

        let x = 373, y = u1000 ? 163 : 171, w = 103, h = 27, f = u1000 ? 32 : 24;
        switch(dispModel) {
            case D.NX4827K043: x = 375; y = u1000 ? 127 : 133; w = 106; h = 26; f = u1000 ? 32 : 24; break;
            case D.ILI9341: x = 250; y = 122; w = 70; h = 16; f = 18; break;
        }

        if(NEXTION && (p ?? 0) >= 1000) fillRect(ctx, x, y - 8, w, 8, bg);
        printText(ctx, x, y, w, h, prs, f, 'center', color, bgColor);
    }

    return pres;
}