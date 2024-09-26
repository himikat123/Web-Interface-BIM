import store from '../../redux/store';
import { drawImage, fillRect } from "./primitives";
import * as wind from "../img/wind";

export default function lcdShowWindDirection(ctx: CanvasRenderingContext2D, prevDir: number | undefined, bgColor: string): number {
    const dir = store.getState().data.weather.wind.dir;
    
    if(dir !== prevDir) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const x = dispModel ? 133 : 166;

        if(dir >= 0 && dir < 360) {
            let img = wind.north();
            if((dir >= 338 && dir < 360) || (dir >= 0 && dir < 22)) img = wind.north();
            else if(dir >= 22 && dir < 67) img = wind.north_east();
            else if(dir >= 67 && dir < 112) img = wind.east();
            else if(dir >= 112 && dir < 157) img = wind.south_east();
            else if(dir >= 157 && dir < 202) img = wind.south();
            else if(dir >= 202 && dir < 247) img = wind.south_west();
            else if(dir >= 247 && dir < 292) img = wind.west();
            else if(dir >= 292 && dir < 338) img = wind.north_west();
            drawImage(ctx, img, x, 143);
        }
        else fillRect(ctx, x, 143, 16, 16, bgColor);
    }

    return dir;
}