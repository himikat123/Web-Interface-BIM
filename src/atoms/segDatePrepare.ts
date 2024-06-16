import store from '../redux/store';

export default function date() {
    let dispImg = [0, 0, 0, 0];
    const data = store.getState().data;
    const date = new Date(data.time * 1000);
    dispImg[0] = Math.floor(date.getDate() / 10);
    dispImg[1] = date.getDate() % 10;
    dispImg[2] = Math.floor(date.getMonth() / 10);
    dispImg[3] = date.getMonth() % 10;

    return dispImg;
}