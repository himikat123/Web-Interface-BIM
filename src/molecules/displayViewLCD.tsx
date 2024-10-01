import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import { displayLcdMainScreen } from './displayLcdMainScreen';
import { displayLcdNetworkScreen } from './displayLcdNetworkScreen';
import { displayLcdClockScreen } from './displayLcdClockScreen';
import { displayLcdCalendarScreen } from './displayLcdCalendarScreen';
import { displayLcdHourlyScreen } from './displayLcdHourlyScreen';
import { displayLcdHistoryInScreen } from './displayLcdHistoryInScreen';
import { displayLcdHistoryOutScreen } from './displayLcdHistoryOutScreen';
import * as types from '../interfaces';
import moment from 'moment';
import { iHourly } from '../redux/hourlyTypes';

export default function DisplayViewLCD() {
    const config = useSelector((state: iConfig) => state.config);
    const model = config.display.model[0];
    const dispModel = (model === 0 || model === 1) ? 0 : 1;

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


    const dispNextion = useRef<HTMLCanvasElement>(null);
    const dispILI9341 = useRef<HTMLCanvasElement>(null);
    const hourly = useSelector((state: iHourly) => state.hourly);

    const draw = useCallback(() => {
        if(ctx) { // Display pages switch
            if(page === 'main') {
                setMainState(displayLcdMainScreen(ctx, dispModel, mainState, clockPointsState));
            }
            if(page === 'network') {
                setNetworkState(displayLcdNetworkScreen(ctx, dispModel, networkState));
            }
            if(page === 'clock') {
                setClockState(displayLcdClockScreen(ctx, model, dispModel, clockState, clockType));
            }
            if(page === 'calendar') {
                setCalendarState(displayLcdCalendarScreen(ctx, dispModel, calendarState, calendarShift));
            }
            if(page === 'hourly') {
                setHourlyState(displayLcdHourlyScreen(ctx, dispModel, hourlyState, hourlyShift));
            }
            if(page === 'historyIn') {
                setHistoryInState(displayLcdHistoryInScreen(ctx, dispModel, historyInState, historyInShift));
            }
            if(page === 'historyOut') {
                setHistoryOutState(displayLcdHistoryOutScreen(ctx, dispModel, historyOutState, historyOutShift));
            }
        }
    }, [ctx, clockPointsState, model, dispModel, page, mainState, networkState, clockState, 
        clockType, calendarShift, calendarState, hourlyShift, hourlyState, 
        historyInShift, historyInState, historyOutShift, historyOutState
    ]);

    useEffect(() => {
        setCanvas(dispModel === 0 ? dispNextion.current : dispILI9341.current);
        setCtx(canvas?.getContext('2d'));
    }, [dispModel, canvas]);
  
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
        const rect = canvas?.getBoundingClientRect();
        const rectWidth = rect?.width ?? 0;
        const displayWidth = canvas?.width ?? 0;
        const kx = rectWidth / displayWidth;
        const rectHeight = rect?.height ?? 0;
        const displayHeight = canvas?.height ?? 0;
        const ky = rectHeight / displayHeight;
        const x = Math.round(e.clientX - (rect ? rect.left : 0)) / (kx ?? 1);
        const y = Math.round(e.clientY - (rect ? rect.top : 0)) / (ky ?? 1);
        console.log(x, y);

        /* wifi antenna or close button */
        if(x > (dispModel ? 284 : 320) && y < (dispModel ? 25 : 36)) {
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
        if(x < 140 && y < 80 && page === 'main') {
            setClockState(undefined);
            setPage('clock');
        }

        /* clock type */
        if(y > 55 && y < 185 && page === 'clock') {
            switch(clockType) {
                case 'small': setClockType('analog'); break;
                case 'analog': setClockType('big'); break;
                default: setClockType(model === 1 ? 'analog' : 'small'); break;
            }
        }

        /* calendar */
        if((x > 145 && x < 180 && y < 33 && page === 'main')
            || (x > 40 && x < (dispModel ? 250 : 300) && y < 36 && page === 'clock' && clockType !== 'analog')
            || (y > 188 && page === 'clock' && clockType !== 'analog')
        ) {
            setCalendarState(undefined);
            if(model !== 1) setPage('calendar');
        }

        /* back button */
        if(x < 32 && y > 100 && y < 136) {
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
        if(x > (dispModel ? 286 : 320) && y > 100 && y < 136) {
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
        if(y > 162 && page === 'main' && model !== 1) {
            setHourlyState(undefined);
            let dayLinks = [];
            for(let i=0; i<40; i++) {
                if(moment.unix(hourly.date[i] ?? 0).hour() === 0) {
                    if(i !== 0) dayLinks.push(i);
                }
            }
            const day1 = dispModel ? 106 : 90;
            const day2 = dispModel ? 208 : 176;
            const day3 = dispModel ? 320 : 264;
            if(x < day1) setHourlyShift(0);
            if(x > day1 && x < day2) setHourlyShift(dayLinks[0]);
            if(x > day2 && x < day3) setHourlyShift(dayLinks[1]);
            if(x > day3) setHourlyShift(dayLinks[2]);
            setPage('hourly');
        }

        /* history inside */
        if(x > 145 && y > 33 && y < 80 && page === 'main' && model !== 1) {
            setHistoryInState(undefined);
            setPage('historyIn');
        }

        /* history outside */
        if(x < (dispModel ? 284 : 320) && y > 81 && y < 160 && page === 'main' && model !== 1) {
            setHistoryOutState(undefined);
            setPage('historyOut');
        }
    }

    return <div className='w-fit mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600'>
        {/* NX4832K035 & NX4832T035 */}
        {dispModel === 0 && <canvas width="362" height="241" ref={dispNextion} onClick={handleClick} style={{
                margin: 0, padding: 0, width: '100%', maxWidth: '362px', maxHeight: '241px', border: '4px solid black'
            }}
        />}
        {/* ILI9341 */}
        {dispModel === 1 && <canvas width="320" height="240" ref={dispILI9341} onClick={handleClick} style={{
                margin: 0, padding: 0, width: '100%', maxWidth: '320px', maxHeight: '240px', border: '4px solid black'
            }}
        />}
    </div>
}