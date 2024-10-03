import FourColumns from "../templates/fourColumns";
import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
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

    const row1 = <>
        <CardDisplayType num={0} />
        <CardDisplayBrightness num={0} />
        <CardDisplayAutoOff num={0} />
        <CardDisplayAnimation num={0} />
    </>

    const row2 = <>
        {config.display.type[0] === 1 && <>
            <CardDisplayTemperatureIn />
            <CardDisplayHumidityIn />
            <CardDisplayVoltage />
            <CardDisplayBatLevel />
        </>}
        {config.display.type[0] >= 2 && [...Array(4)].map((x, i) => <CardDisplayTimeSlot key={i} slot={i} num={0} />)}
    </>

    const row3 = <>
        {config.display.type[0] === 1 && <>
            <CardDisplayTemperatureOut />
            <CardDisplayHumidityOut />
            <CardDisplayPressureOut />
            <CardDisplayComfort />
        </>}
        {config.display.type[0] >= 2 && [...Array(4)].map((x, i) => <CardDisplayTimeSlot key={i} slot={i + 4} num={0} />)}
    </>

    return <FourColumns navbar={true}
        header={[i18n.t('display.singular') + " 1"]} 
        content={[row1, row2, row3]} 
        buttons={['save', 'reset']} 
    />
}