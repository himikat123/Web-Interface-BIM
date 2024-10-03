import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import HistoryChart from "../../molecules/history/historyChart";
import HistorySensorCo2 from "../../molecules/history/historySensorCo2";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import { iCardHistory } from "../../interfaces";
import Wsensor from '../../atoms/indications/wsensor';

export default function CardHistoryCo2(props: iCardHistory) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const wsensorIndications = [`(${Wsensor()[0].co2})`, `(${Wsensor()[1].co2})`];

    return <Card content={<div className="thchart">
        {/* History Chart */}
        <HistoryChart num={props.type}
            chartColor={'0000FF'}
            title={props.title}
        />
    
        {/* Sensor type */}
        <div className="mt-8">
            <HistorySensorCo2 num={props.type}
                label={<div dangerouslySetInnerHTML={{ __html: props.title }} />}
                value={config.history.fields[props.type]}
                onChange={val => dispatch(cf.historyFieldsChange({ num: props.type, val: val }))}
            />
        </div>

        {/* Wireless Sensor Number */}
        {config.history.fields[props.type] === 1 && <div className="mt-8">
            <WsensorNumber indications={wsensorIndications} 
                value={config.history.wSensors[props.type]}
                changeValue={val => dispatch(cf.historyWsensorsChange({ num: props.type, val: val }))}
            />
        </div>}
    </div>} />
}