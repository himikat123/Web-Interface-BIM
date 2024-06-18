import i18n from '../i18n/main';
import { useSelector } from 'react-redux';
import { iData } from '../redux/dataTypes';

export default function CardStatusNetwork() {
    const data = useSelector((state: iData) => state.data);

    return <div className='text-center'>
        <h2 className='text-xl'>{i18n.t('network')}</h2>
        <div className='mt-4'>
            <p>{i18n.t('networkName')}</p>
            <p className='text-blue-700 dark:text-blue-400'>{data.network.ssid}</p>
        </div>
        <div className='mt-4'>
            <p>{i18n.t('channelNumber')}</p>
            <p className='text-blue-700 dark:text-blue-400'>{data.network.ch}</p>
        </div>
        <div className='mt-4'>
            <p>{i18n.t('signalStrength')}</p>
            <p className='text-blue-700 dark:text-blue-400'>{data.network.sig}dB</p>
        </div>
        <div className='mt-4'>
            <p>{i18n.t('macAddress')}</p>
            <p className='text-blue-700 dark:text-blue-400'>{data.network.mac}
            </p>
        </div>
    </div>
}