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
import * as D from './displayTypes';
import type { iLcdMainState } from '../../interfaces';

export function displayLcdMainScreen(
    ctx: CanvasRenderingContext2D, dispModel: number, 
    state: iLcdMainState | undefined, points: boolean, localPres: number
): iLcdMainState {
    const color = lcdColors();

    if(!state?.skeleton) lcdDrawSkeleton(ctx, dispModel, color.FRAME, color.BG);
    lcdShowClockPoints(ctx, points ? color.CLOCK : color.BG, dispModel);

    const prevState: iLcdMainState = {
        skeleton: true,
        sequence: lcdGetSequence(state?.sequence),
        time: lcdShowTime(ctx, dispModel, state?.time, color.BG),
        weekday: lcdShowWeekday(ctx, dispModel, state?.weekday, color.CLOCK, color.BG),
        ant: lcdShowAntenna(ctx, dispModel, state?.ant),
        bat: lcdShowBatteryLevel(ctx, dispModel, state?.bat, color.BG),
        volt: lcdShowVoltageOrPercentage(ctx, dispModel, state?.volt, color.BATTERY, color.TEMP_MIN, color.BG),
        comfort: lcdShowComfort(ctx, dispModel, state?.comfort[0], state?.comfort[1], state?.sequence.descript, color.TEXT, color.BG),
        icon: lcdShowWeatherIcon(ctx, dispModel, state?.icon),
        descript: lcdShowDescription(ctx, dispModel, state?.descript[0], state?.descript[1], color.TEXT, color.BG),
        tempIn: lcdShowTemperatureInside(ctx, dispModel, state?.tempIn, state?.sequence.temp, color.TEMP, color.BG),
        tempOut: lcdShowTemperatureOutside(ctx, dispModel, state?.tempOut, color.TEMP, color.BG),
        humIn: lcdShowHumidityInside(ctx, dispModel, state?.humIn, state?.sequence.hum, color.HUM, color.BG),
        humOut: lcdShowHumidityOutside(ctx, dispModel, state?.humOut, color.HUM, color.BG),
        presOut: lcdShowPressure(ctx, dispModel, state?.presOut, color.PRES, color.BG, localPres),
        windSpeed: lcdShowWindSpeed(ctx, dispModel, state?.windSpeed, color.TEXT, color.BG),
        windDirection: lcdShowWindDirection(ctx, dispModel, state?.windDirection, color.BG),
        updTime: lcdShowUpdTime(ctx, dispModel, state?.updTime, color.TEXT, color.BG),
        alarmState: lcdShowAlarmIcon(ctx, dispModel, state?.alarmState),
        forecast: { wd: [], tMax: [], tMin: [], wSpeed: [], icon: [] }
    };

    let days = 4; // NX4832K(T)035
    switch(dispModel) {
        case D.NX4827K043: days = 5; break;
        case D.ILI9341: days = 3; break;
    }
    for(let i=0; i<days; i++) {
        prevState.forecast = lcdShowForecast(ctx, dispModel, i, state?.forecast, color.TEXT, color.TEMP, color.TEMP_MIN, color.BG);
    }

    return prevState;
}