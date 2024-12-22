import FourColumns from "../templates/fourColumns";
import ThreeColumns from "../templates/threeColumns";
import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import device from "../device";
import CardDisplayType from "../organisms/display/cardDisplayType";
import CardDisplayBrightness from "../organisms/display/cardDisplayBrightness";
import CardDisplayAutoOff from "../organisms/display/cardDisplayAutoOff";
import CardDisplayAnimation from "../organisms/display/cardDisplayAnimation";
import CardDisplayTemperatureIn from "../organisms/display/cardDisplayTemperatureIn";
import CardDisplayHumidityIn from "../organisms/display/cardDisplayHumidityIn";
import CardDisplayVoltage from "../organisms/display/cardDisplayVoltage";
import CardDisplayBatLevel from "../organisms/display/cardDisplayBatLevel";
import CardDisplayTemperatureOut from "../organisms/display/cardDisplayTemperatureOut";
import CardDisplayHumidityOut from "../organisms/display/cardDisplayHumidityOut";
import CardDisplayPressureOut from "../organisms/display/cardDisplayPressureOut";
import CardDisplayComfort from "../organisms/display/cardDisplayComfort";
import CardDisplayTimeSlot from "../organisms/display/cardDisplayTimeSlot";
import { iConfig } from "../redux/configTypes";

export default function Display1() {
    const config = useSelector((state: iConfig) => state.config);
    const rows = [];

    if(device() === 'WeatherMonitorBIM') { 
        
        /********* BIM ESP8266 **********/
        rows.push(<>
            <CardDisplayBrightness num={0} />
            <CardDisplayTemperatureIn />
            <CardDisplayHumidityIn />
        </>);

        rows.push(<>
            <CardDisplayVoltage />
            <CardDisplayBatLevel />
            <CardDisplayComfort />
        </>);

        rows.push(<>
            <CardDisplayTemperatureOut />
            <CardDisplayHumidityOut />
            <CardDisplayPressureOut />
        </>);
    }

    else {
        /************ BIM32 ************/
        rows.push(<>
            <CardDisplayType num={0} />
            <CardDisplayBrightness num={0} />
            <CardDisplayAutoOff num={0} />
            <CardDisplayAnimation num={0} />
        </>);

        rows.push(<>
            {config.display.type && config.display.type[0] === 1 && <>
                <CardDisplayTemperatureIn />
                <CardDisplayHumidityIn />
                <CardDisplayVoltage />
                <CardDisplayBatLevel />
            </>}
            {config.display.type && config.display.type[0] >= 2 && 
                [...Array(4)].map((x, i) => <CardDisplayTimeSlot key={i} slot={i} num={0} />)
            }
        </>);

        rows.push(<>
            {config.display.type && config.display.type[0] === 1 && <>
                <CardDisplayTemperatureOut />
                <CardDisplayHumidityOut />
                <CardDisplayPressureOut />
                <CardDisplayComfort />
            </>}
            {config.display.type && config.display.type[0] >= 2 && 
                [...Array(4)].map((x, i) => <CardDisplayTimeSlot key={i} slot={i + 4} num={0} />)
            }
        </>);
    }

    return device() === 'WeatherMonitorBIM' 
        ? <ThreeColumns navbar={true}
            header={[i18n.t('display.singular')]}
            content={rows}
            buttons={['save', 'reset']}
        />
        : <FourColumns navbar={true}
            header={[i18n.t('display.singular') + ' 1']} 
            content={rows}
            buttons={['save', 'reset']} 
        />
}