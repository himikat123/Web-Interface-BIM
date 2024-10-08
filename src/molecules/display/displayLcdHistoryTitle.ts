import { fillRect, drawLine, printText } from "../../atoms/canvas/primitives";

export function displayLcdHistoryTitle(ctx: CanvasRenderingContext2D, title: string, dispModel: number) {
    const x = dispModel ? 38 : 64;
    const w = 248;
    fillRect(ctx, x, 190, w, 26, '#202420');
    drawLine(ctx, x, 191, w - 1, 0, '#777');
    drawLine(ctx, x, 190, 0, 26, '#777');
    drawLine(ctx, x + 1, 215, w - 1, 0, '#FFF');
    drawLine(ctx, x + w, 190, 0, 26, '#FFF');
    printText(ctx, x + 1, 195, w - 2, 20, title, 18, 'center', '#FFF', '#000');
}