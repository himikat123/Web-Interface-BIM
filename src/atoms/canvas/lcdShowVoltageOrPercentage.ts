import store from '../../redux/store';
import { printText } from "./primitives";
import lcdGetVoltage from "../lcdGetData/lcdGetVoltage";
import * as vl from '../validateValues';

export default function lcdShowVoltageOrPercentage(ctx: CanvasRenderingContext2D, 
    prevValue: string | undefined, color: string, colorAir: string, bgColor: string
): string {
    const v = lcdGetVoltage();

    if(v.val !== prevValue) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const x = dispModel ? 198 : 220;
        const font = dispModel ? 14 : 11;
        const dataValid = (vl.validateAnalogVoltage(Number(v.val)) || vl.validateHighVoltage(Number(v.val)) || vl.validatePercentage(Number(v.val)))
        printText(ctx, x, 7, 58, 16, dataValid ? v.val : '--', font, 'center', v.type ? colorAir : color, bgColor);
    }

    return v.val;
}