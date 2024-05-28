import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { iConfig } from '../redux/configTypes';
import { iData } from "../redux/dataTypes";
import { iPrevForecast } from '../interfaces';

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
import lcdShowForecast from '../atoms/canvas/lcdShowForecast';
import lcdShowVoltageOrPercentage from '../atoms/canvas/lcdShowVoltageOrPercentage';

export default function DisplayViewLCD() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const BG_COLOR          = '#000';
    const FRAME_COLOR       = '#00F';
    const TEXT_COLOR        = '#FFF';
    const TEMPERATURE_COLOR = '#FF0';
    const TEMP_MIN_COLOR    = '#F80';
    const HUMIDITY_COLOR    = '#0FF';
    const PRESSURE_COLOR    = '#F0F';
    const CLOCK_COLOR       = '#0F0';
    const BATTERY_COLOR     = '#0F0';

    const FONT1 = 14;
    const FONT2 = 21;
    const FONT3 = 29;

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
    const [prevAnt, setPrevAnt] = useState<string>('');
    const [prevBatLevel, setPrevBatLevel] = useState<number>(-1);
    const [prevVolt, setPrevVolt] = useState<string>('');
    const [prevForecast, setPrevForecast] = useState<iPrevForecast>({
        wd: ['', '', '', ''],
        tMax: [40400, 40400, 40400, 40400],
        tMin: [40400, 40400, 40400, 40400],
        wSpeed: [-1, -1, -1, -1],
        icon: [-1, -1, -1, -1]
    });

    function draw(ctx: CanvasRenderingContext2D | null) {
        if(ctx) {
            /* Show time */
            setPrevTime(lcdShowTime(ctx, prevTime, BG_COLOR));
            lcdShowClockPoints(ctx, clockPointsState ? HUMIDITY_COLOR : BG_COLOR);

            /* Show weekday */
            setPrevWeekday(lcdShowWeekday(ctx, prevWeekday, FONT2, CLOCK_COLOR, BG_COLOR));

            /* Show antenna */
            setPrevAnt(lcdShowAntenna(ctx, prevAnt));

            /* Show battery level symbol */
            setPrevBatLevel(lcdShowBatteryLevel(ctx, prevBatLevel, BG_COLOR));

            /* Show voltage or percentage */
            setPrevVolt(lcdShowVoltageOrPercentage(ctx, prevVolt, FONT1, BATTERY_COLOR, TEMP_MIN_COLOR, BG_COLOR));

            //lcdShowComfort() {
            //     if(props.config.display.source.descr == 1) {
            //         if(prevComfort != props.data.comfort) {
            //             //printText(ctx, 145, 28, 175, 16, props.data.comfort, FONT1, CENTER, TEXT_COLOR);
            //             setPrevComfort(props.data.comfort);
            //         }
            //     }
            // }

            /* Show weather icon */
            setPrevIcon(lcdShowWeatherIcon(ctx, prevIcon));

            /* Show weather description */
            setPrevDescr(lcdShowDescription(ctx, prevDescr, FONT1, FONT2, TEXT_COLOR, BG_COLOR));

            /* Show temperature inside */
            setPrevTempIn(lcdShowTemperatureInside(ctx, prevTempIn, FONT3, TEMPERATURE_COLOR, BG_COLOR));
        
            /* Show temperature outside */
            setPrevTempOut(lcdShowTemperatureOutside(ctx, prevTempOut, FONT3, TEMPERATURE_COLOR, BG_COLOR));

            /* Show humidity inside */
            setPrevHumIn(lcdShowHumidityInside(ctx, prevHumIn, FONT2, HUMIDITY_COLOR, BG_COLOR));

            /* Show humidity outside */
            setPrevHumOut(lcdShowHumidityOutside(ctx, prevHumOut, FONT2, HUMIDITY_COLOR, BG_COLOR));

            /* Show pressure */
            setPrevPresOut(lcdShowPressure(ctx, prevPresOut, data.units.mm, FONT2, PRESSURE_COLOR, BG_COLOR));

            /* Show wind speed */
            setPrevWindSpeed(lcdShowWindSpeed(ctx, prevWindSpeed, data.units.ms, FONT1, TEXT_COLOR, BG_COLOR));

            /* Show wind direction */
            setPrevWindDirection(lcdShowWindDirection(ctx, prevWindDirection, BG_COLOR));

            /* Show updated time */
            setPrevUpdTime(lcdShowUpdTime(ctx, prevUpdTime, config.lang, FONT1, TEXT_COLOR, BG_COLOR));

            /* Show forecast */
            for(let i=0; i<3; i++) {
                setPrevForecast(lcdShowForecast(ctx, i, prevForecast, data.units.ms, 
                    FONT1, FONT2, TEXT_COLOR, TEMPERATURE_COLOR, TEMP_MIN_COLOR, BG_COLOR
                ));
            }
        }
    }

    useEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        lcdDrawSkeleton(context, FRAME_COLOR, BG_COLOR);
    }, []);
  
    useEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');

        const render = () => {
            draw(context);
        }

        const int = setInterval(() => {
            setClockPointsState((clockPointsState) => !clockPointsState);
            render();
        }, 500);
        return () => clearInterval(int);

    }, [draw, clockPointsState]);

    return <div className='w-fit mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600'>
        <canvas width="320" height="240" id="canvas" style={{
                margin: 0, padding: 0, width: '320px', height: '240px', border: '4px solid black'
            }}
        />
    </div>
}