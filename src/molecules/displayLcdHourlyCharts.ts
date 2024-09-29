import { line, drawLine, fillRect } from "../atoms/canvas/primitives";
import { iHourlyWeather } from "../interfaces";

export default function displayLcdHourlyCharts(ctx: CanvasRenderingContext2D, 
    dispModel: number, weather: iHourlyWeather | undefined, shift: number
) {
    const BG_COLOR   = '#000';
    const GRID_COLOR = '#484C48';
    const TEMP_COLOR = '#F8FC00';
    const PRES_COLOR = '#F800F8';
    const PREC_COLOR = '#00FCF8';
    const step = dispModel ? 32 : 36;
    const grid = dispModel ? 31 : 35;

    fillRect(ctx, 42, 0, grid * 8, 72, BG_COLOR);
    for(let i=0; i<10; i++) {
        drawLine(ctx, 42, i * 8, grid * 8, 0, GRID_COLOR);
    }
    for(let i=0; i<grid + 1; i++) {
        drawLine(ctx, i * 8 + 42, 0, 0, 72, GRID_COLOR);
    }

    for(let cht=0; cht<3; cht++) {
        let chartMin = 10000;
        let chartMax = -10000;
        let ch = [];

        for(let i=0; i<8; i++) {
            if(cht === 0) ch[i] = weather?.temp[i + shift] ?? 0;
            if(cht === 1) ch[i] = weather?.pres[i + shift] ?? 0;
            if(cht === 2) ch[i] = weather?.prec[i + shift] ?? 0;
        }
        for(let i=0; i<8; i++) {
            if(ch[i] < chartMin) chartMin = ch[i];
            if(ch[i] > chartMax) chartMax = ch[i];
        }

        let m = chartMax - chartMin;
        let k = m ? (64 / m) : 0;
        for(let i=0; i<8; i++) {
            ch[i] -= chartMin;
            if(k > 0) ch[i] *= k;
            else ch[i] /= 2;
            if(ch[i] > 72) ch[i] = 72;
        }

        const offset = dispModel ? 50 : 56;
        for(let i=0; i<7; i++) {
            if(cht === 0) line(ctx, i * step + offset, 68 - ch[i], i * step + step + offset, 68 - ch[i + 1], TEMP_COLOR);
            if(cht === 1) line(ctx, i * step + offset, 70 - ch[i], i * step + step + offset, 70 - ch[i + 1], PRES_COLOR);
            if(cht === 2) line(ctx, i * step + offset, 72 - ch[i], i * step + step + offset, 72 - ch[i + 1], PREC_COLOR);
        }
    }    
}