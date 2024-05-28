import i18n from "../i18n/main";
import SelectSwitch from "../atoms/selectSwitch";
import { iWsensTempNum } from "../interfaces";
import Wsensor from "../atoms/indications/wsensor";

export default function WsensorTempNumber(props: iWsensTempNum) {
    let wtemps: string[] = [];
    for(let i=0; i<5; i++) 
        wtemps.push(`${i18n.t('temperature')} ${i} (${Wsensor()[props.wSensNum].temp[i]})`);

    return <div className="mt-8">
        <SelectSwitch label={i18n.t('temperatureSensorNumber')}
            options={wtemps}
            value={props.value}
            onChange={val => props.changeValue(val)}
        />
    </div>
}