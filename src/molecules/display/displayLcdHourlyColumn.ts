import { drawScaledImage, printText, fillRect } from "../../atoms/canvas/primitives";
import * as icons from "../../atoms/img/icons";
import * as wind from "../../atoms/img/wind";
import * as symb from "../../atoms/img/symbols";
import i18n from "../../i18n/main";
import moment from 'moment';
import { getLocale } from "../../atoms/getLocale";
import lcdColors from "../../atoms/canvas/lcdColors";
import { hPaToMM } from "../../atoms/indications/hPaMM";
import { validateTemperature, validatePressureHPA } from "../../atoms/validateValues";
import * as D from "../../atoms/constants/displayTypes";
import type { iConf } from "../../redux/configTypes";

export default function displayLcdHourlyColumn(
    ctx: CanvasRenderingContext2D, dispModel: number, temps: number[] | undefined, 
    hums: number[] | undefined, press: number[] | undefined, icns: number[] | undefined,
    dates: number[] | undefined, wSpeeds: number[] | undefined, wDirs: number[] | undefined,
    precs: number[] | undefined, num: number, shift: number, type: string, localPres: number, config: iConf
) {
    dates = dates === undefined ? Array(24).fill(0) : dates;
    const color = lcdColors();
    const s = num + shift;
    let c = 48, x = 42, y1 = 110, y2 = 20, y3 = 22, y4 = 48, y5 = 23, 
        y6 = 18, w = 50, iw = 40, f1 = 16, f2 = 12, f3 = 24, f4 = 14;
    switch(dispModel) {
        case D.NX4827K043: 
            c = 48; x = 42; y1 = 90; y2 = 16; y3 = 16; y4 = 40; y5 = 24; 
            y6 = 16; w = 50; iw = 40; f1 = 16; f2 = 12; f3 = 24; f4 = 14;
            break;
        case D.ILI9341: 
            c = 32; x = 30; y1 = 86; y2 = 16; y3 = 14; y4 = 40; y5 = 20; 
            y6 = 14; w = 36; iw = 30; f1 = 11; f2 = 8; f3 = 14; f4 = 9;
            break;
    }
    const gap = (type === 'historyIn' || type === 'historyOut') ? 4 : 0;
    let y = y1 + gap;
    x = c * num + x;

    const tempUnits = '°C';
    const t = temps?.[s] ?? 40400;
    const temp = validateTemperature(t)
        ? String(Math.round(t))
        : '--';
    printText(ctx, x, y, w, f1, temp + tempUnits, f1, 'center', color.TEMP, color.BG);
    y += y2 + gap;

    if(type === 'historyIn' || type === 'historyOut') {
        const hum = hums ? (Math.round(hums[s]) + '%') : '--%';
        printText(ctx, x, y, w, f1, hum, f1 + 1, 'center', color.HUM, color.BG);
        y += y3 + gap;
    }

    if(type === 'hourly' || type === 'historyOut') {
        const presUnits = localPres ? i18n.t('units.hpa') : i18n.t('units.mm');
        const p = press?.[s] ?? 40400;
        const pres = validatePressureHPA(p)
            ? String(Math.round(localPres ? p : hPaToMM(p)))
            : '--';
        printText(ctx, x, y, w, f2, pres + presUnits, f2, 'center', color.PRES, color.BG);
        y += y3 + gap;
    }

    if(type === 'hourly') {
        let wIcon = '';
        if(icns) {
            switch(icns[s]) {
                case 1: wIcon = icons.w_01_d(); break;
                case 2: wIcon = icons.w_02_d(); break;
                case 3: wIcon = icons.w_02_d(); break;
                case 4: wIcon = icons.w_04(); break;
                case 9: wIcon = icons.w_09(); break;
                case 10: wIcon = icons.w_10(); break;
                case 11: wIcon = icons.w_11_d(); break;
                case 13: wIcon = icons.w_13(); break;
                case 50: wIcon = icons.w_50(); break;
                default: wIcon = icons.w_loading(); break;
            }
        }
        else wIcon = icons.w_loading();
        drawScaledImage(ctx, wIcon, x, y, iw, iw);
        y += y4 + gap;

        let wd = moment.unix(dates[s] ?? 0).locale(getLocale()).format('dd');
        wd = wd.charAt(0).toUpperCase() + wd.slice(1);
        printText(ctx, x, y, w, f3, wd, f3, 'center', color.TEXT, color.BG);
        y += y5 + gap;
    }

    const dt = moment.unix(dates[s] ?? 0).format('DD');
    const mo = moment.unix(dates[s] ?? 0).locale(getLocale()).format('D MMM').split(' ')[1].substring(0, 3);

    printText(ctx, x, y, w, f4, dt + mo, f4, 'center', color.TEXT, color.BG);
    y += y6 + gap;

    let hourFormat;
    switch(config.clock.format) {
        case 0: hourFormat = 'h'; break;
        case 1: hourFormat = 'hh'; break;
        case 2: hourFormat = 'H'; break;
        default: hourFormat = 'HH'; break;
    }
    const tm = moment.unix(dates[s] ?? 0).format(`${hourFormat}:mm`);
    printText(ctx, x, y, w, f4, tm, f4, 'center', color.TEXT, color.BG);
    y += y6 + gap;

    if(type === 'hourly') {
        const ms = i18n.t('units.mps');
        const ws = wSpeeds ? (Math.round(wSpeeds[s]) + ms) : ('--' + ms);
        printText(ctx, x, y, w, f4, ws, f4, 'center', color.TEXT, color.BG);
        y += y6 + gap;

        const dir = wDirs?.[s] ?? 0;
        const wx = x + w / 2 - f4 / 2;
        if(dir >= 0 && dir <= 360) {
            let img = wind.north();
            if((dir >= 338 && dir <= 360) || (dir >= 0 && dir < 22)) img = wind.north();
            else if(dir >= 22 && dir < 67) img = wind.north_east();
            else if(dir >= 67 && dir < 112) img = wind.east();
            else if(dir >= 112 && dir < 157) img = wind.south_east();
            else if(dir >= 157 && dir < 202) img = wind.south();
            else if(dir >= 202 && dir < 247) img = wind.south_west();
            else if(dir >= 247 && dir < 292) img = wind.west();
            else if(dir >= 292 && dir < 338) img = wind.north_west();
            drawScaledImage(ctx, img, wx, y, f4, f4);
        }
        else fillRect(ctx, wx, y, f4, f4, color.BG);
        y += y6 + gap;

        drawScaledImage(ctx, symb.hum(), x + 2, y, f4 * 0.8, f4);
        let pr = precs?.[s]?.toString() ?? '0';
        if(config.weather.provider === 0) pr += (pr === '0' ? i18n.t('units.mm') : '');
        if(config.weather.provider === 2) pr += '%';
        printText(ctx, x + f4, y + 1, w - f4 * 1.5, f4, pr, f4, 'center', color.TEXT, color.BG);
    }
}