import i18n from '../../i18n/main';
import BME280 from '../../atoms/indications/BME280';
import BMP180 from '../../atoms/indications/BMP180';
import SHT21 from '../../atoms/indications/SHT21';
import DHT22 from '../../atoms/indications/DHT22';
import DS18B20 from '../../atoms/indications/DS18B20';
import MAX44009 from '../../atoms/indications/MAX44009';
import BH1750 from '../../atoms/indications/BH1750';
import Analog from '../../atoms/indications/analog';

export default function CardStatusSensors() {
    return <div className='text-center'>
        <h2 className='text-xl'>{i18n.t('sensor.plural')}</h2>
        <div className='mt-4'>
            BME280: <span className="text-blue-700 dark:text-blue-400">
                {BME280().temp}, {BME280().hum}, {BME280().pres}
            </span>
        </div>
        <div className='mt-4'>
            BMP180: <span className="text-blue-700 dark:text-blue-400">
                {BMP180().temp}, {BMP180().pres}
            </span>
        </div>
        <div className='mt-4'>
            SHT21: <span className="text-blue-700 dark:text-blue-400">
                {SHT21().temp}, {SHT21().hum}
            </span>
        </div>
        <div className='mt-4'>
            DHT22: <span className="text-blue-700 dark:text-blue-400">
                {DHT22().temp}, {DHT22().hum}
            </span>
        </div>
        <div className='mt-4'>
            DS18B20: <span className="text-blue-700 dark:text-blue-400">
                {DS18B20().temp}
            </span>
        </div>
        <div className='mt-4'>
            MAX44009: <span className="text-blue-700 dark:text-blue-400">
                {MAX44009().light}
            </span>
        </div>
        <div className='mt-4'>
            BH1750: <span className="text-blue-700 dark:text-blue-400">
                {BH1750().light}
            </span>
        </div>
        <div className='mt-4'>
            {i18n.t('analogInput')}: <span className="text-blue-700 dark:text-blue-400">
                {Analog().volt}
            </span>
        </div>
    </div>
}