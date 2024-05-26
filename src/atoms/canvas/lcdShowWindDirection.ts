import { drawImage, fillRect } from "./primitives";
import Wind_north from "../img/wind/n";
import Wind_north_east from "../img/wind/ne";
import Wind_east from "../img/wind/e";
import Wind_south_east from "../img/wind/se";
import Wind_south from "../img/wind/s";
import Wind_south_west from "../img/wind/sw";
import Wind_west from "../img/wind/w";
import Wind_north_west from "../img/wind/nw";

export default function lcdShowWindDirection(ctx: CanvasRenderingContext2D, dir: number, bgColor: string) {
    if((dir >= 338 && dir < 360) || (dir >= 0 && dir < 22)) drawImage(ctx, Wind_north(), 133, 143);
    else if(dir >= 22 && dir < 67) drawImage(ctx, Wind_north_east(), 133, 143);
    else if(dir >= 67 && dir < 112) drawImage(ctx, Wind_east(), 133, 143);
    else if(dir >= 112 && dir < 157) drawImage(ctx, Wind_south_east(), 133, 143);
    else if(dir >= 157 && dir < 202) drawImage(ctx, Wind_south(), 133, 143);
    else if(dir >= 202 && dir < 247) drawImage(ctx, Wind_south_west(), 133, 143);
    else if(dir >= 247 && dir < 292) drawImage(ctx, Wind_west(), 133, 143);
    else if(dir >= 292 && dir < 338) drawImage(ctx, Wind_north_west(), 133, 143);
    else fillRect(ctx, 133, 143, 16, 16, bgColor);
}