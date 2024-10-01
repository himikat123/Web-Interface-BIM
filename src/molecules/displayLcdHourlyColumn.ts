import store from "../redux/store";
import { drawScaledImage, printText, fillRect } from "../atoms/canvas/primitives";
import { iHourlyWeather } from "../interfaces";
import * as icons from "../atoms/img/icons";
import * as wind from "../atoms/img/wind";
import * as symb from "../atoms/img/symbols";
import i18n from "../i18n/main";
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/ru';
import 'moment/locale/pl';
import 'moment/locale/uk';
import 'moment/locale/bg';

export default function displayLcdHourlyColumn(ctx: CanvasRenderingContext2D, 
    dispModel: number, weather: iHourlyWeather | undefined, num: number, shift: number, type: string
) {
    const config = store.getState().config;
    const locale = config.lang === 'ua' ? 'uk' : config.lang;
    const BG_COLOR   = '#000';
    const TEXT_COLOR = '#FFF';
    const TEMP_COLOR = '#F8FC00';
    const HUM_COLOR = '#00FCF8';
    const PRES_COLOR = '#F800F8';
    const x = num * (dispModel ? 32 : 36) + (dispModel ? 30 : 38);
    let y = 86;
    const s = num + shift;
    const font = dispModel ? 9 : 11;

    const temp = weather?.temp[s] !== undefined ? (weather?.temp[s].toFixed(1) + '°') : '--°';
    printText(ctx, x + 2, y, 36, font + 1, temp, font + 1, 'center', TEMP_COLOR, BG_COLOR);
    y += 16;

    if(type === 'historyIn' || type === 'historyOut') {
        const hum = weather?.hum[s] !== undefined ? (Math.round(weather?.hum[s]) + '%') : '--%';
        printText(ctx, x + 2, y, 36, font, hum, font + 1, 'center', HUM_COLOR, BG_COLOR);
        y += 14;
    }

    if(type === 'hourly' || type === 'historyOut') {
        const mm = i18n.t('units.mm');
        const pres = weather?.pres[s] !== undefined ? (Math.round(weather.pres[s] * 0.75) + mm) : ('--' + mm);
        printText(ctx, x + 2, y, 36, font, pres, font, 'center', PRES_COLOR, BG_COLOR);
        y += 14;
    }

    if(type === 'hourly') {
        y -= 4;
        let wIcon = '';
        switch(weather?.icon[s]) {
            case 1: wIcon = icons.w_01_d(); break;
            case 2: wIcon = icons.w_02_d(); break;
            case 4: wIcon = icons.w_04(); break;
            case 9: wIcon = icons.w_09(); break;
            case 10: wIcon = icons.w_10(); break;
            case 11: wIcon = icons.w_11_d(); break;
            case 13: wIcon = icons.w_13(); break;
            case 50: wIcon = icons.w_50(); break;
            default: wIcon = icons.w_loading(); break;
        }
        const size = dispModel ? 30 : 36;
        drawScaledImage(ctx, wIcon, x, y, size, size);
        y += 40;

        let wd = moment.unix(weather?.date[s] ?? 0).locale(locale).format('dd');
        wd = wd.charAt(0).toUpperCase() + wd.slice(1);
        printText(ctx, x + 2, y, 36, 18, wd, 18, 'center', TEXT_COLOR, BG_COLOR);
        y += 20;
    }

    const dt = moment.unix(weather?.date[s] ?? 0).format('DD');
    const mo = moment.unix(weather?.date[s] ?? 0).locale(locale).format('MMM').substring(0, 3);
    printText(ctx, x + 2, y, 36, font, dt + mo, font, 'center', TEXT_COLOR, BG_COLOR);
    y += 14;

    const tm = moment.unix(weather?.date[s] ?? 0).format('HH:mm');
    printText(ctx, x + 2, y, 36, font, tm, font, 'center', TEXT_COLOR, BG_COLOR);
    y += 14;

    if(type === 'hourly') {
        const ms = i18n.t('units.mps');
        const ws = weather?.windSpeed[s] !== undefined ? (Math.round(weather.windSpeed[s]) + ms) : ('--' + ms);
        printText(ctx, x + 2, y, 36, font, ws, font, 'center', TEXT_COLOR, BG_COLOR);
        y += 14;

        const dir = weather?.windDir[s] !== undefined ? weather?.windDir[s] : 0;
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
            drawScaledImage(ctx, img, x + 12, y, 12, 12);
        }
        else fillRect(ctx, x + 12, y, 12, 12, BG_COLOR);
        y += 14;

        drawScaledImage(ctx, symb.hum(), x + (dispModel ? 4 : 0), y, 8, 10);
        let pr = weather?.prec[s] ? weather.prec[s].toString() : '0';
        if(config.weather.provider === 0) pr += (pr === '0' ? i18n.t('units.mm') : '');
        if(config.weather.provider === 2) pr += '%';
        printText(ctx, x + 8, y + 2, 28, font, pr, font, 'center', TEXT_COLOR, BG_COLOR);
    }
}