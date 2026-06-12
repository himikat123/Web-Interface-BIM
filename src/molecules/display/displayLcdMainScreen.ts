import lcdDrawSkeleton from '../../atoms/canvas/lcdDrawSkeleton';
import lcdShowTime from '../../atoms/canvas/lcdShowTime';
import lcdShowClockPoints from '../../atoms/canvas/lcdShowClockPoints';
import lcdShowWeekday from '../../atoms/canvas/lcdShowWeekday';
import lcdShowAntenna from '../../atoms/canvas/lcdShowAntenna';
import lcdShowBatteryLevel from '../../atoms/canvas/lcdShowBatteryLevel';
import lcdShowComfort from '../../atoms/canvas/lcdShowComfort';
import lcdShowWeatherIcon from '../../atoms/canvas/lcdShowWeatherIcon';
import lcdShowDescription from '../../atoms/canvas/lcdShowDescription';
import { lcdShowTemperatureInside, lcdShowTemperatureOutside } from '../../atoms/canvas/lcdShowTemperature';
import { lcdShowHumidityInside, lcdShowHumidityOutside } from '../../atoms/canvas/lcdShowHumidity';
import lcdShowPressure from '../../atoms/canvas/lcdShowPressure';
import lcdShowWindSpeed from '../../atoms/canvas/lcdShowWindSpeed';
import lcdShowWindDirection from '../../atoms/canvas/lcdShowWindDirection';
import lcdShowUpdTime from '../../atoms/canvas/lcdShowUpdTime';
import lcdShowAlarmIcon from '../../atoms/canvas/lcdShowAlarmIcon';
import lcdShowForecast from '../../atoms/canvas/lcdShowForecast';
import lcdShowVoltageOrPercentage from '../../atoms/canvas/lcdShowVoltageOrPercentage';
import lcdGetSequence from '../../atoms/lcdGetData/lcdGetSequence';
import lcdColors from '../../atoms/canvas/lcdColors';
import { fillRect } from '../../atoms/canvas/primitives';
import * as D from '../../atoms/constants/displayTypes';
import type { iLcdMainState } from '../../interfaces';
import type { iConf } from '../../redux/configTypes';
import type { iDat } from '../../redux/dataTypes';
import type { iAlrms } from '../../redux/alarmTypes';

export function displayLcdMainScreen(
    ctx: CanvasRenderingContext2D, dispModel: number, state: iLcdMainState | undefined, 
    points: boolean, config: iConf, data: iDat, alarms: iAlrms
): iLcdMainState {
    const color = lcdColors();
    const localPres = config.units.pres;
    const dispIsOn = data.dispState ? !!data.dispState[0] : true;

    if(dispIsOn) {
        if(!state?.skeleton) lcdDrawSkeleton(ctx, dispModel, color.FRAME, color.BG);
        lcdShowClockPoints(ctx, points ? color.CLOCK : color.BG, dispModel);

        const prevState: iLcdMainState = {
            skeleton: true,
            sequence: lcdGetSequence(state?.sequence, config, data),
            time: lcdShowTime(ctx, dispModel, state?.time, color.BG, config, data),
            weekday: lcdShowWeekday(ctx, dispModel, state?.weekday, color.CLOCK, color.BG, data),
            ant: lcdShowAntenna(ctx, dispModel, state?.ant, data),
            bat: lcdShowBatteryLevel(ctx, dispModel, state?.bat, color.BG, config, data),
            volt: lcdShowVoltageOrPercentage(ctx, dispModel, state?.volt, color.BATTERY, color.TEMP_MIN, color.BG, config, data),
            comfort: lcdShowComfort(ctx, dispModel, state?.comfort[0], state?.comfort[1], state?.sequence.descript, color.TEXT, color.BG, config),
            icon: lcdShowWeatherIcon(ctx, dispModel, state?.icon, data),
            descript: lcdShowDescription(ctx, dispModel, state?.descript[0], state?.descript[1], color.TEXT, color.BG, data),
            tempIn: lcdShowTemperatureInside(ctx, dispModel, state?.tempIn, state?.sequence.temp, color.TEMP, color.BG, config, data),
            tempOut: lcdShowTemperatureOutside(ctx, dispModel, state?.tempOut, color.TEMP, color.BG, config, data),
            humIn: lcdShowHumidityInside(ctx, dispModel, state?.humIn, state?.sequence.hum, color.HUM, color.BG, config, data),
            humOut: lcdShowHumidityOutside(ctx, dispModel, state?.humOut, color.HUM, color.BG, config, data),
            presOut: lcdShowPressure(ctx, dispModel, state?.presOut, color.PRES, color.BG, localPres, config, data),
            windSpeed: lcdShowWindSpeed(ctx, dispModel, state?.windSpeed, color.TEXT, color.BG, config, data),
            windDirection: lcdShowWindDirection(ctx, dispModel, state?.windDirection, color.BG, config, data),
            updTime: lcdShowUpdTime(ctx, dispModel, state?.updTime, color.TEXT, color.BG, config, data),
            alarmState: lcdShowAlarmIcon(ctx, dispModel, state?.alarmState, alarms),
            forecast: { wd: [], tMax: [], tMin: [], wSpeed: [], icon: [] }
        };

        let days = 4; // NX4832K(T)035
        switch(dispModel) {
            case D.NX4827K043: days = 5; break;
            case D.ILI9341: days = 3; break;
        }
        for(let i=0; i<days; i++) {
            prevState.forecast = lcdShowForecast(ctx, dispModel, i, state?.forecast, color.TEXT, color.TEMP, color.TEMP_MIN, color.BG, data);
        }

        return prevState;
    }
    else {
        fillRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, color.BG);
        return {
            skeleton: false, sequence: { descript: "", temp: 0, hum: 0, slot: 0, counter: 0 }, time: 0,
            weekday: "", ant: "", bat: 0, volt: "", comfort: ["", 0], icon: 0, descript: ["", 0], tempIn: 0,
            tempOut: 0, humIn: 0, humOut: 0, presOut: 0, windSpeed: 0, windDirection: 0, updTime: 0, alarmState: false,
            forecast: { wd: ["", "", "", ""], tMax: [0, 0, 0, 0], tMin: [0, 0, 0, 0], wSpeed: [0, 0, 0, 0], icon: [0, 0, 0, 0] }
        }
    }
}