import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import device from '../../device';
import { displayLcdMainScreen } from './displayLcdMainScreen';
import { displayLcdNetworkScreen } from './displayLcdNetworkScreen';
import { displayLcdClockScreen } from './displayLcdClockScreen';
import { displayLcdCalendarScreen } from './displayLcdCalendarScreen';
import { displayLcdHourlyScreen } from './displayLcdHourlyScreen';
import { displayLcdHistoryInScreen } from './displayLcdHistoryInScreen';
import { displayLcdHistoryOutScreen } from './displayLcdHistoryOutScreen';
import { displayLcdAlarmScreen } from './displayLcdAlarmScreen';
import * as types from '../../interfaces';
import type { iConfig } from "../../redux/configTypes";
import type { iData } from '../../redux/dataTypes';
import type { iHourly } from '../../redux/hourlyTypes';
import * as D from '../../atoms/constants/displayTypes';
import * as coords from './touchscreenCoordinates';
import type { iAlarms } from '../../redux/alarmTypes';

export default function DisplayViewLCD() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const alarms = useSelector((state: iAlarms) => state.alarm);
    const model = config.display.model[D.DISPLAY1];

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null);
    const [page, setPage] = useState<string>('main');
    const [clockPointsState, setClockPointsState] = useState<boolean>(false);
    const [mainState, setMainState] = useState<types.iLcdMainState>();
    const [networkState, setNetworkState] = useState<types.iLcdNetworkState>();
    const [clockState, setClockState] = useState<types.iLcdClockState>();
    const [calendarState, setCalendarState] = useState<types.iLcdCalendarState>();
    const [hourlyState, setHourlyState] = useState<types.iLcdHourlyState>();
    const [historyInState, setHistoryInState] = useState<types.iLcdHourlyState>();
    const [historyOutState, setHistoryOutState] = useState<types.iLcdHourlyState>();
    const [clockType, setClockType] = useState<string>('big');
    const [calendarShift, setCalendarShift] = useState<number>(0);
    const [hourlyShift, setHourlyShift] = useState<number>(0);
    const [historyInShift, setHistoryInShift] = useState<number>(16);
    const [historyOutShift, setHistoryOutShift] = useState<number>(16);
    const [alarmState, setAlarmState] = useState<types.iAlarmScreen>();


    const dispNX4832x035 = useRef<HTMLCanvasElement>(null);
    const dispNX4827K043 = useRef<HTMLCanvasElement>(null);
    const dispILI9341 = useRef<HTMLCanvasElement>(null);
    const hourly = data.weather.hourly;

    const draw = useCallback(() => {
        if(ctx) { // Display pages switch
            if(page === 'main') {
                setMainState(displayLcdMainScreen(ctx, model, mainState, clockPointsState, config, data, alarms));
            }
            if(page === 'network') {
                setNetworkState(displayLcdNetworkScreen(ctx, model, networkState));
            }
            if(page === 'clock') {
                setClockState(displayLcdClockScreen(ctx, model, clockState, clockType));
            }
            if(page === 'calendar') {
                setCalendarState(displayLcdCalendarScreen(ctx, model, calendarState, calendarShift));
            }
            if(page === 'hourly') {
                setHourlyState(displayLcdHourlyScreen(ctx, model, hourlyState, hourlyShift, config.units.pres, data));
            }
            if(page === 'historyIn') {
                setHistoryInState(displayLcdHistoryInScreen(ctx, model, historyInState, historyInShift, config.units.pres));
            }
            if(page === 'historyOut') {
                setHistoryOutState(displayLcdHistoryOutScreen(ctx, model, historyOutState, historyOutShift, config.units.pres));
            }
            if(page === 'alarm') {
                setAlarmState(displayLcdAlarmScreen(ctx, model, alarmState));
            }
        }
    }, [ctx, clockPointsState, model, page, mainState, networkState, clockState, 
        clockType, calendarShift, calendarState, hourlyShift, hourlyState, alarmState, 
        historyInShift, historyInState, historyOutShift, historyOutState, config.units.pres
    ]);

    useEffect(() => {
        switch(model) {
            case D.NX4832K035:
            case D.NX4832T035: setCanvas(dispNX4832x035.current); break;
            case D.NX4827K043: setCanvas(dispNX4827K043.current); break;
            case D.ILI9341: setCanvas(dispILI9341.current); break;
            default: ; break;
        }
        setCtx(canvas?.getContext('2d'));
    }, [model, canvas]);
  
    useEffect(() => {
        const int = setInterval(() => {
            const date = new Date();
            setClockPointsState((date.getMilliseconds() % 1000) > 500);
            draw();
        }, 30);
        return () => clearInterval(int);
    }, [draw]);

    /* touchscreen events */
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if(device() === 'WeatherMonitorBIM32') {
            const rect = canvas?.getBoundingClientRect();
            const rectWidth = rect?.width ?? 0;
            const displayWidth = canvas?.width ?? 0;
            const kx = rectWidth / displayWidth;
            const rectHeight = rect?.height ?? 0;
            const displayHeight = canvas?.height ?? 0;
            const ky = rectHeight / displayHeight;
            const x = Math.round(e.clientX - (rect ? rect.left : 0)) / (kx ?? 1);
            const y = Math.round(e.clientY - (rect ? rect.top : 0)) / (ky ?? 1);
            setAlarmState({
                x: x,
                y: y,
                click: true,
                skeleton: alarmState?.skeleton ?? false,
                alarm: alarmState?.alarm ?? ''
            });

            /* wifi antenna or close button */
            const antCoords = coords.wifiAntennaOrCloseButton(model);
            if(x > antCoords.x && y < antCoords.y) {
                if(page === 'main') {
                    setNetworkState(undefined);
                    setPage('network');
                }
                else {
                    setMainState(undefined);
                    setClockType('big');
                    setCalendarShift(0);
                    setHourlyShift(0);
                    setPage('main');
                }
            }

            /* clock */
            const clockMainCoords = coords.clockMain(model);
            if(x < clockMainCoords.x && y < clockMainCoords.y && page === 'main') {
                setClockState(undefined);
                setPage('clock');
            }

            /* clock type */
            const clockTypeCoords = coords.clockType(model);
            if(y > clockTypeCoords.y1 && y < clockTypeCoords.y2 && page === 'clock') {
                switch(clockType) {
                    case 'small': setClockType(model === D.NX4832T035 ? 'big' : 'analog'); break;
                    case 'analog': setClockType('big'); break;
                    case 'big': setClockType('small'); break;
                }
            }

            /* calendar */
            const calendarCoords = coords.calendar(model);
            if((x > calendarCoords.x1 && x < calendarCoords.x2 && y < calendarCoords.y1 && page === 'main')
                || (x > calendarCoords.x3 && x < calendarCoords.x4 && y < calendarCoords.y2 && page === 'clock' && clockType !== 'analog')
                || (y > calendarCoords.y3 && page === 'clock' && clockType !== 'analog')
            ) {
                setCalendarState(undefined);
                if(model !== D.NX4832T035) setPage('calendar');
            }

            /* back button */
            const backButtonCoords = coords.backButton(model);
            if(x < backButtonCoords.x && y > backButtonCoords.y1 && y < backButtonCoords.y2) {
                if(page === 'calendar') setCalendarShift(calendarShift - 1);
                if(page === 'hourly') {
                    let shift = hourlyShift - 4;
                    if(shift < 0) shift = 0;
                    setHourlyShift(shift);
                }
                if(page === 'historyIn') {
                    let shift = historyInShift - 4;
                    if(shift < 0) shift = 0;
                    setHistoryInShift(shift);
                }
                if(page === 'historyOut') {
                    let shift = historyOutShift - 4;
                    if(shift < 0) shift = 0;
                    setHistoryOutShift(shift);
                }
            }

            /* forward button */
            const forwardButtonCoords = coords.forwardButton(model);
            if(x > forwardButtonCoords.x && y > forwardButtonCoords.y1 && y < forwardButtonCoords.y2) {
                if(page === 'calendar') setCalendarShift(calendarShift + 1);
                if(page === 'hourly') {
                    let shift = hourlyShift + 4;
                    if(shift > 32) shift = 32;
                    setHourlyShift(shift);      
                }
                if(page === 'historyIn') {
                    let shift = historyInShift + 4;
                    if(shift > 16) shift = 16;
                    setHistoryInShift(shift);      
                }
                if(page === 'historyOut') {
                    let shift = historyOutShift + 4;
                    if(shift > 16) shift = 16;
                    setHistoryOutShift(shift);      
                }
            }

            /* hourly forecast */
            const hourlyCoords = coords.hourlyForecast(model);
            if(y > hourlyCoords.y && page === 'main' && model !== D.NX4832T035 && config.weather.provider !== 1) {
                setHourlyState(undefined);
                let dayLinks = [];
                for(let i=0; i<40; i++) {
                    if(moment.unix(hourly?.date[i] ?? 0).hour() === 0) {
                        if(i !== 0) dayLinks.push(i);
                    }
                }
                if(x < hourlyCoords.day1) setHourlyShift(0);
                if(x > hourlyCoords.day1 && x < hourlyCoords.day2) setHourlyShift(dayLinks[0]);
                if(x > hourlyCoords.day2 && x < hourlyCoords.day3) setHourlyShift(dayLinks[1]);
                if(x > hourlyCoords.day3 && x < hourlyCoords.day4) setHourlyShift(dayLinks[2]);
                if(x > hourlyCoords.day4) setHourlyShift(dayLinks[3]);
                setPage('hourly');
            }

            /* history inside */
            const historyInCoords = coords.historyIn(model);
            if(x > historyInCoords.x && y > historyInCoords.y1 && y < historyInCoords.y2 && page === 'main' && model !== D.NX4832T035) {
                setHistoryInState(undefined);
                setPage('historyIn');
            }

            /* history outside */
            const historyOutCoords = coords.historyOut(model);
            if(x < historyOutCoords.x && y > historyOutCoords.y1 && y < historyOutCoords.y2 && page === 'main' && model !== D.NX4832T035) {
                setHistoryOutState(undefined);
                setPage('historyOut');
            }

            /* alarm */
            const alarmCoords = coords.alarm(model);
            if(x > alarmCoords.x && y > alarmCoords.y1 && y < alarmCoords.y2 && page === 'main' && model !== D.NX4832T035) {
                setAlarmState(undefined);
                setPage('alarm');
            }
        }
    }

    return <div className='w-fit mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600'>
        {/* NX4832K035 & NX4832T035 */}
        {(model === D.NX4832K035 || model === D.NX4832T035) && 
            <canvas width="480" height="320" ref={dispNX4832x035} onClick={handleClick} style={{
                margin: 0, padding: 0, width: '100%', maxWidth: '480px', maxHeight: '320px', border: '4px solid black'
            }}
        />}
        {/* NX4827K043 */}
        {model === D.NX4827K043 && 
            <canvas width="480" height="270" ref={dispNX4827K043} onClick={handleClick} style={{
                margin: 0, padding: 0, width: '100%', maxWidth: '480px', maxHeight: '270px', border: '4px solid black'
            }}
        />}
        {/* ILI9341 */}
        {model === D.ILI9341 && 
            <canvas width="320" height="240" ref={dispILI9341} onClick={handleClick} style={{
                margin: 0, padding: 0, width: '100%', maxWidth: '320px', maxHeight: '240px', border: '4px solid black'
            }}
        />}
    </div>
}