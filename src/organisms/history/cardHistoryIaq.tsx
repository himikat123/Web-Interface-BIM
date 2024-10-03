import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import HistoryChart from "../../molecules/history/historyChart";
import HistorySensorIaq from "../../molecules/history/historySensorIaq";
import { iCardHistory } from "../../interfaces";

export default function CardHistoryIaq(props: iCardHistory) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={<div className="thchart">
        {/* History Chart */}
        <HistoryChart num={props.type}
            chartColor={'FF7700'}
            title={props.title}
        />
    
        {/* Sensor type */}
        <div className="mt-8">
            <HistorySensorIaq num={props.type}
                label={props.title}
                value={config.history.fields[props.type]}
                onChange={val => dispatch(cf.historyFieldsChange({ num: props.type, val: val }))}
            />
        </div>
    </div>} />
}