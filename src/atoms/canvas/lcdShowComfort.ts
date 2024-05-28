import { printText } from "./primitives";

export default function lcdShowComfort(ctx: CanvasRenderingContext2D, 
    comfort: string, prevComfort: string, font: number, color: string, bgColor: string
): string {
    if(comfort !== prevComfort) {
        printText(ctx, 145, 28, 175, 16, comfort, font, 'center', color, bgColor);
    }

    return comfort;
}