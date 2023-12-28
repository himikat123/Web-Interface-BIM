import React, { useState } from "react";
import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import Button from "../atoms/button";
import { ReactComponent as SpinnerSVG } from '../atoms/icons/spinner.svg';
import { ReactComponent as ArrowWindSVG } from '../atoms/icons/arrowWind.svg';
import { iConfig } from "../redux/configTypes";
import { iWeather } from "../interfaces";
import "./weatherChacker.scss";

const WeatherChecker = () => {
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
        console.log(current);
        fetch(current).then((response) => {
            return response.json();
        }).then((json: iWeather) => {
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
        });
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
                    <td className="text-end">{i18n.t('city')}:</td>
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
    </>;
}

export default WeatherChecker;