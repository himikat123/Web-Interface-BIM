import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import SelectSwitch from "../../atoms/selectSwitch";
import TimeInput from "../../atoms/timeInput";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function CardSoundHourlySignal() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const hourlySignal = [i18n.t('alwaysOn'), i18n.t('alwaysOff'), i18n.t('onFromDawnToDusk'), i18n.t('enabledByTime')];

    return <Card content={<>
        <SelectSwitch label={i18n.t('hourlySignal')}
            options={hourlySignal}
            value={config.sound.hourly}
            onChange={val => dispatch(cf.soundHourlyChange(val))}
        />

        {config.sound.hourly === 3 && <div className="mt-8 flex">
            <TimeInput value={('0' + String(config.sound.hour.from)).slice(-2) + ':00'} 
                step={3600}
                label={i18n.t('from')} 
                onChange={val => dispatch(cf.soundHourFromChange(Number(val.split(':')[0])))} 
            />

            <div className="w-4" />

            <TimeInput value={('0' + String(config.sound.hour.to)).slice(-2) + ':00'} 
                step={3600}
                label={i18n.t('to')} 
                onChange={val => dispatch(cf.soundHourToChange(Number(val.split(':')[0])))} 
            />
        </div>}
    </>} />
}