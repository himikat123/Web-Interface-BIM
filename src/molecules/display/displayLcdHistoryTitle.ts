import { drawLine, printText } from "../../atoms/canvas/primitives";

export function displayLcdHistoryTitle(ctx: CanvasRenderingContext2D, title: string, dispModel: number) {
    const x = dispModel ? 38 : 64;
    const w = 248;
    drawLine(ctx, x, 191, w - 1, 0, '#777');
    drawLine(ctx, x, 190, 0, 26, '#777');
    drawLine(ctx, x + 1, 215, w - 1, 0, '#FFF');
    drawLine(ctx, x + w, 190, 0, 26, '#FFF');
    printText(ctx, x + 1, 196, w - 2, 18, title, 14, 'center', '#FFF', '#000');
}