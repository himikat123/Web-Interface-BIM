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
import { iLcdMainState } from '../interfaces';

export function displayLcdMainScreen(ctx: CanvasRenderingContext2D, 
    dispModel: number, state: iLcdMainState | undefined, points: boolean
): iLcdMainState {

    const BG_COLOR          = '#000';
    const TEXT_COLOR        = '#FFF';
    const TEMPERATURE_COLOR = '#FF0';
    const TEMP_MIN_COLOR    = '#F80';
    const HUMIDITY_COLOR    = '#0FF';
    const PRESSURE_COLOR    = '#F5F';
    const CLOCK_COLOR       = '#0F0';
    const BATTERY_COLOR     = '#0F0';
    const FRAME_COLOR       = '#00F';

    if(!state?.skeleton) lcdDrawSkeleton(ctx, FRAME_COLOR, BG_COLOR);
    lcdShowClockPoints(ctx, points ? HUMIDITY_COLOR : BG_COLOR);

    const prevState: iLcdMainState = {
        skeleton: true,
        sequence: lcdGetSequence(state?.sequence),
        time: lcdShowTime(ctx, state?.time, BG_COLOR),
        weekday: lcdShowWeekday(ctx, state?.weekday, CLOCK_COLOR, BG_COLOR),
        ant: lcdShowAntenna(ctx, state?.ant),
        bat: lcdShowBatteryLevel(ctx, state?.bat, BG_COLOR),
        volt: lcdShowVoltageOrPercentage(ctx, state?.volt, BATTERY_COLOR, TEMP_MIN_COLOR, BG_COLOR),
        comfort: lcdShowComfort(ctx, state?.comfort[0], state?.comfort[1], state?.sequence.descript, TEXT_COLOR, BG_COLOR),
        icon: lcdShowWeatherIcon(ctx, state?.icon),
        descript: lcdShowDescription(ctx, state?.descript[0], state?.descript[1], TEXT_COLOR, BG_COLOR),
        tempIn: lcdShowTemperatureInside(ctx, state?.tempIn, state?.sequence.temp, TEMPERATURE_COLOR, BG_COLOR),
        tempOut: lcdShowTemperatureOutside(ctx, state?.tempOut, TEMPERATURE_COLOR, BG_COLOR),
        humIn: lcdShowHumidityInside(ctx, state?.humIn, state?.sequence.hum, HUMIDITY_COLOR, BG_COLOR),
        humOut: lcdShowHumidityOutside(ctx, state?.humOut, HUMIDITY_COLOR, BG_COLOR),
        presOut: lcdShowPressure(ctx, state?.presOut, PRESSURE_COLOR, BG_COLOR),
        windSpeed: lcdShowWindSpeed(ctx, state?.windSpeed, TEXT_COLOR, BG_COLOR),
        windDirection: lcdShowWindDirection(ctx, state?.windDirection, BG_COLOR),
        updTime: lcdShowUpdTime(ctx, state?.updTime, TEXT_COLOR, BG_COLOR),
        alarmState: lcdShowAlarmIcon(ctx, state?.alarmState, BG_COLOR),
        forecast: { wd: [], tMax: [], tMin: [], wSpeed: [], icon: [] }
    };

    for(let i=0; i<(dispModel === 0 ? 4 : 3); i++) {
        prevState.forecast = lcdShowForecast(ctx, i, state?.forecast, TEXT_COLOR, TEMPERATURE_COLOR, TEMP_MIN_COLOR, BG_COLOR);
    }

    return prevState;
}