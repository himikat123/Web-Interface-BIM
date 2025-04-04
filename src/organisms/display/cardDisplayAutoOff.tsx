import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../../atoms/hostUrl";
import Card from "../../atoms/card";
import NumberInput from "../../atoms/numberInput";
import TimeInput from "../../atoms/timeInput";
import Button from "../../atoms/button";
import Toggle from "../../atoms/toggle";
import { iConfig } from "../../redux/configTypes";
import { iDisplay } from "../../interfaces";
import { display1ValidChange } from "../../redux/slices/valid";
import * as cf from "../../redux/slices/config";

export default function CardDisplayAutoOff(props: iDisplay) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <>
        {(config.display.type ? (config.display.type[props.num] > 0) : 0) ? <Card content={<>
            <NumberInput value={config.display.autoOff ? config.display.autoOff[props.num] : 0}
                min={0}
                max={1440}
                label={i18n.t('turnOffDisplayWhenIdle')}
                onChange={val => dispatch(cf.displayAutoOffChange({num: props.num, val: val}))}
                isValid={valid => dispatch(display1ValidChange(valid))}
            />
            <div className="mt-1">
                (0 - {i18n.t('neverTurnOff')})
            </div>

            <div className="text-center">
                <Button className="bg-green-600 hover:bg-green-700 text-text_dark"
                    label={i18n.t('turnOnOffNow')}
                    onClick={() => fetch(`${hostUrl()}/esp/dispToggle?num=${props.num}&code=${localStorage.getItem('code') || '0'}`)}
                />
            </div>

            <hr className="mt-4 mb-12 border-menu_light dark:border-menu_dark" />

            <Toggle label={i18n.t('turnOffDisplayAtNight')}
                checked={config.display.nightOff ? config.display.nightOff.need[props.num] : 0}
                onChange={() => dispatch(cf.displayNightOffNeedChange({
                    num: props.num, 
                    val: config.display.nightOff ? config.display.nightOff.need[props.num] ? 0 : 1 : 0
                }))} 
            />

            <div className="mt-4">
                <TimeInput value={('0' + String(config.display.nightOff ? config.display.nightOff.from[props.num] : 0)).slice(-2) + ':00'} 
                    step={3600}
                    label={i18n.t('from')} 
                    onChange={val => dispatch(cf.displayNightOffFromChange({num: props.num, val: Number(val.split(':')[0])}))} 
                />
            </div>
            <div className="mt-4">
                <TimeInput value={('0' + String(config.display.nightOff ? config.display.nightOff.to[props.num] : 0)).slice(-2) + ':00'} 
                    step={3600}
                    label={i18n.t('to')} 
                    onChange={val => dispatch(cf.displayNightOffToChange({num: props.num, val: Number(val.split(':')[0])}))} 
                />
            </div>
        </>} /> : <Card className="invisible lg:visible" content={<></>} />}
    </>
}