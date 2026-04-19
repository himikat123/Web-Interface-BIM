import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import i18n from '../../i18n/main';
import { useSelector } from 'react-redux';
import device from '../../device';
import { validateTemperature } from '../../atoms/validateValues';
import { iConfig } from "../../redux/configTypes";
import { iData } from '../../redux/dataTypes';

export default function CardStatusSystem() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const locale = config.lang === 'ua' ? 'uk' : config.lang;
    moment.locale(locale);

    let hourFormat;
    switch(config.clock.format) {
        case 0: hourFormat = 'h'; break;
        case 1: hourFormat = 'hh'; break;
        case 2: hourFormat = 'H'; break;
        default: hourFormat = 'HH'; break;
    }

    const esp32T = (data.esp32?.temp ?? 0) + (config.sensors.esp32?.t ?? 0);
    const esp32Temp = validateTemperature(data.esp32?.temp ?? 40400) 
        ? esp32T.toFixed(1) 
        : '--';

    return <div className='text-center'>
        <h2 className='text-xl'>{i18n.t('system')}</h2>
        <div className='mt-4'>
            <p>{i18n.t('webInterfaceVersion')}</p>
            <p className='text-blue-700 dark:text-blue-400'>v{process.env.REACT_APP_VERSION}</p>
        </div>
        <div className='mt-4'>
            <p>{i18n.t('firmwareVersion')}</p>
            <p className='text-blue-700 dark:text-blue-400'>{data.fw}</p>
        </div>
        {device() === 'WeatherMonitorBIM32' && <div className='mt-4'>
            <p>{i18n.t('esp32Temp')}</p>
            <p className='text-blue-700 dark:text-blue-400'>{esp32Temp}°C</p>
        </div>}
        <div className='mt-4'>
            <p>{i18n.t('runtime')}</p>
            <p className='text-blue-700 dark:text-blue-400'>
                {humanizeDuration(data.runtime * 1000, {
                    conjunction: ` ${i18n.t('and')} `,
                    serialComma : false,
                    language: locale, 
                    units: ["y", "mo", "d", "h", "m", "s"],
                    largest: 3
                })}
            </p>
        </div>
        <div className='mt-4'>
            <p>{i18n.t('systemTimeAndDate')}</p>
            <p className='text-blue-700 dark:text-blue-400'>
                <div>
                    {moment(data.time * 1000).utc().format(`🕐 ${hourFormat}:mm:ss`)}
                </div>
                <div>
                    {moment(data.time * 1000).utc().format(`🗓 L`)}
                </div>
            </p>
        </div>

        {device() === 'WeatherMonitorBIM' && <div className='mt-4'>
            <p>{i18n.t('fileSystem')}</p>
            <p className='text-blue-700 dark:text-blue-400'>
                {i18n.numberToHumanSize(data.fs.free)} {i18n.t('freeOf')} {i18n.numberToHumanSize(data.fs.total)}
            </p>
        </div>}
    </div>
}