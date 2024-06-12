import { fillRect, fillTriangle } from "./primitives";

export default function segHorizontalSegment(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    fillTriangle(ctx, x, y + 3, x + 3, y, x + 3, y + 6, color);
    fillRect(ctx, x + 3, y, 20, 6, color);
    fillTriangle(ctx, x + 23, y, x + 26, y + 3, x + 23, y + 6, color);
}