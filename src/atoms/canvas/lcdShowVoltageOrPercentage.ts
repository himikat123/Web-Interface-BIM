import { printText } from "./primitives";
import lcdGetVoltage from "../lcdGetVoltage";

export default function lcdShowVoltageOrPercentage(ctx: CanvasRenderingContext2D, 
    prevValue: string, font: number, color: string, colorAir: string, bgColor: string
): string {
    const v = lcdGetVoltage();
    if(v.val !== prevValue) {
        printText(ctx, 198, 7, 58, 16, v.val, font, 'center', v.type ? colorAir : color, bgColor);
    }

    return v.val;
}