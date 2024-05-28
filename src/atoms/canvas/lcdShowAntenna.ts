import store from '../../redux/store';
import { drawImage } from "./primitives";
import { ant_1, ant_2, ant_3, ant_4, ant_AP} from '../img/ant';

export default function lcdShowAntenna(ctx: CanvasRenderingContext2D, prevSignal: string): string {
    const signal = store.getState().data.network.sig;
    if(signal !== prevSignal) {
        let rssi = parseInt(signal, 10);
        if(rssi > -51) drawImage(ctx, ant_4(), 292, 1);
        if(rssi < -50 && rssi > -76) drawImage(ctx, ant_3(), 292, 1);
        if(rssi <- 75 && rssi > -96) drawImage(ctx, ant_2(), 292, 1);
        if(rssi < -95) drawImage(ctx, ant_1(), 292, 1);
        if(rssi >= 0) drawImage(ctx, ant_AP(), 292, 1);
    }
    return signal;
}