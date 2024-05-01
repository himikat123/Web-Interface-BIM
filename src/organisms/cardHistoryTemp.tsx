import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import HistoryChart from "../molecules/historyChart";
import HistorySensorTemp from "../molecules/historySensorTemp";
import WsensorNumber from "../molecules/wsensorNumber";
import WsensorTempNumber from "../molecules/wsensorTempNumber";
import ThingspeakFields from "../molecules/thingspeakFields";
import { iCardHistory } from "../interfaces";

export default function CardHistoryTemp(props: iCardHistory) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={<div className="thchart">
        {/* History Chart */}
        <HistoryChart num={props.type}
            chartColor={'FFCC00'}
            title={props.title}
        />
    
        {/* Sensor type */}
        <div className="mt-8">
            <HistorySensorTemp num={props.type}
                label={props.title}
                value={config.history.fields[props.type]}
                onChange={val => dispatch(cf.historyFieldsChange({ num: props.type, val: val }))}
            />
        </div>

        {/* Wireless Sensor Number */}
        {config.history.fields[props.type] === 2 && <div className="mt-8">
            <WsensorNumber value={config.history.wSensors[props.type]}
                changeValue={val => dispatch(cf.historyWsensorsChange({ num: props.type, val: val }))}
            />
        </div>}

        {/* Wireless Sensor Temperature */}
        {config.history.fields[props.type] === 2 && <div className="mt-8">
            <WsensorTempNumber wSensNum={config.history.wSensors[props.type]}
                value={config.history.wTypes[props.type]}
                changeValue={val => dispatch(cf.historyWtypesChange({ num: props.type, val: val }))}
            />
        </div>}

        {/* Thingspeak */}
        {config.history.fields[props.type] === 3 && <div className="mt-8">
            <ThingspeakFields value={config.history.tFields[props.type]}
                changeValue={val => dispatch(cf.historyTfieldsChange({ num: props.type, val: val }))}
            />
        </div>}
    </div>} />
}