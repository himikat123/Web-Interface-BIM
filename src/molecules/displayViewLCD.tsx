import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import { iPrevForecast, iSequence } from '../interfaces';
import lcdDrawSkeleton from '../atoms/canvas/lcdDrawSkeleton';
import lcdShowTime from '../atoms/canvas/lcdShowTime';
import lcdShowClockPoints from '../atoms/canvas/lcdShowClockPoints';
import lcdShowWeekday from '../atoms/canvas/lcdShowWeekday';
import lcdShowAntenna from '../atoms/canvas/lcdShowAntenna';
import lcdShowBatteryLevel from '../atoms/canvas/lcdShowBatteryLevel';
import lcdShowComfort from '../atoms/canvas/lcdShowComfort';
import lcdShowWeatherIcon from '../atoms/canvas/lcdShowWeatherIcon';
import lcdShowDescription from '../atoms/canvas/lcdShowDescription';
import { lcdShowTemperatureInside, lcdShowTemperatureOutside } from '../atoms/canvas/lcdShowTemperature';
import { lcdShowHumidityInside, lcdShowHumidityOutside } from '../atoms/canvas/lcdShowHumidity';
import lcdShowPressure from '../atoms/canvas/lcdShowPressure';
import lcdShowWindSpeed from '../atoms/canvas/lcdShowWindSpeed';
import lcdShowWindDirection from '../atoms/canvas/lcdShowWindDirection';
import lcdShowUpdTime from '../atoms/canvas/lcdShowUpdTime';
import lcdShowAlarmIcon from '../atoms/canvas/lcdShowAlarmIcon';
import lcdShowForecast from '../atoms/canvas/lcdShowForecast';
import lcdShowVoltageOrPercentage from '../atoms/canvas/lcdShowVoltageOrPercentage';
import lcdGetSequence from '../atoms/lcdGetSequence';

