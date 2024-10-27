import store from "./redux/store";
import axios from "axios";
import moment from "moment";
import { setHistoryState, setHistoryUpdated } from "./redux/slices/history";

export function historyFetch(apMode: boolean) {
    const config = store.getState().config;

    if(config.history.channelID && config.history.rdkey && config.display.type[0] === 1 && !apMode) {
        let url = `https://api.thingspeak.com/channels/${config.history.channelID}`;
        url += `/feeds.json?api_key=${config.history.rdkey}&results=24`;
        axios(url).then(res => {
            store.dispatch(setHistoryState(res.data));
            store.dispatch(setHistoryUpdated(moment().unix()));
        })
        .catch(err => {
            console.error(err);
            store.dispatch(setHistoryUpdated(0));
        });
    }
}