import moment from 'moment';
import store from '../redux/store';

export default function date() {
    let dispImg = [0, 0, 0, 0];
    const data = store.getState().data;
    const dt = moment.unix(data.time).utc().date();
    const mt = moment.unix(data.time).utc().month();
    dispImg[0] = Math.floor(dt / 10);
    dispImg[1] = dt % 10;
    dispImg[2] = Math.floor(mt / 10);
    dispImg[3] = mt % 10;

    return dispImg;
}