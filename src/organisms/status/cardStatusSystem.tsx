import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import i18n from '../../i18n/main';
import { useSelector } from 'react-redux';
import { validateTemperature } from '../../atoms/validateValues';
import { iConfig } from "../../redux/configTypes";
import { iData } from '../../redux/dataTypes';

export default function CardStatusSystem() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const locale = config.lang === 'ua' ? 'uk' : config.lang;

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
        <div className='mt-4'>
            <p>{i18n.t('esp32Temp')}</p>
            <p className='text-blue-700 dark:text-blue-400'>
                {validateTemperature(data.esp32.temp) 
                    ? (data.esp32.temp + config.sensors.esp32.t).toFixed(1) 
                    : '--'
                }°C
            </p>
        </div>
        <div className='mt-4'>
            <p>{i18n.t('runtime')}</p>
            <p className='text-blue-700 dark:text-blue-400'>
                {humanizeDuration(data.runtime * 1000, {
                    language: locale, 
                    units: ["y", "mo", "d", "h", "m", "s"]
                })}
            </p>
        </div>
        <div className='mt-4'>
            <p>{i18n.t('systemTimeAndDate')}</p>
            <p className='text-blue-700 dark:text-blue-400'>
                {moment(data.time * 1000).utc().format('HH:mm:ss DD.MM.YYYY')}
            </p>
        </div>
    </div>
}