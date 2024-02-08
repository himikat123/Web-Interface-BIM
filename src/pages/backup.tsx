import React from "react";
import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import TwoColumns from "../templates/twoColumns";
import Card from "../atoms/card";
import Button from "../atoms/button";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

const Backup = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const content = <>
        <Card header={i18n.t('downloadSettingsBackupFile')}
            content={<>
                <div className="h-14 w-full rounded-md border border-menu_light dark:border-menu_dark px-3.5 py-4 outline-none bg-card_light dark:bg-card_dark">
                    config.json
                </div>

                <div className="mt-8 flex justify-center">
                    <Button label={i18n.t('download')}
                        className={'text-text_dark bg-green-600 hover:bg-green-700'}
                        onClick={() => {}}
                    />
                </div>
            </>} 
        />

        <Card content={<></>} />
    </>

    return <>
        <TwoColumns navbar={true}
            header={[i18n.t('backup')]} 
            content={[content]} 
            buttons={['save', 'reset']} 
        />
    </>
}

export default Backup;