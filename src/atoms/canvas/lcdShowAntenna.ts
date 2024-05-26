import { drawImage } from "./primitives";
import Ant_AP from '../img/ant/ant_AP';
import Ant_1 from '../img/ant/ant_1';
import Ant_2 from '../img/ant/ant_2';
import Ant_3 from '../img/ant/ant_3';
import Ant_4 from '../img/ant/ant_4';

export default function lcdShowAntenna(ctx: CanvasRenderingContext2D, signal: string) {
    let rssi = parseInt(signal, 10);

    if(rssi > -51) drawImage(ctx, Ant_4(), 292, 1);
    if(rssi < -50 && rssi > -76) drawImage(ctx, Ant_3(), 292, 1);
    if(rssi <- 75 && rssi > -96) drawImage(ctx, Ant_2(), 292, 1);
    if(rssi < -95) drawImage(ctx, Ant_1(), 292, 1);
    if(rssi >= 0) drawImage(ctx, Ant_AP(), 292, 1);
}