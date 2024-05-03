import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as vl from "../atoms/validateValues";

export default function ComfortCo2Rating() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    let co2 = -40400;
    if(config.comfort.co2.source === 1) { // CO2 from Wireless sensor
        co2 = data.wsensor.co2.data[config.comfort.co2.wsensNum] + config.wsensor.co2.corr[config.comfort.co2.wsensNum];
    }

    let comfort = i18n.t('cleanAir');
    if(vl.validateIaq(co2)) {
        if(co2 >= 800) comfort = i18n.t('polutedAir');
        if(co2 >= 1400) comfort = i18n.t('havilyPolutedAir');
    }
    else comfort = '--';

    return <div className="mt-6">
        <Indication error={false} value={comfort} />
    </div>
}