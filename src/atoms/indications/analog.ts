import { iSensorAconfig } from "../../redux/configTypes";
import { iSensorAdata } from "../../redux/dataTypes";
import i18n from "../../i18n/main";
import * as vl from "../validateValues";

export default function analog(conf: iSensorAconfig, data: iSensorAdata) {
    return vl.validateAnalogVoltage(data.volt) ? (data.volt + conf.v).toFixed(1) + i18n.t('units.v') : '--';
}