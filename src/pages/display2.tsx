import { useSelector } from 'react-redux';
import FourColumns from "../templates/fourColumns";
import i18n from '../i18n/main';
import CardDisplayType from "../organisms/display/cardDisplayType";
import CardDisplayBrightness from "../organisms/display/cardDisplayBrightness";
import CardDisplayAutoOff from "../organisms/display/cardDisplayAutoOff";
import CardDisplayAnimation from "../organisms/display/cardDisplayAnimation";
import CardDisplayTimeSlot from "../organisms/display/cardDisplayTimeSlot";
import { iConfig } from "../redux/configTypes";

export default function Display2() {
    const config = useSelector((state: iConfig) => state.config);

    const row1 = <>
        <CardDisplayType num={1} />
        <CardDisplayBrightness num={1} />
        <CardDisplayAutoOff num={1} />
        <CardDisplayAnimation num={1} />
    </>

    const row2 = <>
        {config.display.type && config.display.type[1] >= 2 && 
            [...Array(4)].map((x, i) => <CardDisplayTimeSlot key={i} slot={i} num={1} />)
        }
    </>

    const row3 = <>
        {config.display.type && config.display.type[1] >= 2 && 
            [...Array(4)].map((x, i) => <CardDisplayTimeSlot key={i} slot={i + 4} num={1} />)
        }
    </>

    return <FourColumns navbar={true}
        header={[i18n.t('display.singular') + " 2"]} 
        content={[row1, row2, row3]} 
        buttons={['save', 'reset']} 
    />
}