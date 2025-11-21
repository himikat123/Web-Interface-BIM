import type { iSensorAconfig } from "../../redux/configTypes/sensors";
import type { iSensorAdata } from "../../redux/dataTypes/sensors";
import i18n from "../../i18n/main";
import * as vl from "../validateValues";

export default function analog(conf: iSensorAconfig, data: iSensorAdata) {
    return vl.validateAnalogVoltage(data.volt) ? (data.volt + conf.v).toFixed(1) + i18n.t('units.v') : '--';
}