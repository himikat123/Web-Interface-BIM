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

    const row1_3 = <>
        <CardDisplayBrightness num={0} />
        <CardDisplayTemperatureIn />
        <CardDisplayHumidityIn />
    </>

    const row2_3 = <>
        <CardDisplayVoltage />
        <CardDisplayBatLevel />
        <CardDisplayComfort />
    </>

    const row3_3 = <>
        <CardDisplayTemperatureOut />
        <CardDisplayHumidityOut />
        <CardDisplayPressureOut />
    </>

    const row1_4 = <>
        <CardDisplayType num={0} />
        <CardDisplayBrightness num={0} />
        <CardDisplayAutoOff num={0} />
        <CardDisplayAnimation num={0} />
    </>

    const row2_4 = <>
        {config.display.type[0] === 1 && <>
            <CardDisplayTemperatureIn />
            <CardDisplayHumidityIn />
            <CardDisplayVoltage />
            <CardDisplayBatLevel />
        </>}
        {config.display.type[0] >= 2 && [...Array(4)].map((x, i) => <CardDisplayTimeSlot key={i} slot={i} num={0} />)}
    </>

    const row3_4 = <>
        {config.display.type[0] === 1 && <>
            <CardDisplayTemperatureOut />
            <CardDisplayHumidityOut />
            <CardDisplayPressureOut />
            <CardDisplayComfort />
        </>}
        {config.display.type[0] >= 2 && [...Array(4)].map((x, i) => <CardDisplayTimeSlot key={i} slot={i + 4} num={0} />)}
    </>

    return device() === 'WeatherMonitorBIM' 
        ? <ThreeColumns navbar={true}
            header={[i18n.t('display.singular')]}
            content={[row1_3, row2_3, row3_3]}
            buttons={['save', 'reset']}
        />
        : <FourColumns navbar={true}
            header={[i18n.t('display.singular') + ' 1']} 
            content={[row1_4, row2_4, row3_4]}
            buttons={['save', 'reset']} 
        />
}