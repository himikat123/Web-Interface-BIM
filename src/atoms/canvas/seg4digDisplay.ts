import segDigit from "./segDigit";
import segClockDots from "./segClockDots";

export default function seg4digitDisplay(ctx: CanvasRenderingContext2D, segments: number[], dots: boolean, color: string) {
    for(let i=0; i<4; i++) {
        segDigit(ctx, i * 43 + (i > 1 ? 6 : 0), segments[i], false, color);
    }
    segClockDots(ctx, 84, dots, color);
}