import { fillCircle } from "./primitives";

export default function lcdShowClockPoints(ctx: CanvasRenderingContext2D, color: string) {
    fillCircle(ctx, 71, 24, 3, color);
    fillCircle(ctx, 71, 52, 3, color);
}