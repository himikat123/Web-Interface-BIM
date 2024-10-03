import moment from 'moment';
import store from '../../redux/store';
import segSymbCodes from './segSymbCodes';

export default function clock(sens: number, dispModel: string): number[] {
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const config = store.getState().config;
    const hour = moment().hours();
    const hr = config.clock.format ? hour : hour % 12 || 12;
    const hrH = Math.floor(hr < 10 ? segSymbCodes().SYMB_SPACE : hr / 10);
    const hrL = hr % 10;
    const mn = moment().minutes();
    const mnH = Math.floor(mn / 10);
    const mnL = mn % 10;
    const sc = moment().seconds();
    const scH = Math.floor(sc / 10);
    const scL = sc % 10;

    dispImg[0] = dispModel === '4-dig' ? hrH : sens === 0 ? segSymbCodes().SYMB_SPACE : hrH;
    dispImg[1] = dispModel === '4-dig' ? hrL : sens === 0 ? segSymbCodes().SYMB_SPACE : hrL;
    dispImg[2] = dispModel === '4-dig' ? mnH : sens === 0 ? hrH : mnH;
    dispImg[3] = dispModel === '4-dig' ? mnL : sens === 0 ? hrL : mnL;
    dispImg[4] = dispModel === '4-dig' ? scH : sens === 0 ? mnH : scH;
    dispImg[5] = dispModel === '4-dig' ? scL : sens === 0 ? mnL : scL;

    return dispImg;
}