import store from "../../redux/store";

export default function displayLength(dispNum: number, leng = 1) {
    const config = store.getState().config;
    const dModel = config.display.model[dispNum];
    const dType = config.display.type ? config.display.type[dispNum] : 0;
    const length = [4, 6, 8];
    let lg = 0;

    if(dType === 2) // Neopixel 
        lg = dModel < 3 ? 0 : 1;
    if(dType === 3) // 7 Segment 
        lg = (dModel === 0 || dModel === 2) ? 0 : (dModel === 1 || dModel === 3) ? 1 : 2;
    if(dType === 4) // Numitron
        lg = dModel === 0 ? 0 : dModel === 1 ? 1 : 2;
    if(dType === 5) // VFD
        lg = dModel === 0 ? 0 : dModel === 1 ? 1 : 2;

    if(leng) return length[lg];
    else return lg;
}