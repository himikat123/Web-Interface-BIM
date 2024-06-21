import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import TwoColumns from "../templates/twoColumns";
import Card from "../atoms/card";
import CardStatusDisplay from '../organisms/cardStatusDisplay';
import CardStatusSystem from '../organisms/cardStatusSystem';
import CardStatusNetwork from '../organisms/cardStatusNetwork';
import { iData } from '../redux/dataTypes';

export default function Status() {
    const data = useSelector((state: iData) => state.data);
    const [gitFW, setGitFW] = useState<string>('');
    const [newFwFound, setNewFwFound] = useState<boolean>(false);
    const gitLink = 'https://github.com/himikat123/Weather-monitor-BIM32';
    
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/himikat123/Weather-monitor-BIM32/master/BIM32/globals.hpp")
        .then(response => response.text())
        .then(text => {
            let regex = /] = "(v.+)"/gm;
            setGitFW(regex.exec(text)![1]);
        });
    }, [])

    useEffect(() => {
        const vg = parseFloat(gitFW.replace('v', ''));
        const vf = parseFloat(data.fw.replace('v', ''));
        setNewFwFound(vg > vf);
    }, [gitFW, data.fw]);

    const content = <>
        <Card content={<CardStatusDisplay num={0} />} />
        <Card content={<CardStatusDisplay num={1} />} />
        <Card content={<CardStatusSystem />} />
        <Card content={<CardStatusNetwork />} />
    </>;

    return <TwoColumns header={[<>
            <p className='text-center'>{i18n.t('status')}</p>
            {newFwFound && <div className='p-4'>
                <p className='text-base card border-2 border-menu_light dark:border-menu_dark bg-card_light dark:bg-card_dark rounded-lg p-6'>
                    {i18n.t('firmwareUpdateAppeared').replace('XXX', gitFW)}:<br />
                    <a href={gitLink} target="_blank" rel="noreferrer" className="text-blue-700 dark:text-blue-400">
                        <div dangerouslySetInnerHTML={{ __html: gitLink.replaceAll('/', '/&#173;') }} />
                    </a>
                </p>
            </div>}
        </>]} 
        content={[content]} 
        navbar={true}
        buttons={['reset']} 
    />
}