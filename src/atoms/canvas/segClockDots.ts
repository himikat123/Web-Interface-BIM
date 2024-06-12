import { fillCircle } from "./primitives";

export default function segClockDots(ctx: CanvasRenderingContext2D, x: number, state: boolean, color: string) {
    const blk = '#000';
    fillCircle(ctx, x, 18, 3, state ? color : blk);
    fillCircle(ctx, x, 44, 3, state ? color : blk);
}