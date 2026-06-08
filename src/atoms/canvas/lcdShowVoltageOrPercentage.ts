import { printText } from "./primitives";
import lcdGetVoltage from "../lcdGetData/lcdGetVoltage";
import * as vl from '../validateValues';
import * as D from "../constants/displayTypes";
import { iConf } from "../../redux/configTypes";
import { iDat } from "../../redux/dataTypes";

export default function lcdShowVoltageOrPercentage(
    ctx: CanvasRenderingContext2D, dispModel: number, prevValue: string | undefined, 
    color: string, colorAir: string, bgColor: string, config: iConf, data: iDat
): string {
    const v = lcdGetVoltage(config, data);

    if(v.val !== prevValue) {
        let x = 272, y = 1, w = 104, h = 32, f = 16; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: x = 272; y = 6; w = 104; h = 18; f = 16; break;
            case D.ILI9341: x = 178; y = 10; w = 78; h = 14; f = 14; break;
        }

        const match = v.val.match(/[\d.]+/);
        const val = match ? parseFloat(match[0]) : -1;
        const dataValid = (
            vl.validateAnalogVoltage(val) || 
            vl.validateHighVoltage(val) || 
            vl.validatePercentage(val) ||
            vl.validateCO2(val)
        )
        printText(ctx, x, y, w, h, dataValid ? v.val : '--', f, v.type === 'date' ? 'left' : 'center', v.type === 'air' ? colorAir : color, bgColor, true);
    }

    return v.val;
}