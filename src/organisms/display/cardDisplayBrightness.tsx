import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
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

    return <>
        {config.display.type[props.num] > 0 ? <Card content={ <>
            <SelectSwitch label={i18n.t('displayBrightness')}
                options={brightSources}
                value={config.display.brightMethod[props.num]}
                onChange={val => dispatch(cf.displayBrightMethodChange({num: props.num, val: val}))}
            />

            {/* Brightess at sunrise and sunset */}
            {config.display.brightMethod[props.num] === 0 && <BrightSunriseSunset num={props.num} />}

            {/* Brightess by light sensor */}
            {config.display.brightMethod[props.num] === 1 && <BrightSensor num={props.num} />}

            {/* Brightess over time */}
            {config.display.brightMethod[props.num] === 2 && <BrightTime num={props.num} />}

            {/* Constant brightess */}
            {config.display.brightMethod[props.num] === 3 && <BrightConstant num={props.num} />}
        </>} /> : <Card className="invisible sm:visible" content={<></>} />}
    </>
}