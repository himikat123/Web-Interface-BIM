import { useState } from "react";
import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import Button from "../atoms/button";
import { ReactComponent as SpinnerSVG } from '../atoms/icons/spinner.svg';
import { ReactComponent as ArrowWindSVG } from '../atoms/icons/arrowWind.svg';
import { iConfig } from "../redux/configTypes";
import { iWeather } from "../interfaces";
import "./weatherChecker.scss";

export default function WeatherChecker() {
    const [weatherColor, setWeatherColor] = useState<string>('text-blue-700 dark:text-blue-400');
    const [loading, setLoading] = useState<boolean>(false);
    const [descript, setDescript] = useState<string>('--');
    const [temp, setTemp] = useState<string>('--');
    const [hum, setHum] = useState<string>('--');
    const [pres, setPres] = useState<string>('--');
    const [wind, setWind] = useState<string>('--');
    const [windDir, setWindDir] = useState<number>(404);
    const [city, setCity] = useState<string>('--');
    const [lat, setLat] = useState<string>('--');
    const [lon, setLon] = useState<string>('--');

    const config = useSelector((state: iConfig) => state.config);

    const openMeteoCode = (code: number) => {
        switch(code) {
            case 0: return i18n.t('clearSky');
            case 1: return i18n.t('mainlyClear');
            case 2: return i18n.t('partlyCloudy');
            case 3:	return i18n.t('overcast');
            case 45: return i18n.t('fog');
            case 48: return i18n.t('deposRimeFog');
            case 51: case 53: case 55: return i18n.t('drizzle');
            case 56: case 57: return i18n.t('freezingDrizzle');
            case 61: case 63: case 65: return i18n.t('rain');
            case 66: case 67: return i18n.t('freezingRain');
            case 71: case 73: case 75: return i18n.t('snowFall');
            case 77: return i18n.t('snowGrains');
            case 80: case 81: case 82: return i18n.t('rainShowers');
            case 85: case 86: return i18n.t('snowShowers');
            case 95: return i18n.t('thunderstorm');
            case 96: case 99: return i18n.t('thunderstormWithHail');
            default: return "---";
        }
    }

    const weatherCheck = () => {
        setLoading(true);
        let current = '', citysearch = '';

        // from openweathermap.org
        if(config.weather.provider === 0) {
            current = "https://api.openweathermap.org/data/2.5/weather";
            if(config.weather.citysearch === 0) citysearch = `?q=${config.weather.city}`;
            if(config.weather.citysearch === 1) citysearch = `?id=${config.weather.cityid}`;
            if(config.weather.citysearch === 2) citysearch = `?lat=${config.weather.lat}&lon=${config.weather.lon}`;
            current += `${citysearch}&units=metric&appid=${config.weather.appid[0]}`;
            current += `&lang=${config.lang}`;
        }
    
        // from weatherbit.io
        if(config.weather.provider === 1) {
            current = `https://api.weatherbit.io/v2.0/current?key=${config.weather.appid[1]}`;
            if(config.weather.citysearch === 0) citysearch = `&city=${config.weather.city}`;
            if(config.weather.citysearch === 1) citysearch = `&city_id=${config.weather.cityid}`;
            if(config.weather.citysearch === 2) citysearch = `&lat=${config.weather.lat}&lon=${config.weather.lon}`;
            current += `${citysearch}`;
            current += `&lang=${config.lang}`;
        }

        // from open-meteo.com
        if(config.weather.provider === 2) {
            current = 'https://api.open-meteo.com/v1/forecast';
            current += `?latitude=${config.weather.lat}`;
            current += `&longitude=${config.weather.lon}`;
            current += '&current=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_direction_10m,weather_code';
            current += '&wind_speed_unit=ms&timeformat=unixtime&timezone=auto';
        }
        console.log(current);
        fetch(current)
        .then(response => response.json())
        .then((json: iWeather) => {
            setLoading(false);
            try {
                // get data from openweathermap.org
                if(config.weather.provider === 0) {
                    setWeatherColor('text-blue-700 dark:text-blue-400');
                    setTemp(String(json.main.temp) + "°C");
                    setHum(String(json.main.humidity) + "%");
                    setPres(String(Math.round(json.main.pressure * 0.75)) + i18n.t('units.mm'));
                    setWind(String(json.wind.speed) + i18n.t('units.mps'));
                    setWindDir(json.wind.deg);
                    setDescript(json.weather[0].description);
                    setCity(json.name + ', ' + json.sys.country);
                    setLat(String(json.coord.lat));
                    setLon(String(json.coord.lon));
                }
                // get data from weatherbit.io
                if(config.weather.provider === 1) {
                    setWeatherColor('text-blue-700 dark:text-blue-400');
                    setTemp(String(json.data[0].temp) + "°C");
                    setHum(String(Math.round(json.data[0].rh)) + "%");
                    setPres(String(Math.round(json.data[0].pres * 0.75)) + i18n.t('units.mm'));
                    setWind((json.data[0].wind_spd).toFixed(1) + i18n.t('units.mps'));
                    setWindDir(json.data[0].wind_dir);
                    setDescript(json.data[0].weather.description);
                    setCity(json.data[0].city_name + ', ' + json.data[0].country_code);
                    setLat(String(json.data[0].lat));
                    setLon(String(json.data[0].lon));
                }
                // get data from open-meteo.com
                if(config.weather.provider === 2) {
                    setWeatherColor('text-blue-700 dark:text-blue-400');
                    setTemp(String(json.current.temperature_2m) + "°C");
                    setHum(String(Math.round(json.current.relative_humidity_2m)) + "%");
                    setPres(String(Math.round(json.current.pressure_msl * 0.75)) + i18n.t('units.mm'));
                    setWind((json.current.wind_speed_10m).toFixed(1) + i18n.t('units.mps'));
                    setWindDir(json.current.wind_direction_10m);
                    setDescript(openMeteoCode(json.current.weather_code));
                    setCity(json.timezone);
                    setLat(String(json.latitude));
                    setLon(String(json.longitude));
                }
            }
            catch(e) {
                setWeatherColor('text-red-700 dark:text-red-400');
                setTemp('--');
                setHum('--');
                setPres('--');
                setWind('--');
                setWindDir(404);
                setDescript(i18n.t('weatherCheckError'));
                setCity('--');
                setLat('--');
                setLon('--');
            }
        })
        .catch(err => console.error(err));
    }

    return <>
        <div className={"text-center " + weatherColor}>{descript}</div>
        <table className="my-2 mb-8 m-auto table-fixed">
            <tbody>
                <tr>
                    <td className="text-end w-1/2">{i18n.t('temperature')}:</td>
                    <td className={"ps-4 " + weatherColor}>{temp}</td>
                </tr>
                <tr>
                    <td className="text-end">{i18n.t('humidity')}:</td>
                    <td className={"ps-4 " + weatherColor}>{hum}</td>
                </tr>
                <tr>
                    <td className="text-end">{i18n.t('pressure')}:</td>
                    <td className={"ps-4 " + weatherColor}>{pres}</td>
                </tr>
                <tr>
                    <td className="text-end">{i18n.t('wind')}:</td>
                    <td className={"ps-4 flex items-center " + weatherColor}>
                        {wind} 
                        {windDir >= 0 && windDir <= 360 ? <div className="ms-2 w-4 h-4">
                            <ArrowWindSVG style={{fill: weatherColor, transform: `rotate(${90 + windDir}deg)`}} />
                        </div> : null}
                    </td>
                </tr>
                <tr>
                    <td className="text-end">
                        {config.weather.provider < 2 
                            ? i18n.t('city')
                            : i18n.t('timezone')
                        }:
                    </td>
                    <td className={"ps-4 " + weatherColor}>{city}</td>  
                </tr>
                <tr>
                    <td className="text-end">{i18n.t('latitude')}:</td>
                    <td className={"ps-4 " + weatherColor}>{lat}</td>
                </tr>
                <tr>
                    <td className="text-end">{i18n.t('longitude')}:</td>
                    <td className={"ps-4 " + weatherColor}>{lon}</td>
                </tr>
            </tbody>
        </table>

        <div className="w-full flex justify-center">
            <Button className="bg-green-600 hover:bg-green-700 text-text_dark"
                label={<div className="flex justify-center">
                    {i18n.t('check')}
                    {loading && <div className="ms-4 w-6 h-6"><SpinnerSVG /></div>}
                </div>}
                onClick={() => weatherCheck()}
            />
        </div>
    </>
}