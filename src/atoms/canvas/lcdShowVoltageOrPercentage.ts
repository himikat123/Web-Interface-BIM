import store from '../../redux/store';
import { printText } from "./primitives";
import lcdGetVoltage from "../lcdGetData/lcdGetVoltage";
import * as vl from '../validateValues';

export default function lcdShowVoltageOrPercentage(
    ctx: CanvasRenderingContext2D, dispModel: number, prevValue: string | undefined, 
    color: string, colorAir: string, bgColor: string, localTemp: number
): string {
    const v = lcdGetVoltage(localTemp);

    if(v.val !== prevValue) {
        const x = dispModel ? 180 : 190;
        const font = dispModel ? 12 : 11;
        const match = v.val.match(/[\d.]+/);
        const val = match ? parseFloat(match[0]) : -1;
        const dataValid = (
            vl.validateAnalogVoltage(val) || 
            vl.validateHighVoltage(val) || 
            vl.validatePercentage(val) ||
            vl.validateCO2(val)
        )
        printText(ctx, x, 7, 88, 16, dataValid ? v.val : '--', font, v.type === 'date' ? 'left' : 'center', v.type === 'air' ? colorAir : color, bgColor);
    }

    return v.val;
}