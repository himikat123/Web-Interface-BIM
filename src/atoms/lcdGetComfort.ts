import store from '../redux/store';

export default function lcdGetComfort(sequence: string): string {
    const config = store.getState().config;
    const data = store.getState().data;
    let descr = '';

    if(config.display.source.descr === 1) {
        descr = data.comfort;
    }
    if(config.display.source.descr === 2) {
        descr = sequence;
    }

    return descr;
}