import store from '../../redux/store';
import { drawImage, drawScaledImage } from "./primitives";
import { ant_1, ant_2, ant_3, ant_4, ant_AP } from '../img/ant';
import * as D from '../constants/displayTypes';

export default function lcdShowAntenna(ctx: CanvasRenderingContext2D, dispModel: number, prevSignal: string | undefined): string {
    const signal = store.getState().data.network.sig;
    
    if(signal !== prevSignal) {
        let x = 431, w = 48; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: x = 435; w = 40; break;
            case D.ILI9341: x = 292; w = 26; break;
        }

        let ant = ant_4();
        let rssi = parseInt(signal, 10);
        if(rssi < -50 && rssi > -76) ant = ant_3();
        if(rssi <- 75 && rssi > -96) ant = ant_2();
        if(rssi < -95) ant = ant_1();
        if(rssi >= 0) ant = ant_AP();

        drawScaledImage(ctx, ant, x, 1, w, w);
    }
    return signal;
}