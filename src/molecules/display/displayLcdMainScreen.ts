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
import { iLcdMainState } from '../../interfaces';

export function displayLcdMainScreen(
    ctx: CanvasRenderingContext2D, dispModel: number, 
    state: iLcdMainState | undefined, points: boolean, localTemp: number, localPres: number
): iLcdMainState {
    const color = lcdColors();

    if(!state?.skeleton) lcdDrawSkeleton(ctx, dispModel, color.FRAME, color.BG);
    lcdShowClockPoints(ctx, points ? color.HUM : color.BG);

    const prevState: iLcdMainState = {
        skeleton: true,
        sequence: lcdGetSequence(state?.sequence),
        time: lcdShowTime(ctx, state?.time, color.BG),
        weekday: lcdShowWeekday(ctx, dispModel, state?.weekday, color.CLOCK, color.BG),
        ant: lcdShowAntenna(ctx, dispModel, state?.ant),
        bat: lcdShowBatteryLevel(ctx, dispModel, state?.bat, color.BG),
        volt: lcdShowVoltageOrPercentage(ctx, dispModel, state?.volt, color.BATTERY, color.TEMP_MIN, color.BG, localTemp),
        comfort: lcdShowComfort(ctx, dispModel, state?.comfort[0], state?.comfort[1], state?.sequence.descript, color.TEXT, color.BG),
        icon: lcdShowWeatherIcon(ctx, dispModel, state?.icon),
        descript: lcdShowDescription(ctx, dispModel, state?.descript[0], state?.descript[1], color.TEXT, color.BG),
        tempIn: lcdShowTemperatureInside(ctx, dispModel, state?.tempIn, state?.sequence.temp, color.TEMP, color.BG, localTemp),
        tempOut: lcdShowTemperatureOutside(ctx, dispModel, state?.tempOut, color.TEMP, color.BG, localTemp),
        humIn: lcdShowHumidityInside(ctx, dispModel, state?.humIn, state?.sequence.hum, color.HUM, color.BG),
        humOut: lcdShowHumidityOutside(ctx, dispModel, state?.humOut, color.HUM, color.BG),
        presOut: lcdShowPressure(ctx, dispModel, state?.presOut, color.PRES, color.BG, localPres),
        windSpeed: lcdShowWindSpeed(ctx, dispModel, state?.windSpeed, color.TEXT, color.BG),
        windDirection: lcdShowWindDirection(ctx, dispModel, state?.windDirection, color.BG),
        updTime: lcdShowUpdTime(ctx, dispModel, state?.updTime, color.TEXT, color.BG),
        alarmState: lcdShowAlarmIcon(ctx, dispModel, state?.alarmState),
        forecast: { wd: [], tMax: [], tMin: [], wSpeed: [], icon: [] }
    };

    for(let i=0; i<(dispModel === 0 ? 4 : 3); i++) {
        prevState.forecast = lcdShowForecast(ctx, dispModel, i, state?.forecast, color.TEXT, color.TEMP, color.TEMP_MIN, color.BG, localTemp);
    }

    return prevState;
}