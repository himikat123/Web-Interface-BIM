import store from '../../redux/store';
import { drawImage, drawScaledImage } from "./primitives";
import { ant_1, ant_2, ant_3, ant_4, ant_AP } from '../img/ant';

export default function lcdShowAntenna(ctx: CanvasRenderingContext2D, prevSignal: string): string {
    const signal = store.getState().data.network.sig;
    
    if(signal !== prevSignal) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const x = dispModel ? 292: 330;
        let ant = ant_4();
        let rssi = parseInt(signal, 10);
        if(rssi < -50 && rssi > -76) ant = ant_3();
        if(rssi <- 75 && rssi > -96) ant = ant_2();
        if(rssi < -95) ant = ant_1();
        if(rssi >= 0) ant = ant_AP();

        if(dispModel) drawImage(ctx, ant, x, 0)
        else drawScaledImage(ctx, ant_4(), x, 0, 32, 32);
    }
    return signal;
}