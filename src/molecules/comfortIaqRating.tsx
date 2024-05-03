import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as vl from "../atoms/validateValues";

export default function ComfortIaqRating() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    let iaq = -40400;
    if(config.comfort.iaq.source === 1) iaq = data.bme680.iaq + config.sensors.bme680.i; // IAQ from BME680

    let comfort = i18n.t('cleanAir');
    if(vl.validateIaq(iaq)) {
        if(iaq >= 100) comfort = i18n.t('polutedAir');
        if(iaq >= 200) comfort = i18n.t('havilyPolutedAir');
    }
    else comfort = '--';

    return <div className="mt-6">
        <Indication error={false} value={comfort} />
    </div>
}