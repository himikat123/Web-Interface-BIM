import store from '../redux/store';
import { iSequence } from "../interfaces";
import { lcdGetTempSequence } from './lcdGetTemp';
import { lcdGetHumSequence } from './lcdGetHum';

export default function lcdGetSequence(prevSequence: iSequence | undefined): iSequence {
    const config = store.getState().config;
    const sequence: iSequence = {
        descript: prevSequence?.descript ?? '',
        temp: prevSequence?.temp ?? 0,
        hum: prevSequence?.hum ?? 0,
        slot: prevSequence?.slot ?? 0,
        counter: prevSequence?.counter ?? 0
    }

    if(sequence.counter <= (config.display.source.sequence.dur - 1) * 2) sequence.counter++;
    else {
        for(let i=0; i<4; i++) {
            if(config.display.source.sequence.name[sequence.slot] === "") {
                if(sequence.slot < 3) sequence.slot++;
                else sequence.slot = 0;
            }
            else i = 4;
        }
        sequence.counter = 0;
        sequence.temp = lcdGetTempSequence(sequence.slot);
        sequence.hum = lcdGetHumSequence(sequence.slot);
        sequence.descript = config.display.source.sequence.name[sequence.slot];
        if(sequence.slot < 3) sequence.slot++;
        else sequence.slot = 0;
    }

    return sequence;
}