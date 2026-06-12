import store from '../../redux/store';
import { drawScaledImage, fillRect } from "./primitives";
import device from '../../device';
import lcdGetWindDir from '../lcdGetData/lcdGetWindDir';
import * as wind from "../img/wind";
import * as D from '../constants/displayTypes';
import type { iConf } from '../../redux/configTypes';
import type { iDat } from '../../redux/dataTypes';

export default function lcdShowWindDirection(
    ctx: CanvasRenderingContext2D, dispModel: number, prevDir: number | undefined, 
    bgColor: string, config: iConf, data: iDat
): number {
    const dir = device() === 'WeatherMonitorBIM32' ? lcdGetWindDir(config, data) : data.weather.wind.dir;
    
    if(dir !== prevDir) {
        let x = 232, y = 195, w = 24; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: x = 216; y = 157; w = 24; break;
            case D.ILI9341: x = 133; y = 143; w = 16; break;
        }

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
            drawScaledImage(ctx, img, x, y, w, w);
        }
        else fillRect(ctx, x, y, w, w, bgColor);
    }

    return dir;
}