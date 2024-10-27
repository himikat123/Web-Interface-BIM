import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import Card from "../../atoms/card";
import SelectSwitch from "../../atoms/selectSwitch";
import Comfort from "../../atoms/comfort";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function CardDisplayComfort() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const names = config.display.source.sequence.name.filter(name => name !== '').join(', ');
    
    const comforts = [];
    comforts.push("--");
    comforts.push(`${i18n.t('comfortLevel')} (${Comfort() ?? '--'})`);
    if(device() === 'WeatherMonitorBIM32') comforts.push(`${i18n.t('nameSequence')} (${names.length ? names : '--'})`);

    return <Card header={i18n.t('additionalDescription')}
        content={<SelectSwitch label={i18n.t('dataSource.singular')}
            options={comforts}
            value={config.display.source.descr}
            onChange={val => dispatch(cf.displaySourceDescrChange(val))}
        />} 
    />
}