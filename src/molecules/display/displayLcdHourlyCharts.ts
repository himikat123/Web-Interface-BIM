import { line, drawLine, fillRect } from "../../atoms/canvas/primitives";
import lcdColors from "../../atoms/canvas/lcdColors";
import { iHourlyWeather } from "../../interfaces";
import * as D from "../../atoms/constants/displayTypes";

export default function displayLcdHourlyCharts(ctx: CanvasRenderingContext2D, 
    dispModel: number, weather: iHourlyWeather | undefined, shift: number, type: string
) {
    const color = lcdColors();

    let x = 48, gw = 37, gh = 10, gm = 10, step = 48, offset = 8; // NX4832K(T)035
    switch(dispModel) {
        case D.NX4827K043: x = 56; gw = 37; gh = 9; gm = 10; step = 48; offset = 12; break;
        case D.ILI9341: x = 42; gw = 31; gh = 10; gm = 8; step = 32; offset = 8; break;
    }

    fillRect(ctx, x, 0, (gw - 1) * gm, (gh - 1) * gm, color.BG);
    for(let i=0; i<gh; i++) {
        drawLine(ctx, x, i * gm, (gw - 1) * gm, 0, color.GRID);
    }
    for(let i=0; i<gw; i++) {
        drawLine(ctx, i * gm + x, 0, 0, (gh - 1) * gm, color.GRID);
    }

    for(let cht=0; cht<4; cht++) {
        let chartMin = 10000;
        let chartMax = -10000;
        let ch = [];

        for(let i=0; i<8; i++) {
            if(cht === 0) ch[i] = weather?.temp[i + shift] ?? 0;
            if(cht === 1) ch[i] = weather?.pres[i + shift] ?? 0;
            if(cht === 2) ch[i] = weather?.prec[i + shift] ?? 0;
            if(cht === 3) ch[i] = weather?.hum[i + shift] ?? 0;
        }
        for(let i=0; i<8; i++) {
            if(ch[i] < chartMin) chartMin = ch[i];
            if(ch[i] > chartMax) chartMax = ch[i];
        }

        let m = chartMax - chartMin;
        let k = m ? ((gm * 8) / m) : 0;
        for(let i=0; i<8; i++) {
            ch[i] -= chartMin;
            if(k > 0) ch[i] *= k;
            else ch[i] /= 2;
            if(ch[i] > (gh * 8)) ch[i] = gh * 8;
        }

        const cshift = (gh - 1) * gm - 4;
        for(let i=0; i<7; i++) {
            if(cht === 0) { // temperature
                line(ctx, i * step + offset + x, cshift - ch[i], i * step + step + offset + x, cshift - ch[i + 1], color.TEMP);
            }
            if(cht === 1 && (type === 'hourly' || type === 'historyOut')) { // pressure
                line(ctx, i * step + offset + x, cshift - ch[i] - 2, i * step + step + offset + x, cshift - ch[i + 1] - 2, color.PRES);
            }
            if(cht === 2 && type === 'hourly') { // precipitation
                line(ctx, i * step + offset + x, cshift - ch[i] - 4, i * step + step + offset + x, cshift - ch[i + 1] - 4, color.PREC);
            }
            if(cht === 3 && (type === 'historyOut' || type === 'historyIn')) { // humidity
                line(ctx, i * step + offset + x, cshift - ch[i] - 4, i * step + step + offset + x, cshift - ch[i + 1] - 4, color.PREC);
            }
        }
    }    
}