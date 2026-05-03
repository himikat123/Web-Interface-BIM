import store from "../../redux/store";
import * as D from "../constants/displayTypes";

export default function displayLength(dispNum: number, leng = 1) {
    const config = store.getState().config;
    const dModel = config.display.model[dispNum];
    const dType = config.display.type ? config.display.type[dispNum] : 0;
    const length = [4, 6, 8];
    let lg = 0;

    if(dType === D.PIXEL) // Pixel LEDs
        lg = (dModel === D.WS2812b_4 || dModel === D.SK9822_4) ? 0 : (dModel === D.WS2812b_6 || dModel === D.SK9822_6) ? 1 : 2;
    if(dType === D.SEGMENT) // 7 Segment 
        lg = (dModel === D.TM1637_4 || dModel === D.MAX7219_4) ? 0 : (dModel === D.TM1637_6 || dModel === D.MAX7219_6) ? 1 : 2;
    if(dType === D.NUMITRON) // Numitron
        lg = dModel === 0 ? 0 : dModel === 1 ? 1 : 2;
    if(dType === D.VFD) // VFD
        lg = dModel === 0 ? 0 : dModel === 1 ? 1 : 2;

    if(leng) return length[lg];
    else return lg;
}