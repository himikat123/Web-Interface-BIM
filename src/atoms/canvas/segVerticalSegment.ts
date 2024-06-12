import { fillRect, fillTriangle } from "./primitives";

export default function segVerticalSegment(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    fillTriangle(ctx, x + 3, y, x, y + 3, x + 6, y + 3, color);
    fillRect(ctx, x, y + 3, 6, 20, color);
    fillTriangle(ctx, x, y + 23, x + 6, y + 23, x + 3, y + 26, color);
}