import i18n from '../i18n/main';
import { useSelector } from 'react-redux';
import { iData } from "../redux/dataTypes";
import * as vl from "../atoms/validateValues";

export default function ThingReceiveDataTable() {
    const data = useSelector((state: iData) => state.data);
    
    return <>
        <div className="table-row h-2" />
            
        {[...Array(8)].map((x, i) => <div key={i} className="table-row">
            <div className="table-cell">
                {`${i18n.t('field')} ${i + 1}:`}
            </div>

            <div className={"table-cell ps-1 " + (vl.ThingspeakDataRelevance() ? "text-blue-700 dark:text-blue-400" : "text-red-700 dark:text-red-400")}>
                {vl.validateThingspeak(data.thing?.data ? data.thing.data[i] : -40400) ? data.thing?.data ? data.thing?.data[i] : '--' : '--'}
            </div>
        </div>)}
    </>
}