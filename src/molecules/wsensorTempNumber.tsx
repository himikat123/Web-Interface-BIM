import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iSelectSensor } from "../interfaces";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as vl from "../atoms/validateValues";

export default function WsensorTempNumber(props: iSelectSensor) {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    let wtemps: string[] = [];
    for(let i=0; i<5; i++) wtemps.push(`${i18n.t('temperature')} ${i} (${vl.WsensorDataRelevance(config.display.source.tempOut.wsensNum) 
        ? vl.validateTemperature(data.wsensor.temp.data[i][config.display.source.tempOut.wsensNum]) 
            ? ((data.wsensor.temp.data[i][config.display.source.tempOut.wsensNum] + config.wsensor.temp.corr[config.display.source.tempOut.wsensNum][i]).toFixed(2) + '°C') 
            : '--' 
        : i18n.t('dataExpired')})`);

    return <div className="mt-8">
        <SelectSwitch label={i18n.t('temperatureSensorNumber')}
            options={wtemps}
            value={props.value}
            onChange={val => props.changeValue(val)}
        />
    </div>
}