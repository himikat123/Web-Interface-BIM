import store from '../redux/store';
import segSymbCodes from './segSymbCodes';

export default function clock() {
    let dispImg = [0, 0, 0, 0];
    const config = store.getState().config;
    const data = store.getState().data;
    const date = new Date(data.time * 1000);
    const hour = date.getHours();
    const hr = config.clock.format ? hour : hour % 12 || 12;
    dispImg[0] = Math.floor(hr < 10 ? segSymbCodes().SYMB_SPACE : hr / 10);
    dispImg[1] = hr % 10;
    dispImg[2] = Math.floor(date.getMinutes() / 10);
    dispImg[3] = date.getMinutes() % 10;

    return dispImg;
}