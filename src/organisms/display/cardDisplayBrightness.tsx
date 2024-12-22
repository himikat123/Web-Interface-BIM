import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import BrightSunriseSunset from "../../molecules/bright/brightSunriseSunset";
import BrightSensor from "../../molecules/bright/brightSensor";
import BrightTime from "../../molecules/bright/brightTime";
import BrightConstant from "../../molecules/bright/brightConstant";
import { iConfig } from "../../redux/configTypes";
import { iDisplay } from "../../interfaces";
import * as cf from "../../redux/slices/config";

export default function CardDisplayBrightness(props: iDisplay) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
       
    const brightSources = [
        i18n.t('bySunriseAndSunset'),
        i18n.t('byLightSensor'),
        i18n.t('byTime'),
        i18n.t('constantBrightness')
    ];

    const brightMethod = Array.isArray(config.display.brightMethod)
        ? config.display.brightMethod[props.num]
        : config.display.brightMethod;

    return <>
        {(config.display.type ? config.display.type[props.num] > 0 : true) 
            ? <Card header={device() === 'WeatherMonitorBIM' ? i18n.t('displayBrightness') : ''}
                content={ <>
                    <SelectSwitch label={i18n.t('displayBrightness')}
                        options={brightSources}
                        value={brightMethod}
                        onChange={val => dispatch(cf.displayBrightMethodChange({num: props.num, val: val}))}
                    />

                    {/* Brightess at sunrise and sunset */}
                    {brightMethod === 0 && <BrightSunriseSunset num={props.num} />}

                    {/* Brightess by light sensor */}
                    {brightMethod === 1 && <BrightSensor num={props.num} />}

                    {/* Brightess over time */}
                    {brightMethod === 2 && <BrightTime num={props.num} />}

                    {/* Constant brightess */}
                    {brightMethod === 3 && <BrightConstant num={props.num} />}
                </>} /> 
            : <Card className="invisible sm:visible" content={<></>} />}
    </>
}