import store from "../redux/store";
import { iHourlyWeather, iHistoryOut } from "../interfaces";
import moment from "moment";

export function displayLcdGetHistoryIn(): iHourlyWeather {
    const config = store.getState().config;
    let history: iHourlyWeather = {
        updated: 0,
        date: [],
        icon: [],
        temp: [],
        hum: [],
        pres: [],
        windSpeed: [],
        windDir: [],
        prec: []
    }

    let url = `https://api.thingspeak.com/channels/${config.history.channelID}`;
    url += `/feeds.json?api_key=${config.history.rdkey}&results=24`;
    fetch(url)
    .then(response => response.json())
    .then((json: iHistoryOut) => {
        try {
            for(let i=0; i<24; i++) {
                history.date[i] = moment(json.feeds[i].created_at).unix();
                history.temp[i] = parseFloat(json.feeds[i].field4);
                history.hum[i] = parseFloat(json.feeds[i].field5);
            }
            history.updated = moment().unix();
        }
        catch(e) { console.error(e); }
    })
    .catch(err => console.error(err));

    return history;
}