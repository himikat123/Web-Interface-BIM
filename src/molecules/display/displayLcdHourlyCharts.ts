import { line, drawLine, fillRect } from "../../atoms/canvas/primitives";
import lcdColors from "../../atoms/canvas/lcdColors";
import { iHourlyWeather } from "../../interfaces";

export default function displayLcdHourlyCharts(ctx: CanvasRenderingContext2D, 
    dispModel: number, weather: iHourlyWeather | undefined, shift: number, type: string
) {
    const color = lcdColors();
    const step = dispModel ? 32 : 36;
    const grid = dispModel ? 31 : 35;

    fillRect(ctx, 42, 0, grid * 8, 72, color.BG);
    for(let i=0; i<10; i++) {
        drawLine(ctx, 42, i * 8, grid * 8, 0, color.GRID);
    }
    for(let i=0; i<grid + 1; i++) {
        drawLine(ctx, i * 8 + 42, 0, 0, 72, color.GRID);
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
        let k = m ? (64 / m) : 0;
        for(let i=0; i<8; i++) {
            ch[i] -= chartMin;
            if(k > 0) ch[i] *= k;
            else ch[i] /= 2;
            if(ch[i] > 72) ch[i] = 72;
        }

        const offset = dispModel ? 50 : 56;
        for(let i=0; i<7; i++) {
            if(cht === 0) { // temperature
                line(ctx, i * step + offset, 67 - ch[i], i * step + step + offset, 67 - ch[i + 1], color.TEMP);
            }
            if(cht === 1 && (type === 'hourly' || type === 'historyOut')) { // pressure
                line(ctx, i * step + offset, 69 - ch[i], i * step + step + offset, 69 - ch[i + 1], color.PRES);
            }
            if(cht === 2 && type === 'hourly') { // precipitation
                line(ctx, i * step + offset, 71 - ch[i], i * step + step + offset, 71 - ch[i + 1], color.PREC);
            }
            if(cht === 3 && (type === 'historyOut' || type === 'historyIn')) { // humidity
                line(ctx, i * step + offset, 71 - ch[i], i * step + step + offset, 71 - ch[i + 1], color.PREC);
            }
        }
    }    
}