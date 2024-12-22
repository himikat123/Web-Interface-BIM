import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import HistoryChart from "../../molecules/history/historyChart";
import HistorySensorPres from "../../molecules/history/historySensorPres";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import ThingspeakFields from "../../molecules/thingspeak/thingspeakFields";
import { iCardHistory } from "../../interfaces";
import Wsensor from '../../atoms/indications/wsensor';

export default function CardHistoryPres(props: iCardHistory) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const wsensorIndications = [`(${Wsensor()[0].pres})`, `(${Wsensor()[1].pres})`];

    return <Card content={<div className="thchart">
        {/* History Chart */}
        <HistoryChart num={props.type}
            chartColor={'FF00FF'}
            title={props.title}
        />
    
        {/* Sensor type */}
        <div className="mt-8">
            <HistorySensorPres num={props.type}
                label={props.title}
                value={config.history?.fields ? config.history.fields[props.type] : 0}
                onChange={val => dispatch(cf.historyFieldsChange({ num: props.type, val: val }))}
            />
        </div>

        {/* Wireless Sensor Number */}
        {(config.history?.fields ? config.history.fields[props.type] : 0) === 2 && <div className="mt-8">
            <WsensorNumber indications={wsensorIndications}
                value={config.history?.wSensors ? config.history.wSensors[props.type] : 0}
                changeValue={val => dispatch(cf.historyWsensorsChange({ num: props.type, val: val }))}
            />
        </div>}

        {/* Thingspeak */}
        {(config.history?.fields ? config.history.fields[props.type] : 0) === 3 && <div className="mt-8">
            <ThingspeakFields value={config.history?.tFields ? config.history.tFields[props.type] : 0}
                changeValue={val => dispatch(cf.historyTfieldsChange({ num: props.type, val: val }))}
            />
        </div>}
    </div>} />
}