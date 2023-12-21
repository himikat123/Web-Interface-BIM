import React, { useEffect, useState} from "react";
import ThreeColumns from "../templates/threeColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import Button from "../atoms/button";
import SelectSwitch from "../atoms/selectSwitch";
import TextInput from "../atoms/textInput";
import NumberInput from "../atoms/numberInput";
import WeatherChecker from "../molecules/weatherChecker";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

const Weather = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const content = <>
        <Card content={<>
            <SelectSwitch label={i18n.t('weatherForecastSource')}
                options={['openweathermap.org', 'weatherbit.io']}
                value={config.weather.provider}
                onChange={(val: number) => dispatch(cf.WeatherProwiderChange(val))}
            />
            
            <div className="my-8">
                <TextInput label={"API KEY"} 
                    value={config.weather.appid[config.weather.provider]}
                    maxLength={32}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(cf.WeatherAppIdChange({
                        val: e.target.value.trim(), 
                        num: config.weather.provider
                    }))}
                />
            </div>

            <div className="my-8">
                <TextInput label={i18n.t('parsingServer')} 
                    value={config.weather.parsingServer}
                    maxLength={127}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(cf.WeatherParsingServerChange(e.target.value.trim()))}
                />
            </div>
        </>} />

        <Card content={<>
            <SelectSwitch label={i18n.t('cityIdentification')}
                options={[i18n.t('byCityName'), i18n.t('byCityId'), i18n.t('byCoordinates')]}
                value={config.weather.citysearch}
                onChange={(val: number) => dispatch(cf.WeatherCitySearchChange(val))}
            />
            
            {config.weather.citysearch === 0 && <div className="my-8">
                <TextInput label={i18n.t('cityName')} 
                    value={config.weather.city}
                    maxLength={40}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(cf.WeatherCityChange(e.target.value.trim()))}
                />
            </div>}

            {config.weather.citysearch === 1 && <div className="my-8">
                <NumberInput value={config.weather.cityid}
                    min={0}
                    max={4000000000}
                    label={i18n.t('cityIdNumber')}
                    onChange={val => dispatch(cf.WeatherCityIdChange(val))}
                />

                <div className="my-8" />
                <Button className="bg-green-600 hover:bg-green-700 text-text_dark"
                    label={i18n.t('cityIdSearchProgram')}
                    onClick={() => window.open(
                        "https://github.com/himikat123/Weather-monitor-BIM32/blob/master/CityID_RU.zip?raw=true", 
                        "_blank", 
                        "noreferrer"
                    )}
                />
            </div>}

            {config.weather.citysearch === 2 && <div className="my-8">
                <NumberInput value={config.weather.lat}
                    min={-90}
                    max={90}
                    label={i18n.t('latitude')}
                    onChange={val => dispatch(cf.WeatherLatChange(val))}
                />

                <div className="my-8" />
                <NumberInput value={config.weather.lon}
                    min={-180}
                    max={180}
                    label={i18n.t('longitude')}
                    onChange={val => dispatch(cf.WeatherLonChange(val))}
                />
            </div>}
        </>} />

        <Card content={<WeatherChecker />} />
    </>;

    return <>
        <ThreeColumns navbar={true}
            header={[i18n.t('weatherForecast')]} 
            content={[content]} 
            buttons={['save', 'reset']} 
        />
    </>
}

export default Weather;