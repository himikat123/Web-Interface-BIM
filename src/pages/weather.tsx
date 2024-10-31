import ThreeColumns from "../templates/threeColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import Button from "../atoms/button";
import SelectSwitch from "../atoms/selectSwitch";
import TextInput from "../atoms/textInput";
import NumberInput from "../atoms/numberInput";
import WeatherChecker from "../molecules/weather/weatherChecker";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import device from "../device";
import { useEffect, useState } from "react";

export default function Weather() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const [disabled, setDisabled] = useState([false, false, false]);
    const providers = ['openweathermap.org', 'weatherbit.io', 'open-meteo.com'];
    const providersDisabled = device() === 'WeatherMonitorBIM' ? [1, 0, 0] : [0, 0, 0];

    useEffect(() => {
        setDisabled([config.weather.provider > 1, config.weather.provider > 0, false]);
    }, [config.weather.provider]);

    const content = <>
        <Card content={<>
            <SelectSwitch label={i18n.t('weatherForecastSource')}
                options={providers}
                value={config.weather.provider}
                onChange={val => {
                    dispatch(cf.weatherProwiderChange(val));
                    dispatch(cf.weatherCitySearchChange(2));
                }}
                disabled={providersDisabled}
            />

            {config.weather.provider < 2 && <div className="my-8">
                <TextInput label={"API KEY"} 
                    value={config.weather.appid[config.weather.provider]}
                    maxLength={32}
                    onChange={val => dispatch(cf.weatherAppIdChange({
                        val: val.target.value.trim(), 
                        num: config.weather.provider
                    }))}
                />
            </div>}
        </>} />

        <Card content={<>
            <SelectSwitch label={i18n.t('cityIdentification')}
                options={[i18n.t('byCityName'), i18n.t('byCityId'), i18n.t('byCoordinates')]}
                disabled={disabled}
                value={config.weather.citysearch}
                onChange={val => dispatch(cf.weatherCitySearchChange(val))}
            />
            
            {config.weather.citysearch === 0 && <div className="my-8">
                <TextInput label={i18n.t('cityName')} 
                    value={config.weather.city}
                    maxLength={40}
                    onChange={val => dispatch(cf.weatherCityChange(val.target.value.trim()))}
                />
            </div>}

            {config.weather.citysearch === 1 && <div className="my-8">
                <NumberInput value={config.weather.cityid}
                    min={0}
                    max={4000000000}
                    label={i18n.t('cityIdNumber')}
                    onChange={val => dispatch(cf.weatherCityIdChange(val))}
                />

                <div className="my-8" />
                <div className="text-center">
                    <Button className="bg-green-600 hover:bg-green-700 text-text_dark"
                        label={i18n.t('cityIdSearchProgram')}
                        onClick={() => window.open(
                            "https://himikat123.github.io/City_ID_Finder/", 
                            "_blank", 
                            "noreferrer"
                        )}
                    />
                </div>
            </div>}

            {config.weather.citysearch === 2 && <div className="my-8">
                <NumberInput value={config.weather.lat}
                    min={-90}
                    max={90}
                    step={0.000001}
                    label={i18n.t('latitude')}
                    onChange={val => dispatch(cf.weatherLatChange(val))}
                />

                <div className="my-8" />
                <NumberInput value={config.weather.lon}
                    min={-180}
                    max={180}
                    step={0.000001}
                    label={i18n.t('longitude')}
                    onChange={val => dispatch(cf.weatherLonChange(val))}
                />
            </div>}
        </>} />

        <Card content={<WeatherChecker />} />
    </>;

    return <ThreeColumns navbar={true}
        header={[i18n.t('weatherForecast')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}