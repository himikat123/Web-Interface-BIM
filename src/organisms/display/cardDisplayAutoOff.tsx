import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../../atoms/hostUrl";
import Card from "../../atoms/card";
import NumberInput from "../../atoms/numberInput";
import TimeInput from "../../atoms/timeInput";
import Button from "../../atoms/button";
import Toggle from "../../atoms/toggle";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import { iDisplay } from "../../interfaces";
import { display1ValidChange } from "../../redux/slices/valid";
import * as cf from "../../redux/slices/config";

export default function CardDisplayAutoOff(props: iDisplay) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

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
            {(data.dispState && !data.dispState[props.num]) 
                ? <div className="text-center text-red-500">{i18n.t('display.singular') + ' ' + i18n.t('isOff')}</div> 
                : ''
            }

            <hr className="mt-4 mb-12 border-menu_light dark:border-menu_dark" />

            <Toggle label={i18n.t('turnOffDisplayAtNight')}
                checked={config.display.nightOff ? config.display.nightOff.need[props.num] : 0}
                onChange={() => dispatch(cf.displayNightOffNeedChange({
                    num: props.num, 
                    val: config.display.nightOff ? config.display.nightOff.need[props.num] ? 0 : 1 : 0
                }))} 
            />

            <div className="mt-4">
                <TimeInput value={config.display.nightOff ? config.display.nightOff.from[props.num] : "00:00"} 
                    step={60}
                    label={i18n.t('from')} 
                    onChange={val => dispatch(cf.displayNightOffFromChange({num: props.num, val: val}))} 
                />
            </div>
            <div className="mt-4">
                <TimeInput value={config.display.nightOff ? config.display.nightOff.to[props.num] : '00:00'} 
                    step={60}
                    label={i18n.t('to')} 
                    onChange={val => dispatch(cf.displayNightOffToChange({num: props.num, val: val}))} 
                />
            </div>
        </>} /> : <Card className="invisible lg:visible" content={<></>} />}
    </>
}