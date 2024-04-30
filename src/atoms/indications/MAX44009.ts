import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function MAX44009() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        light: vl.validateLight(data.max44009.light) 
            ? ((data.max44009.light + config.sensors.max44009.l).toFixed(2) + i18n.t('units.lux')) 
            : '--'
    }
}