import { printText } from "./primitives";

export default function lcdShowDescription(ctx: CanvasRenderingContext2D, description: string, font1: number, font2: number, color: string, bgColor: string) {
    ctx.font = '21px Ubuntu';
    let w = ctx.measureText(description).width ?? 0;
    printText(ctx, 0, 84, 319, 20, description, w > 316 ? font1 : font2, 'center', color, bgColor);
}