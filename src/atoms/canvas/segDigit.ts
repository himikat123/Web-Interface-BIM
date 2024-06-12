import segHorizontalSegment from "./segHorizontalSegment";
import segVerticalSegment from "./segVerticalSegment";
import { fillCircle } from "./primitives";

const font7segment = [
    0x3F, 0x06, 0x5B, 0x4F, //0 1 2 3
    0x66, 0x6D, 0x7D, 0x07, //4 5 6 7
    0x7F, 0x6F, 0x63, 0x77, //8 9 ° A
    0x39, 0x73, 0x76, 0x00, //C P H space
    0x40, 0x08, 0x48, 0x49  //- ant1 ant2 ant3
];

function isBitOn(num: number, index: number) {
    return Boolean(num & (1 << index));
}

export default function segDigit(ctx: CanvasRenderingContext2D, x: number, segments: number, dot: boolean, color: string) {
    const blk = '#000';
    segHorizontalSegment(ctx, x + 4, 0, isBitOn(font7segment[segments], 0) ? color : blk);  // A
    segVerticalSegment(ctx, x + 28, 4, isBitOn(font7segment[segments], 1) ? color : blk);   // B
    segVerticalSegment(ctx, x + 28, 32, isBitOn(font7segment[segments], 2) ? color : blk);  // C
    segHorizontalSegment(ctx, x + 4, 56, isBitOn(font7segment[segments], 3) ? color : blk); // D
    segVerticalSegment(ctx, x, 32, isBitOn(font7segment[segments], 4) ? color : blk);       // E
    segVerticalSegment(ctx, x, 4, isBitOn(font7segment[segments], 5) ? color : blk);        // F
    segHorizontalSegment(ctx, x + 4, 28, isBitOn(font7segment[segments], 6) ? color : blk); // G
    fillCircle(ctx, x + 38, 59, 3, isBitOn(font7segment[segments], 7) ? color : blk);       // H
}