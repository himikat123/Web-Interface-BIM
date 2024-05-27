import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { iConfig } from '../redux/configTypes';
import { iData } from "../redux/dataTypes";
import * as vl from "../atoms/validateValues";
import { drawLine, fillCircle, drawRoundRect, fillRect, drawImage, printText } from '../atoms/canvas/primitives';
import lcdDrawSkeleton from '../atoms/canvas/lcdDrawSkeleton';
import lcdShowTime from '../atoms/canvas/lcdShowTime';
import lcdShowClockPoints from '../atoms/canvas/lcdShowClockPoints';
import lcdShowWeekday from '../atoms/canvas/lcdShawWeekday';
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

//import { temp_minus } from '../atoms/img/symb';


export default function DisplayViewLCD(props: any) {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    //const canvasRef = useRef(null);
    const BG_COLOR          = '#000';
    const FRAME_COLOR       = '#00F';
    const TEXT_COLOR        = '#FFF';
    const TEMPERATURE_COLOR = '#FF0';
    const TEMP_MIN_COLOR    = '#F80';
    const HUMIDITY_COLOR    = '#0FF';
    const PRESSURE_COLOR    = '#F0F';
    const CLOCK_COLOR       = '#0F0';
    const BATTERY_COLOR     = '#0F0';

    const LEFT = 'left';
    const CENTER = 'center';
    const RIGHT = 'right';

    const FONT1 = 14;
    const FONT2 = 21;
    const FONT3 = 29;

    const [clockPointsState, setClockPointsState] = useState(false);
    const [prevTime, setPrevTime] = useState<number>(-1);
    const [prevWeekday, setPrevWeekday] = useState<string>('');
    const [prevComfort, setPrevComfort] = useState(0); 
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
    const [prevVolt, setPrevVolt] = useState<number>(-40400.00);

    function showVoltageOrPercentage(ctx: CanvasRenderingContext2D | null) {
        let volt = "--";
        let percent = "--";
  
        // if(props.config.display.source.volt.sens == 1) { // Thingspeak
        //     if(props.data.thing.expired == -1) {
        //         let value = props.data.thing.fields[props.config.display.source.volt.thing];
        //         volt = value.toFixed(2);
        //         percent = String(value);
        //     }
        
        //     if(prevVolt != volt) {
        //         if(props.config.display.source.volt.volt == 0) { // Voltage
        //             let v = (!checkVoltage(volt)) ? '--' : volt;
        //             v += props.data.units.v;
        //             printText(ctx, 198, 10, 58, 16, v, FONT1, RIGHT, BATTERY_COLOR);
        //         }

        //         else if(props.config.display.source.volt.volt == 1) { // Percentage
        //             let p = (!checkPercentage(percent)) ? '--%' : `${percent}%`;
        //             printText(ctx, 198, 10, 58, 16, p, FONT1, RIGHT, BATTERY_COLOR);
        //         }

        //         else printText(ctx, 198, 10, 58, 16, " ", FONT1, RIGHT, BATTERY_COLOR);

        //         setPrevVolt(volt);
        //     }
        // }
        // else printText(ctx, 198, 10, 58, 16, " ", FONT1, RIGHT, BATTERY_COLOR);
    }

    function getTempIn() {
        let temp = 40400.0;
        const wsensNum = config.display.source.tempIn.wsensNum;
        const thingNum = config.display.source.tempIn.thing;

        switch(config.display.source.tempIn.sens) {
            case 1: temp = data.weather.temp; break;
            case 2: if(vl.WsensorDataRelevance(wsensNum)) {
                //temp = vl.validateTemperature(data.wsensor.temp.data[wsensNum]) 
                //    ? data.wsensor.temp.data[wsensNum] + config.wsensor.temp.corr[wsensNum] 
                //    : 40400
            }; break;
            // case 3: if(vl.ThingspeakDataRelevance()) {
            //     temp = vl.validateThingspeak(
            //         data.thing?.data 
            //             ? data.thing?.data[thingNum] 
            //             : -40400
            //     )
            //     ? data.thing?.data 
            //         ? data.thing?.data[thingNum] 
            //         : 40400 
            //     : 40400
            // }; break;
            case 4: ; break;
            case 5: temp = data.bme280.temp + config.sensors.bme280.t; break;
            case 6: temp = data.bmp180.temp + config.sensors.bmp180.t; break;
            case 7: temp = data.sht21.temp + config.sensors.sht21.t; break;
            case 8: temp = data.dht22.temp + config.sensors.dht22.t; break;
            case 9: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break;
            case 10: temp = data.bme680.temp + config.sensors.bme680.t; break;
            default: ; break;
        }
        return Math.round(temp);
    }

    function getTempOut() {
        let temp = 40400.0;
        const wsensNum = config.display.source.tempOut.wsensNum;
        const thingNum = config.display.source.tempOut.thing;

        switch(config.display.source.tempOut.sens) {
            case 1: temp = data.weather.temp; break;
                        
            case 4: temp = data.bme280.temp + config.sensors.bme280.t; break;
            case 5: temp = data.bmp180.temp + config.sensors.bmp180.t; break;
            case 6: temp = data.sht21.temp + config.sensors.sht21.t; break;
            case 7: temp = data.dht22.temp + config.sensors.dht22.t; break;
            case 8: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break;
            case 9: temp = data.bme680.temp + config.sensors.bme680.t; break;
            default: ; break;
        }
        return Math.round(temp);
    }

    function getHumIn() {
        let hum = 40400.0;
        const wsensNum = config.display.source.humIn.wsensNum;
        const thingNum = config.display.source.humIn.thing;

        switch(config.display.source.humIn.sens) {
            case 1: hum = data.weather.hum; break;
            case 2: if(vl.WsensorDataRelevance(wsensNum)) {
                hum = vl.validateHumidity(data.wsensor.hum.data[wsensNum]) 
                    ? data.wsensor.hum.data[wsensNum] + config.wsensor.hum.corr[wsensNum] 
                    : 40400
            }; break;
            case 3: if(vl.ThingspeakDataRelevance()) {
                hum = vl.validateThingspeak(
                    data.thing?.data 
                        ? data.thing?.data[thingNum] 
                        : -40400
                )
                ? data.thing?.data 
                    ? data.thing?.data[thingNum] 
                    : 40400 
                : 40400
            }; break;
            case 4: ; break;
            case 5: hum = data.bme280.hum + config.sensors.bme280.h; break;
            case 6: hum = data.sht21.hum + config.sensors.sht21.h; break;
            case 7: hum = data.dht22.hum + config.sensors.dht22.h; break;
            case 8: hum = data.bme680.hum + config.sensors.bme680.h; break;
            default: ; break;
        }
        return Math.round(hum);
    }

    function getHumOut() {
        let hum = 40400.0;
        const wsensNum = config.display.source.humOut.wsensNum;
        const thingNum = config.display.source.humOut.thing;

        switch(config.display.source.humOut.sens) {
            case 1: hum = data.weather.hum; break;
            case 2: if(vl.WsensorDataRelevance(wsensNum)) {
                hum = vl.validateHumidity(data.wsensor.hum.data[wsensNum]) 
                    ? data.wsensor.hum.data[wsensNum] + config.wsensor.hum.corr[wsensNum] 
                    : 40400
            }; break;
            case 3: if(vl.ThingspeakDataRelevance()) {
                hum = vl.validateThingspeak(
                    data.thing?.data 
                        ? data.thing?.data[thingNum] 
                        : -40400
                )
                ? data.thing?.data 
                    ? data.thing?.data[thingNum] 
                    : 40400 
                : 40400
            }; break;
            case 4: hum = data.bme280.hum + config.sensors.bme280.h; break;
            case 5: hum = data.sht21.hum + config.sensors.sht21.h; break;
            case 6: hum = data.dht22.hum + config.sensors.dht22.h; break;
            case 7: hum = data.bme680.hum + config.sensors.bme680.h; break;
            default: ; break;
        }
        return Math.round(hum);
    }

    function getPres() {
        let pres = 40400.0;
        const wsensNum = config.display.source.presOut.wsensNum;
        const thingNum = config.display.source.presOut.thing;

        switch(config.display.source.presOut.sens) {
            case 1: pres = data.weather.pres; break;
            case 2: if(vl.WsensorDataRelevance(wsensNum)) {
                pres = vl.validatePressure(data.wsensor.pres.data[wsensNum]) 
                    ? data.wsensor.pres.data[wsensNum] + config.wsensor.pres.corr[wsensNum] 
                    : 40400
            }; break;
            case 3: if(vl.ThingspeakDataRelevance()) {
                pres = vl.validateThingspeak(
                    data.thing?.data 
                        ? data.thing?.data[thingNum] 
                        : -40400
                )
                ? data.thing?.data 
                    ? data.thing?.data[thingNum] 
                    : 40400 
                : 40400
            }; break;
            case 4: pres = data.bme280.pres + config.sensors.bme280.p; break;
            case 5: pres = data.bmp180.pres + config.sensors.bmp180.p; break;
            case 6: pres = data.bme680.pres + config.sensors.bme680.p; break;
            default: ; break;
        }
        return pres;
    }

    function checkVoltage(val: number) {
        if(val >= 0.0 && val <= 12.0) return true;
        else return false;
    }

    function checkPercentage(val: number) {
        if(val >= 0.0 && val <= 100.0) return true;
        else return false;
    }



    function voltage(adc: number, k: number) {
        return adc / (300.0 - k);
    }

    function percentage(type: number, adc: number, k: number) {
        const umin = 3.75;
        const umax = type === 0 ? 4.5 : 3.9;
        let percent = (voltage(adc, k) - umin) * 100.0 / (umax - umin); 
        if(percent < 0) percent = 0;
        if(percent > 100) percent = 100;
        return percent;
    }

    function draw(ctx: CanvasRenderingContext2D | null) {
        if(ctx) {
            /* Show time */
            const time = data.time;
            if(prevTime !== time) {
                lcdShowTime(ctx, time, BG_COLOR);
                setPrevTime(time);
            }

            lcdShowClockPoints(ctx, clockPointsState ? HUMIDITY_COLOR : BG_COLOR);

            /* Show weekday */
            const wd = data.wd[0];
            if(prevWeekday !== wd) {
                lcdShowWeekday(ctx, wd, FONT2, CLOCK_COLOR, BG_COLOR);
                setPrevWeekday(wd);
            }

            /* Show antenna */
            const signal = data.network.sig;
            if(prevAnt !== signal) {
                lcdShowAntenna(ctx, signal);
                setPrevAnt(signal);
            }

            /* Show battery level symbol */
            let level = -1;
            if(config.display.source.bat.sens == 1) { // Wsensor
                const wSensNum = config.display.source.bat.wsensNum;
                if(Math.floor(Date.now() / 1000) - data.wsensor.time[wSensNum] < config.wsensor.expire[wSensNum] * 60) {
                    if(vl.validateBatteryADC(data.wsensor.bat[wSensNum])) {
                        const percent = percentage(config.wsensor.bat.type[wSensNum], data.wsensor.bat[wSensNum], config.wsensor.bat.k[wSensNum]);
                        level = Math.round(percent / 25);
                        if(level < 1) level = 1;
                        if(level > 4) level = 4;
                    }
                }
            }
            if(config.display.source.bat.sens == 2) { // Thingspeak
                if(data.thing?.time && (Math.floor(Date.now() / 1000) - data.thing.time < config.thingspeakReceive.expire * 60)) {
                    level = data.thing.data ? data.thing.data[config.display.source.bat.thing] : -1;
                }
            }
            if(prevBatLevel !== level) {
                lcdShowBatteryLevel(ctx, level, BG_COLOR);
                setPrevBatLevel(level);
            }

            //showVoltageOrPercentage(ctx);

            //lcdShowComfort() {
            //     if(props.config.display.source.descr == 1) {
            //         if(prevComfort != props.data.comfort) {
            //             //printText(ctx, 145, 28, 175, 16, props.data.comfort, FONT1, CENTER, TEXT_COLOR);
            //             setPrevComfort(props.data.comfort);
            //         }
            //     }
            // }

            /* Show weather icon */
            const icon = data.weather.icon;
            const isDay = data.weather.isDay;
            if(prevIcon !== (icon * 100 + isDay)) {
                lcdShowWeatherIcon(ctx, icon, isDay == 1);
                setPrevIcon(icon * 100 + isDay);
            }

            /* Show weather description */
            const descr = data.weather.descript;
            if(prevDescr !== descr) {
                lcdShowDescription(ctx, descr, FONT1, FONT2, TEXT_COLOR, BG_COLOR);
                setPrevDescr(descr);
            }

            /* Show temperature inside */
            const tempIn = getTempIn();
            if(prevTempIn !== tempIn) {
                lcdShowTemperatureInside(ctx, tempIn, FONT3, TEMPERATURE_COLOR, BG_COLOR);
                setPrevTempIn(tempIn);
            }
        
            /* Show temperature outside */
            const tempOut = getTempOut();
            if(prevTempOut !== tempOut) {
                lcdShowTemperatureOutside(ctx, tempOut, FONT3, TEMPERATURE_COLOR, BG_COLOR);
                setPrevTempOut(tempOut);
            }

            /* Show humidity inside */
            const humIn = getHumIn();
            if(prevHumIn != humIn) {
                lcdShowHumidityInside(ctx, humIn, FONT2, HUMIDITY_COLOR, BG_COLOR);
                setPrevHumIn(humIn);
            }

            /* Show humidity outside */
            const humOut = getHumOut();
            if(prevHumOut != humOut) {
                lcdShowHumidityOutside(ctx, humOut, FONT2, HUMIDITY_COLOR, BG_COLOR);
                setPrevHumOut(humOut);
            }

            /* Show pressure */
            let pres = getPres();
            if(prevPresOut !== pres) {
                lcdShowPressure(ctx, pres, data.units.mm, FONT2, PRESSURE_COLOR, BG_COLOR);
                setPrevPresOut(pres);
            }

            /* Show wind speed */
            const speed = data.weather.wind.speed;
            if(prevWindSpeed !== speed) {
                lcdShowWindSpeed(ctx, speed, data.units.ms, FONT1, TEXT_COLOR, BG_COLOR);
                setPrevWindSpeed(speed);
            }

            /* Show wind direction */
            const windDirection = data.weather.wind.dir;
            if(prevWindDirection !== windDirection) {
                lcdShowWindDirection(ctx, windDirection, BG_COLOR);
                setPrevWindDirection(windDirection);
            }

            /* Show updated time */
            if(prevUpdTime !== data.weather.time) {
                lcdShowUpdTime(ctx, data.weather.time, config.lang, FONT1, TEXT_COLOR, BG_COLOR);
                setPrevUpdTime(data.weather.time);
            }

            /* Show forecast */
            for(let i=0; i<3; i++) {
                lcdShowForecast(ctx, i, data.weather.daily.tMax[i], data.weather.daily.tMin[i], 
                    data.weather.daily.wind[i], data.weather.daily.icon[i], data.wd[i], data.units.ms,
                    FONT1, FONT2, TEXT_COLOR, TEMPERATURE_COLOR, TEMP_MIN_COLOR, BG_COLOR
                );
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
        <canvas width="320" height="240" id="canvas" 
            style={{margin: 0, padding: 0, width: '320px', height: '240px', border: '4px solid black'}}
        />
    </div>
}