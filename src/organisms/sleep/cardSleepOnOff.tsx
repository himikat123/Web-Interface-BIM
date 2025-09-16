import i18n from '../../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import Toggle from "../../atoms/toggle";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function CardSleepOnOff() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={
        <Toggle label={i18n.t('useSleep')}
            checked={(config.sleep ?? 0) > 0 ? 1 : 0}
            onChange={() => dispatch(cf.sleepChange((config.sleep ?? 0) > 0 ? 0 : 5))}
        />} 
    />
}