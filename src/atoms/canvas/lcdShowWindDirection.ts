import { drawImage, fillRect } from "./primitives";
import * as wind from "../img/wind";

export default function lcdShowWindDirection(ctx: CanvasRenderingContext2D, dir: number, prevDir: number, bgColor: string): number {
    if(dir !== prevDir) {
        if((dir >= 338 && dir < 360) || (dir >= 0 && dir < 22)) drawImage(ctx, wind.north(), 133, 143);
        else if(dir >= 22 && dir < 67) drawImage(ctx, wind.north_east(), 133, 143);
        else if(dir >= 67 && dir < 112) drawImage(ctx, wind.east(), 133, 143);
        else if(dir >= 112 && dir < 157) drawImage(ctx, wind.south_east(), 133, 143);
        else if(dir >= 157 && dir < 202) drawImage(ctx, wind.south(), 133, 143);
        else if(dir >= 202 && dir < 247) drawImage(ctx, wind.south_west(), 133, 143);
        else if(dir >= 247 && dir < 292) drawImage(ctx, wind.west(), 133, 143);
        else if(dir >= 292 && dir < 338) drawImage(ctx, wind.north_west(), 133, 143);
        else fillRect(ctx, 133, 143, 16, 16, bgColor);
    }

    return dir;
}