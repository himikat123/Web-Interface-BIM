import i18n from "../i18n/main";
import moment from "moment";
import 'moment/locale/de';
import 'moment/locale/ru';
import 'moment/locale/pl';
import 'moment/locale/uk';
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import TimeInput from "../atoms/timeInput";
import Toggle from "../atoms/toggle";
import ButtonPlay from "../atoms/buttonPlay";
import ButtonStop from "../atoms/buttonStop";
import { iConfig } from "../redux/configTypes";
import { iAlarms } from "../redux/alarmTypes";
import { iAlarm } from "../interfaces";
import * as cf from "../redux/slices/alarm";

export default function CardAlarm(props: iAlarm) {
    const dispatch = useDispatch();
    const al = useSelector((state: iAlarms) => state.alarm);
    const config = useSelector((state: iConfig) => state.config);
    const locale = config.lang === 'ua' ? 'uk' : config.lang;

    const sendPlay = (track: number) => {
        let url = `${hostUrl()}/esp/mp3play`;
        url += `?folder=2&track=${track}`;
        url += `&code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    return <Card content={<>
        <div className="mt-4">
            <Toggle label={i18n.t('alarm') + ' ' + String(props.num + 1)}
                checked={al.alarm.states[props.num]}
                onChange={() => dispatch(cf.alarmStateChange({num: props.num, val: al.alarm.states[props.num] ? 0 : 1}))} 
            />
        </div>

        {al.alarm.states[props.num] > 0 && <>
            <div className="mt-8">
                <TimeInput value={('0' + al.alarm.time[props.num][0]).slice(-2) + ':' + ('0' + al.alarm.time[props.num][1]).slice(-2)} 
                    step={60}
                    label={i18n.t('time')} 
                    onChange={val => {
                        dispatch(cf.alarmTimeChange({num: props.num, level: 0, val: Number(val.split(':')[0])}));
                        dispatch(cf.alarmTimeChange({num: props.num, level: 1, val: Number(val.split(':')[1])}));
                    }} 
                />
            </div>

            <div className="mt-8 w-full flex justify-around">
                {[...Array(7)].map((x, i) => <div key={'a' + i} className={i > 5 ? 'text-red-500' : ''}>
                    {moment(`${i+1}-01-24`, 'DD-MM-YY').locale(locale).format('dd')}<br />
                    <input type="checkbox" 
                        checked={al.alarm.weekdays[props.num][i] === 1}
                        onChange={() => dispatch(cf.alarmWeekdayChange({num: props.num, weekday: i, val: al.alarm.weekdays[props.num][i] ? 0 : 1}))}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                    />
                </div>)}
            </div>

            <div className="mt-8 flex w-full items-center">
                <SelectSwitch label=''
                    options={[...Array(20)].map((x, i) => `${i18n.t('melody')} ${i + 1}`)}
                    value={al.alarm.melodies[props.num]}
                    onChange={val => dispatch(cf.alarmMelodieChange({num: props.num, val: val}))}
                />

                <ButtonPlay play={() => sendPlay(al.alarm.melodies[props.num])} />
                <ButtonStop />
            </div>
        </>}
    </>} />
}