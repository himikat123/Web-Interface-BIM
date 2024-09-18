import moment from 'moment';
import store from '../redux/store';
import segSymbCodes from './segSymbCodes';

export default function date(sens: number, dispModel: string): number[] {
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const data = store.getState().data;
    const dt = moment.unix(data.time).utc().date();
    const dtH = Math.floor(dt / 10);
    const dtL = dt % 10;
    const mt = moment.unix(data.time).utc().month() + 1;
    const mtH = Math.floor(mt / 10);
    const mtL = mt % 10;
    const yr = moment.unix(data.time).utc().year() % 100;
    const yrH = Math.floor(yr / 10);
    const yrL = yr % 10;

    dispImg[0] = dispModel === '4-dig' ? dtH : sens === 0 ? segSymbCodes().SYMB_SPACE : dtH;
    dispImg[1] = dispModel === '4-dig' ? dtL : sens === 0 ? segSymbCodes().SYMB_SPACE : dtL;
    dispImg[2] = dispModel === '4-dig' ? mtH : sens === 0 ? dtH : mtH;
    dispImg[3] = dispModel === '4-dig' ? mtL : sens === 0 ? dtL : mtL;
    dispImg[4] = dispModel === '4-dig' ? segSymbCodes().SYMB_SPACE : sens === 0 ? mtH : yrH;
    dispImg[5] = dispModel === '4-dig' ? segSymbCodes().SYMB_SPACE : sens === 0 ? mtL : yrL;

    return dispImg;
}