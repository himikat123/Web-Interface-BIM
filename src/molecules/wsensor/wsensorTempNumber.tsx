import { useSelector } from "react-redux";
import i18n from "../../i18n/main";
import SelectSwitch from "../../atoms/selectSwitch";
import { iWsensTempNum } from "../../interfaces";
import wsensor from "../../atoms/indications/wsensor";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";

export default function WsensorTempNumber(props: iWsensTempNum) {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const wsens = wsensor(config.wsensor, data.wsensor);
    let wtemps: string[] = [];
    for(let i=0; i<5; i++) 
        wtemps.push(`${i18n.t('temperature')} ${i} (${wsens[props.wSensNum].temp[i]})`);

    return <div className="mt-8">
        <SelectSwitch label={i18n.t('temperatureSensorNumber')}
            options={wtemps}
            value={props.value}
            onChange={val => props.changeValue(val)}
        />
    </div>
}