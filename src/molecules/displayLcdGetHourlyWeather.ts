import store from "../redux/store";
import { iHourlyWeather, iOpenweathermapHourly, iOpenMeteoHourly } from "../interfaces";
import moment from "moment";

export function displayLcdGetHourlyWeather(): iHourlyWeather {
    const config = store.getState().config;
    let hourly: iHourlyWeather = {
        updated: 0,
        date: [],
        icon: [],
        temp: [],
        pres: [],
        windSpeed: [],
        windDir: [],
        prec: []
    }

    /* openweathermap */
    if(config.weather.provider === 0) {
        if(config.weather.citysearch < 2) {
            let url = "http://api.openweathermap.org/data/2.5/weather?appid=" + config.weather.appid[0];
            if(config.weather.citysearch === 0) url += "&q=" + config.weather.city;
            if(config.weather.citysearch === 1) url += "&id=" + config.weather.cityid;
            fetch(url)
            .then(response => response.json())
            .then((json: {coord: {lon: number, lat: number}}) => {
                try {
                    hourly = openweathermap(json.coord.lat, json.coord.lon, config.weather.appid[0], hourly);
                }
                catch(e) { console.error(e); }
            })
            .catch(err => console.error(err));
        }
        else {
            hourly = openweathermap(config.weather.lat, config.weather.lon, config.weather.appid[0], hourly);
        }
    }

    /* open-meteo */
    if(config.weather.provider === 2) {
        hourly = openmeteo(config.weather.lat, config.weather.lon, hourly);
    }

    return hourly;
}

function openweathermap(lat: number, lon: number, appid: string, hourly: iHourlyWeather): iHourlyWeather {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then((json: iOpenweathermapHourly) => {
        try {
            for(let i=0; i<40; i++) {
                hourly.date[i] = json.list[i].dt;
                hourly.icon[i] = parseInt(json.list[i].weather[0].icon);
                hourly.temp[i] = json.list[i].main.temp;
                hourly.pres[i] = json.list[i].main.pressure;
                hourly.windSpeed[i] = json.list[i].wind.speed;
                hourly.windDir[i] = json.list[i].wind.deg;
                if(json.list[i].rain) hourly.prec[i] = json.list[i].rain['3h'];
                else if(json.list[i].snow) hourly.prec[i] = json.list[i].snow['3h'];
                else hourly.prec[i] = 0;
            }
            hourly.updated = moment().unix();
        }
        catch(e) { console.error(e); }
    })
    .catch(err => console.error(err));
    return hourly;
}

function openmeteo(lat: number, lon: number, hourly: iHourlyWeather): iHourlyWeather {
    let url = `http://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`;
    url += '&hourly=temperature_2m,precipitation_probability,weather_code,surface_pressure,wind_speed_10m,';
    url += 'wind_direction_10m&wind_speed_unit=ms&timeformat=unixtime&timezone=auto&forecast_days=6';
    fetch(url)
    .then(response => response.json())
    .then((json: iOpenMeteoHourly) => {
        try {
            let n = 0;
            for(let i=0; i<144; i++) {
                const time = json.hourly.time[i];
                const utc = json.utc_offset_seconds;
                const hr = moment.unix(time + utc).hour();
                if(hr % 3 === 0) {
                    hourly.date[n] = json.hourly.time[i] + utc;
                    hourly.temp[n] = json.hourly.temperature_2m[i];
                    hourly.pres[n] = json.hourly.surface_pressure[i];
                    hourly.windSpeed[n] = json.hourly.wind_speed_10m[i];
                    hourly.windDir[n] = json.hourly.wind_direction_10m[i];
                    hourly.prec[n] = json.hourly.precipitation_probability[i];
                    hourly.icon[n] = openMeteoIcon(json.hourly.weather_code[i]);
                    if(n<39) n++;
                    else break;
                }
            }
            hourly.updated = moment().unix();
        }
        catch(e) { console.error(e); }
    })
    .catch(err => console.error(err));
    return hourly;
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