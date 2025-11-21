import type { iSensorLconfig } from "../../redux/configTypes/sensors";
import type { iSensorLdata } from "../../redux/dataTypes/sensors";
import i18n from "../../i18n/main";
import * as vl from "../validateValues";

export default function light(conf: iSensorLconfig, data: iSensorLdata) {
    return  vl.validateLight(data.light) ? (data.light + conf.l).toFixed(1) + i18n.t('units.lux') : '--';
}