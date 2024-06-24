import moment from 'moment';
import store from '../redux/store';
import segSymbCodes from './segSymbCodes';

export default function clock() {
    let dispImg = [0, 0, 0, 0];
    const config = store.getState().config;
    const data = store.getState().data;
    const hour = moment.unix(data.time).utc().hour();
    const hr = config.clock.format ? hour : hour % 12 || 12;
    const mn = moment.unix(data.time).utc().minutes();
    dispImg[0] = Math.floor(hr < 10 ? segSymbCodes().SYMB_SPACE : hr / 10);
    dispImg[1] = hr % 10;
    dispImg[2] = Math.floor(mn / 10);
    dispImg[3] = mn % 10;

    return dispImg;
}