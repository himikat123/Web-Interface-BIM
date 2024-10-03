import store from '../../redux/store';
import { printText, fillRect } from '../../atoms/canvas/primitives';
import lcdCloseButton from '../../atoms/canvas/lcdCloseButton';
import lcdColors from '../../atoms/canvas/lcdColors';
import i18n from '../../i18n/main';
import { iLcdNetworkState } from '../../interfaces';

export function displayLcdNetworkScreen(ctx: CanvasRenderingContext2D, 
    dispModel: number, state: iLcdNetworkState | undefined
): iLcdNetworkState {
    const color = lcdColors();
    const x = dispModel ? 160 : 174;
    const y = dispModel ? 2 : 0;
    const sl = dispModel ? 6 : 12;
    const sr = x + sl;
    const w = dispModel ? 150 : 164;
    const font = dispModel ? 16 : 18;

    if(!state?.skeleton) {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, color.BG);
        lcdCloseButton(ctx, dispModel);
        fillRect(ctx, dispModel ? 48 : 65, 10, 226, 39, color.FRAME1);
        fillRect(ctx, dispModel ? 50 : 67, 12, 222, 35, color.GROUND);
        printText(ctx, dispModel ? 50 : 67, 17, 222, 28, 'WiFi', 32, 'center', color.TEXT, color.GROUND);

        for(let i=0; i<2; i++) {
            for(let k=0; k<6; k++) {
                fillRect(ctx, i * x + (dispModel ? 4 : 10), k * 30 + 60, (dispModel ? 154 : 168), 24, color.FRAME1);
                fillRect(ctx, i * x + sl, k * 30 + 62, w, 20, color.GROUND);
            }
        }
        printText(ctx, sl, 64 + y, w, font, i18n.t('network'), font, 'center', color.TEXT, color.GROUND);
        printText(ctx, sl, 94 + y, w, font, i18n.t('signalStrength'), font, 'center', color.TEXT, color.GROUND);
        printText(ctx, sl, 124 + y, w, font, i18n.t('ipAddress'), font, 'center', color.TEXT, color.GROUND);
        printText(ctx, sl, 154 + y, w, font, i18n.t('macAddress'), font, 'center', color.TEXT, color.GROUND);
        printText(ctx, sl, 185 + y, w, 14, i18n.t('esp32Temp'), 14, 'center', color.TEXT, color.GROUND);
        printText(ctx, sl, 214 + y, w, font, i18n.t('firmware').substring(0, 15), font, 'center', color.TEXT, color.GROUND);
    }

    const ssid = store.getState().data.network.ssid;
    const rssi = store.getState().data.network.sig;
    const ip = store.getState().data.network.ip;
    const mac = store.getState().data.network.mac;
    const esp32Temp = store.getState().data.esp32.temp;
    const fw = store.getState().data.fw;

    if(ssid !== state?.ssid) printText(ctx, sr, 64 + y, w, font, ssid.substring(0, 16), font, 'center', color.TEXT, color.GROUND);
    if(rssi !== state?.rssi) printText(ctx, sr, 94 + y, w, font, rssi + 'dBm', font, 'center', color.TEXT, color.GROUND);
    if(ip !== state?.ip) printText(ctx, sr, 124 + y, w, font, ip, font, 'center', color.TEXT, color.GROUND);
    if(mac !== state?.mac) printText(ctx, sr, 154 + y, w, font, mac, font, 'center', color.TEXT, color.GROUND);
    if(esp32Temp !== state?.tempESP32) printText(ctx, sr, 184 + y, w, font, esp32Temp.toFixed() + '°C', font, 'center', color.TEXT, color.GROUND);
    if(fw !== state?.fw) printText(ctx, sr, 214 + y, w, font, fw, font, 'center', color.TEXT, color.GROUND);

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