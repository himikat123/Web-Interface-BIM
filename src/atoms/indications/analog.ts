import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function Analog() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        volt: vl.validateAnalogVoltage(data.analog.volt) 
            ? ((data.analog.volt + config.sensors.analog.v).toFixed(2) + i18n.t('units.v')) 
            : '--'
    }
}