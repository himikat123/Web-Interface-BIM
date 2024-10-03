import i18n from '../i18n/main';
import Moment from 'react-moment';
import { getLocale } from '../atoms/getLocale';
import { useSelector } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as vl from "../atoms/validateValues";

export default function ThingReceiveDataDate() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    
    return <div className="table-row">
        <div className="table-cell">
            {i18n.t('dataFrom')}:
        </div>

        <div className={"table-cell ps-1 " + (vl.ThingspeakDataRelevance() 
            ? "text-blue-700 dark:text-blue-400" 
            : "text-red-700 dark:text-red-400"
        )}>
            {(data.thing?.time && data.thing.time > 0) ? <>
            {}
                <Moment unix format="HH:mm:ss DD.MM.YYYY">
                    {data.thing.time + new Date().getTimezoneOffset() * 60}
                </Moment> (
                    {(config.lang === 'de' || config.lang === 'bg') && i18n.t('ago') + ' '}
                    <Moment locale={getLocale()} unix fromNow ago>
                        {data.thing.time + new Date().getTimezoneOffset() * 60}
                    </Moment>
                    {(config.lang !== 'de' && config.lang !== 'bg') && ' ' + i18n.t('ago')}
                ) {!vl.ThingspeakDataRelevance() && <> - {i18n.t('dataExpired')}</>}
            </> : '--'}
        </div>
    </div>
}