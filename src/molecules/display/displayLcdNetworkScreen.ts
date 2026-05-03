import store from '../../redux/store';
import { printText, fillRect } from '../../atoms/canvas/primitives';
import lcdCloseButton from '../../atoms/canvas/lcdCloseButton';
import lcdColors from '../../atoms/canvas/lcdColors';
import i18n from '../../i18n/main';
import { iLcdNetworkState } from '../../interfaces';
import { validateTemperature } from '../../atoms/validateValues';
import * as D from './displayTypes';

export function displayLcdNetworkScreen(ctx: CanvasRenderingContext2D, 
    dispModel: number, state: iLcdNetworkState | undefined
): iLcdNetworkState {
    const color = lcdColors();
    let x1 = 100, x2 = 25, y1 = 30, y2 = 100, w1 = 300, w2 = 206, c = 6, 
        g = 12, h1 = 52, h2 = 24, f1 = 48, f2 = 20, f3 = 14;
    switch(dispModel) {
        case D.NX4827K043: 
            x1 = 86; x2 = 25; y1 = 4; y2 = 73; w1 = 300; w2 = 207; c = 6;
            g = 12; h1 = 52; h2 = 22; f1 = 40; f2 = 18; f3 = 14; 
            break;
        case D.ILI9341: 
            x1 = 48; x2 = 6; y1 = 2; y2 = 53; w1 = 222; w2 = 146; c = 0;
            g = 8; h1 = 35; h2 = 23; f1 = 29; f2 = 14; f3 = 14; 
            break;
    }

    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, color.BG);
        lcdCloseButton(ctx, dispModel);
        fillRect(ctx, x1, y1, w1 + 4, h1 + 4, color.FRAME1);
        fillRect(ctx, x1 + 2, y1 + 2, w1, h1, color.GROUND);
        printText(ctx, x1 + 2, y1 + (h1 / 2 - f1 / 2) + 6, w1, f1 - 2, 'WiFi', f1, 'center', color.TEXT, color.GROUND);

        for(let i=0; i<2; i++) {
            for(let k=0; k<6; k++) {
                const x = i * w2 + g * i + x2;
                const y = k * h2 + g * k + y2;
                fillRect(ctx, x, y, w2 + 4, h2 + 4, color.FRAME1);
                fillRect(ctx, x + 2, y + 2, w2, h2, color.GROUND);
            }
        }
        printText(ctx, x2 + 2, y2 + g - c, w2 - 4, f2, i18n.t('network'), f2, 'center', color.TEXT, color.GROUND);
        printText(ctx, x2 + 2, y2 + g * 2 + h2 - c, w2 - 4, f2, i18n.t('signalStrength'), f2, 'center', color.TEXT, color.GROUND);
        printText(ctx, x2 + 2, y2 + g * 3 + h2 * 2 - c, w2 - 4, f2, i18n.t('ipAddress'), f2, 'center', color.TEXT, color.GROUND);
        printText(ctx, x2 + 2, y2 + g * 4 + h2 * 3 - c, w2 - 4, f2, i18n.t('macAddress'), f2, 'center', color.TEXT, color.GROUND);
        printText(ctx, x2 + 2, y2 + g * 5 + h2 * 4 - c / 2, w2 - 4, f3, i18n.t('esp32Temp'), f3, 'center', color.TEXT, color.GROUND);
        printText(ctx, x2 + 2, y2 + g * 6 + h2 * 5 - c, w2 - 4, f2, i18n.t('firmware').substring(0, 15), f2, 'center', color.TEXT, color.GROUND);
    }

    const data = store.getState().data;
    const config = store.getState().config;
    const ssid = data.network.ssid;
    const rssi = data.network.sig;
    const ip = data.network.ip;
    const mac = data.network.mac;
    const temp = (data.esp32?.temp ?? 40400) + (config.sensors.esp32?.t ?? 0);
    const esp32Temp = Math.round(temp);
    const units = '°C';
    const fw = store.getState().data.fw;

    if(ssid !== state?.ssid) printText(ctx, x2 + 2 + g + w2, y2 + g - c, w2 - 4, f2, ssid.substring(0, 16), f2, 'center', color.TEXT, color.GROUND);
    if(rssi !== state?.rssi) printText(ctx, x2 + 2 + g + w2, y2 + g * 2 + h2 - c, w2 - 4, f2, rssi + 'dBm', f2, 'center', color.TEXT, color.GROUND);
    if(ip !== state?.ip) printText(ctx, x2 + 2 + g + w2, y2 + g * 3 + h2 * 2 - c, w2 - 4, f2, ip, f2, 'center', color.TEXT, color.GROUND);
    if(mac !== state?.mac) printText(ctx, x2 + 2 + g + w2, y2 + g * 4 + h2 * 3 - c, w2 - 4, f2, mac, f2, 'center', color.TEXT, color.GROUND);
    if(esp32Temp !== state?.tempESP32) printText(ctx, x2 + 2 + g + w2, y2 + g * 5 + h2 * 4 - c, w2 - 4, f2, (validateTemperature(temp) ? esp32Temp : '--') + units, f2, 'center', color.TEXT, color.GROUND);
    if(fw !== state?.fw) printText(ctx, x2 + 2 + g + w2, y2 + g * 6 + h2 * 5 - c, w2 - 4, f2, fw, f2, 'center', color.TEXT, color.GROUND);

    const prevState: iLcdNetworkState = {
        skeleton: true,
        ssid: ssid,
        rssi: rssi,
        ip: ip,
        mac: mac,
        tempESP32: esp32Temp,
        fw: fw
    };

    return prevState;
}