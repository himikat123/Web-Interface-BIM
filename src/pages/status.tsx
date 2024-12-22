import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import device from '../device';
import TwoColumns from "../templates/twoColumns";
import Card from "../atoms/card";
import CardStatusDisplay from '../organisms/status/cardStatusDisplay';
import CardStatusSensors from '../organisms/status/cardStatusSensors';
import CardStatusSystem from '../organisms/status/cardStatusSystem';
import CardStatusNetwork from '../organisms/status/cardStatusNetwork';
import { iData } from '../redux/dataTypes';

export default function Status() {
    const data = useSelector((state: iData) => state.data);
    const [gitFW, setGitFW] = useState<string>('');
    const [newFwFound, setNewFwFound] = useState<boolean>(false);
    const gitLink = 'https://github.com/himikat123/Weather-monitor-BIM32';
    
    useEffect(() => {
        const versionFile = device() === 'WeatherMonitorBIM32'
            ? "https://raw.githubusercontent.com/himikat123/Weather-monitor-BIM32/master/BIM32_Arduino/src/globals.hpp"
            : "https://raw.githubusercontent.com/himikat123/Weather-Monitor-BIM/master/BIM_Arduino/globals.hpp"
        fetch(versionFile)
        .then(response => response.text())
        .then(text => {
            try {
                let regex = device() === 'WeatherMonitorBIM' ? /fw\[7\] = "(v.+)"/gm : /FW "(v.+)"/gm;
                setGitFW(regex.exec(text)![1]);
            }
            catch(err) {console.log(err)}
        })
        .catch(err => {
            console.error(err);
        });
    }, [])

    useEffect(() => {
        const vg = parseFloat(gitFW.replace('v', ''));
        const vf = parseFloat(data.fw.replace('v', ''));
        setNewFwFound(vg > vf);
    }, [gitFW, data.fw]);

    const content = <>
        <Card content={<CardStatusDisplay num={0} />} />
        {device() === 'WeatherMonitorBIM32' && <Card content={<CardStatusDisplay num={1} />} />}
        {device() === 'WeatherMonitorBIM' && <Card content={<CardStatusSensors />} />}
        <Card content={<CardStatusSystem />} />
        <Card content={<CardStatusNetwork />} />
    </>;

    return <TwoColumns header={[<>
            <p className='text-center'>{i18n.t('status')}</p>
            {newFwFound && <div className='p-4'>
                <div className='text-base card border-2 border-menu_light dark:border-menu_dark bg-card_light dark:bg-card_dark rounded-lg p-6'>
                    {i18n.t('firmwareUpdateAppeared').replace('XXX', gitFW)}:<br />
                    <a href={gitLink} target="_blank" rel="noreferrer" className="text-blue-700 dark:text-blue-400">
                        <div dangerouslySetInnerHTML={{ __html: gitLink.replaceAll('/', '/&#173;') }} />
                    </a>
                </div>
            </div>}
        </>]} 
        content={[content]} 
        navbar={true}
        buttons={['reset']} 
    />
}