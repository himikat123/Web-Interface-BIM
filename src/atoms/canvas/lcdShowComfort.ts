import { printText } from "./primitives";
import lcdGetComfort from "../lcdGetComfort";

export default function lcdShowComfort(ctx: CanvasRenderingContext2D, 
    prevComfort: string, sequence: string, font: number, color: string, bgColor: string
): string {
    const comfort = lcdGetComfort(sequence);
    if(comfort !== prevComfort) {
        printText(ctx, 145, 28, 175, 16, comfort, font, 'center', color, bgColor);
    }

    return comfort;
}