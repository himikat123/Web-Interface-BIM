import store from "./redux/store";
import axios from "axios";
import moment from "moment";
import device from "./device";
import { setHistoryState, setHistoryUpdated } from "./redux/slices/history";
import { iOpenweathermapHourly } from "./interfaces";
import { iOpenMeteoHourly } from "./interfaces";
import { setHourlyState, setHourlyUpdated } from "./redux/slices/hourly";

export function hourlyFetch(apMode: boolean) {
    const config = store.getState().config;

    if(!apMode && device() === 'WeatherMonitorBIM32') {
        /* openweathermap */
        if(config.weather.provider === 0) {
            if(config.weather.citysearch < 2 && config.display.type && config.display.type[0] === 1) {
                let url = "https://api.openweathermap.org/data/2.5/weather?appid=" + config.weather.appid[0];
                if(config.weather.citysearch === 0) url += "&q=" + config.weather.city;
                if(config.weather.citysearch === 1) url += "&id=" + config.weather.cityid;
                axios(url).then(res => {
                    openweathermap(res.data.coord.lat, res.data.coord.lon, config.weather.appid[0]);
                    store.dispatch(setHistoryState(res.data));
                    store.dispatch(setHistoryUpdated(moment().unix()));
                })
                .catch(err => {
                    console.error(err);
                    store.dispatch(setHistoryUpdated(0));
                });
            }
            else {
                openweathermap(config.weather.lat, config.weather.lon, config.weather.appid[0]);
            }
        }

        /* open-meteo */
        if(config.weather.provider === 2) {
            openmeteo(config.weather.lat, config.weather.lon);
        }
    }
}

function openweathermap(lat: number, lon: number, appid: string) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`;
    axios(url).then(res => {
        const json: iOpenweathermapHourly = res.data;
        const dates: number[] = []; 
        const icons: number[] = []; 
        const temps: number[] = []; 
        const press: number[] = [];
        const wSpeeds: number[] = [];
        const wDirs: number[] = [];
        const precs: number[] = [];

        for(let i=0; i<40; i++) {
            dates.push(moment(json.list[i].dt_txt, 'YYYY-MM-DD hh:mm:ss').utc().unix());
            icons.push(parseInt(json.list[i].weather[0].icon));
            temps.push(json.list[i].main.temp);
            press.push(json.list[i].main.pressure);
            wSpeeds.push(json.list[i].wind.speed);
            wDirs.push(json.list[i].wind.deg);
            if(json.list[i].rain) precs.push(json.list[i].rain['3h']);
            else if(json.list[i].snow) precs.push(json.list[i].snow['3h']);
            else precs.push(0);
        }
        store.dispatch(setHourlyState({
            date: dates,
            icon: icons,
            temp: temps,
            pres: press,
            windSpeed: wSpeeds,
            windDir: wDirs,
            prec: precs
        }));
        store.dispatch(setHourlyUpdated(moment().unix()));
    })
    .catch(err => {
        console.error(err);
        store.dispatch(setHourlyUpdated(0));
    });
}

function openmeteo(lat: number, lon: number) {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`;
    url += '&hourly=temperature_2m,precipitation_probability,weather_code,surface_pressure,wind_speed_10m,';
    url += 'wind_direction_10m&wind_speed_unit=ms&timeformat=unixtime&timezone=auto&forecast_days=6';
    axios(url).then(res => {
        const json: iOpenMeteoHourly = res.data;
        const dates: number[] = []; 
        const icons: number[] = []; 
        const temps: number[] = []; 
        const press: number[] = [];
        const wSpeeds: number[] = [];
        const wDirs: number[] = [];
        const precs: number[] = [];
        let n = 0;

        for(let i=0; i<144; i++) {
            const time = json.hourly.time[i];
            const utc = json.utc_offset_seconds;
            const hr = moment.unix(time + utc).hour();
            if(hr % 3 === 0 && (time + utc) > moment().unix()) {
                dates.push(json.hourly.time[i] + utc);
                temps.push(json.hourly.temperature_2m[i]);
                press.push(json.hourly.surface_pressure[i]);
                wSpeeds.push(json.hourly.wind_speed_10m[i]);
                wDirs.push(json.hourly.wind_direction_10m[i]);
                precs.push(json.hourly.precipitation_probability[i]);
                icons.push(openMeteoIcon(json.hourly.weather_code[i]));
                if(n<39) n++;
                else break;
            }
        }
        store.dispatch(setHourlyState({
            date: dates,
            icon: icons,
            temp: temps,
            pres: press,
            windSpeed: wSpeeds,
            windDir: wDirs,
            prec: precs
        }));
        store.dispatch(setHourlyUpdated(moment().unix()));
    })
    .catch(err => {
        console.error(err);
        store.dispatch(setHourlyUpdated(0));
    });
}

function openMeteoIcon(code: number): number {
    switch(code) {
        case 0: case 1: return 1;
        case 2: return 2;
        case 3:	return 4;
        case 45: case 48: return 50;
        case 51: case 53: case 55: case 56: case 57: return 10;
        case 61: case 63: case 65: case 66: case 67: case 80: case 81: case 82: return 9;
        case 71: case 73: case 75: case 77: case 85: case 86: return 13;
        case 95: case 96: case 99: return 11;
        default: return 1;
    }
}