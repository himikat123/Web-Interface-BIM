import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function BH1750() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        light: vl.validateLight(data.bh1750.light) 
            ? ((data.bh1750.light + config.sensors.bh1750.l).toFixed(2) + i18n.t('units.lux')) 
            : '--'
    }
}