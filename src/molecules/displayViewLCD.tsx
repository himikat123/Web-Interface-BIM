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

    function showTemperature(ctx: CanvasRenderingContext2D | null, temp: number, x: number, y: number, font: number, color: string) {
        //printText(ctx, x, y, font == FONT3 ? 70 : 56, font == FONT3 ? 26 : 20, (temp >= -50 && temp < 100) ? `${temp}°C` : '--°C', font, font == FONT3 ? CENTER : RIGHT, color);
    }

    function showTemperatureInside(ctx: CanvasRenderingContext2D | null, temp: number) {
        if(prevTempIn != temp) {
            showTemperature(ctx, temp, 173, 53, FONT3, TEMPERATURE_COLOR);
            setPrevTempIn(temp);
        }
    }

    function showTemperatureOutside(ctx: CanvasRenderingContext2D | null, temp: number) {
        if(prevTempOut != temp) {
            // if(temp < 0) drawImage(ctx, Symb_temp_minus(), 62, 104);
            // else drawImage(ctx, Symb_temp_plus(), 62, 104);
            showTemperature(ctx, temp, 71, 113, FONT3, TEMPERATURE_COLOR);
            setPrevTempOut(temp);
        }
    }

    function showHumidity(ctx: CanvasRenderingContext2D | null, hum: number, x: number, y: number) {
        //printText(ctx, x, y, 58, 20, (hum >= 0 && hum <= 100) ? `${hum}%` : '--%', FONT2, CENTER, HUMIDITY_COLOR);
    }

    function showHumidityInside(ctx: CanvasRenderingContext2D | null, hum: number) {
        if(prevHumIn != hum) {
            showHumidity(ctx, hum, 264, 58);
            setPrevHumIn(hum);
        }
    }

    function showHumidityOutside(ctx: CanvasRenderingContext2D | null, hum: number) {
        if(prevHumOut != hum) {
            showHumidity(ctx, hum, 164, 119);
            setPrevHumOut(hum);
        }
    }

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

    function showPressure(ctx: CanvasRenderingContext2D | null) {
        let pres = getPres();
        if(prevPresOut != pres) {
            let p = (pres >= 800 && pres <= 1200) ? Math.round(pres * 0.75) : '--';
            p += props.data.units.mm;
            //printText(ctx, 250, 119, 70, 20, p, FONT2, CENTER, PRESSURE_COLOR);
            setPrevPresOut(pres);
        }
    }

    function getTemp(sens: number, thing: number) {
        let temp = 40400.0;
        switch(sens) {
            case 1: temp = props.data.weather.temp; break;
            case 2: if(props.data.thing.expired == -1) temp = props.data.thing.fields[thing]; break;
            case 3: temp = props.data.bme280.temp + props.config.sensors.bme280.t; break;
            case 4: temp = props.data.bmp180.temp + props.config.sensors.bmp180.t; break;
            case 5: temp = props.data.sht21.temp + props.config.sensors.sht21.t; break;
            case 6: temp = props.data.dht22.temp + props.config.sensors.dht22.t; break;
            case 7: temp = props.data.ds18b20.temp + props.config.sensors.ds18b20.t; break;
            default: ; break;
        }
        return Math.round(temp);
    }

    function getHum(sens: number, thing: number) {
        let hum = 40400.0;
        switch(sens) {
            case 1: hum = props.data.weather.hum; break;
            case 2: if(props.data.thing.expired == -1) hum = props.data.thing.fields[thing]; break;
            case 3: hum = props.data.bme280.hum + props.config.sensors.bme280.h; break;
            case 4: hum = props.data.sht21.hum + props.config.sensors.sht21.h; break;
            case 5: hum = props.data.dht22.hum + props.config.sensors.dht22.h; break;
            default: ; break;
        }
        return Math.round(hum);
    }

    function getPres() {
        let pres = 40400.0;
        switch(props.config.display.source.presOut.sens) {
            case 1: pres = props.data.weather.pres; break;
            case 2: if(props.data.thing.expired == -1) pres = props.data.thingspeak[props.config.display.source.presOut.thing]; break;
            case 3: pres = props.data.sensors.bme280.p + props.config.sensors.bme280.p; break;
            case 4: pres = props.data.sensors.bmp180.p + props.config.sensors.bmp180.p; break;
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
        //showTemperatureInside(ctx, getTemp(props.config.display.source.tempIn.sens, props.config.display.source.tempIn.thing));
        //showHumidityInside(ctx, getHum(props.config.display.source.humIn.sens, props.config.display.source.humIn.thing));
        // showTemperatureOutside(ctx, getTemp(props.config.display.source.tempOut.sens, props.config.display.source.tempOut.thing));
        // showHumidityOutside(ctx, getHum(props.config.display.source.humOut.sens, props.config.display.source.humOut.thing));
        // showPressure(ctx);
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
            render();
            setClockPointsState((clockPointsState) => !clockPointsState);
        }, 500);
        return () => clearInterval(int);

    }, [draw, clockPointsState]);

    return <div className='w-fit mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600'>
        <canvas width="320" height="240" id="canvas" 
            style={{margin: 0, padding: 0, width: '320px', height: '240px', border: '4px solid black'}}
        />
    </div>
}