export default function DisplayViewLCD() {
    const config = useSelector((state: iConfig) => state.config);
    const model = config.display.model[0];
    const dispModel = (model === 0 || model === 1) ? 0 : 1;

    const BG_COLOR          = '#000';
    const FRAME_COLOR       = '#00F';
    const TEXT_COLOR        = '#FFF';
    const TEMPERATURE_COLOR = '#FF0';
    const TEMP_MIN_COLOR    = '#F80';
    const HUMIDITY_COLOR    = '#0FF';
    const PRESSURE_COLOR    = '#F0F';
    const CLOCK_COLOR       = '#0F0';
    const BATTERY_COLOR     = '#0F0';

    const [clockPointsState, setClockPointsState] = useState<boolean>(false);
    const [prevTime, setPrevTime] = useState<number>(-1);
    const [prevWeekday, setPrevWeekday] = useState<string>('');
    const [prevComfort, setPrevComfort] = useState<string>(''); 
    const [prevTempIn, setPrevTempIn] = useState<number>(-40400);
    const [prevTempOut, setPrevTempOut] = useState<number>(-40400);
    const [prevHumIn, setPrevHumIn] = useState<number>(-40400);
    const [prevHumOut, setPrevHumOut] = useState<number>(-40400);
    const [prevPresOut, setPrevPresOut] = useState<number>(-40400);
    const [prevIcon, setPrevIcon] = useState<number>(404);
    const [prevDescr, setPrevDescr] = useState<string>('');
    const [prevWindSpeed, setPrevWindSpeed] = useState<number>(-1);
    const [prevWindDirection, setPrevWindDirection] = useState<number>(-1);
    const [prevUpdTime, setPrevUpdTime] = useState<number>(0);
    const [prevAlarmState, setPrevAlarmState] = useState<boolean>(false);
    const [prevAnt, setPrevAnt] = useState<string>('');
    const [prevBatLevel, setPrevBatLevel] = useState<number>(-1);
    const [prevVolt, setPrevVolt] = useState<string>('');
    const [prevForecast, setPrevForecast] = useState<iPrevForecast>({
        wd: ['', '', '', ''],
        tMax: [404, 404, 404, 404],
        tMin: [404, 404, 404, 404],
        wSpeed: [-1, -1, -1, -1],
        icon: [-1, -1, -1, -1]
    });
    const [sequence, setSequence] = useState<iSequence>({
        descript: '',
        temp: 404,
        hum: 404,
        slot: 0,
        counter: 0
    });

    const draw = useCallback(() => {
        setSequence(lcdGetSequence(sequence));
        const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if(ctx) {
            /* Show time */
            setPrevTime(lcdShowTime(ctx, prevTime, BG_COLOR));
            lcdShowClockPoints(ctx, clockPointsState ? HUMIDITY_COLOR : BG_COLOR);

            /* Show weekday */
            setPrevWeekday(lcdShowWeekday(ctx, prevWeekday, CLOCK_COLOR, BG_COLOR));

            /* Show antenna */
            setPrevAnt(lcdShowAntenna(ctx, prevAnt));

            /* Show battery level symbol */
            setPrevBatLevel(lcdShowBatteryLevel(ctx, prevBatLevel, BG_COLOR));

            /* Show voltage or percentage */
            setPrevVolt(lcdShowVoltageOrPercentage(ctx, prevVolt, BATTERY_COLOR, TEMP_MIN_COLOR, BG_COLOR));

            /* Show comfort level */
            setPrevComfort(lcdShowComfort(ctx, prevComfort, sequence.descript, TEXT_COLOR, BG_COLOR));

            /* Show weather icon */
            setPrevIcon(lcdShowWeatherIcon(ctx, prevIcon));

            /* Show weather description */
            setPrevDescr(lcdShowDescription(ctx, prevDescr, TEXT_COLOR, BG_COLOR));

            /* Show temperature inside */
            setPrevTempIn(lcdShowTemperatureInside(ctx, prevTempIn, sequence.temp, TEMPERATURE_COLOR, BG_COLOR));
        
            /* Show temperature outside */
            setPrevTempOut(lcdShowTemperatureOutside(ctx, prevTempOut, TEMPERATURE_COLOR, BG_COLOR));

            /* Show humidity inside */
            setPrevHumIn(lcdShowHumidityInside(ctx, prevHumIn, sequence.hum, HUMIDITY_COLOR, BG_COLOR));

            /* Show humidity outside */
            setPrevHumOut(lcdShowHumidityOutside(ctx, prevHumOut, HUMIDITY_COLOR, BG_COLOR));

            /* Show pressure */
            setPrevPresOut(lcdShowPressure(ctx, prevPresOut, PRESSURE_COLOR, BG_COLOR));

            /* Show wind speed */
            setPrevWindSpeed(lcdShowWindSpeed(ctx, prevWindSpeed, TEXT_COLOR, BG_COLOR));

            /* Show wind direction */
            setPrevWindDirection(lcdShowWindDirection(ctx, prevWindDirection, BG_COLOR));

            /* Show updated time */
            setPrevUpdTime(lcdShowUpdTime(ctx, prevUpdTime, TEXT_COLOR, BG_COLOR));

            /* Show alarm icon */
            setPrevAlarmState(lcdShowAlarmIcon(ctx, prevAlarmState, BG_COLOR));

            /* Show forecast */
            for(let i=0; i<(dispModel === 0 ? 4 : 3); i++) {
                setPrevForecast(lcdShowForecast(ctx, i, prevForecast, TEXT_COLOR, TEMPERATURE_COLOR, TEMP_MIN_COLOR, BG_COLOR));
            }
        }
    }, [
        clockPointsState, prevAnt, prevBatLevel, prevDescr, prevForecast, prevHumIn, 
        prevHumOut, prevIcon, prevPresOut, prevTempIn, prevTempOut, prevTime, prevUpdTime, 
        prevVolt, prevWeekday, prevWindDirection, prevWindSpeed, prevComfort, sequence, dispModel
    ]);

    useEffect(() => {
        const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        lcdDrawSkeleton(context, FRAME_COLOR, BG_COLOR);
    }, []);
  
    useEffect(() => {
        const int = setInterval(() => {
            setClockPointsState((clockPointsState) => !clockPointsState);
            draw();
        }, 500);
        return () => clearInterval(int);
    }, [draw]);

    return <div className='w-fit mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600'>
        {/* NX4832K035 & NX4832T035 */}
        {dispModel === 0 && <canvas width="362" height="241" id="canvas1" style={{
                margin: 0, padding: 0, width: '100%', maxWidth: '362px', maxHeight: '241px', border: '4px solid black'
            }}
        />}
        {/* ILI9341 */}
        {dispModel === 1 && <canvas width="320" height="240" id="canvas1" style={{
                margin: 0, padding: 0, width: '100%', maxWidth: '320px', maxHeight: '240px', border: '4px solid black'
            }}
        />}
    </div>
}