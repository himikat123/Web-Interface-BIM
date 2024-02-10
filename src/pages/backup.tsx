import React, { useRef, useState, useEffect } from "react";
import i18n from '../i18n/main';
import TwoColumns from "../templates/twoColumns";
import Card from "../atoms/card";
import Button from "../atoms/button";
import hostUrl from "../atoms/hostUrl";
import { ReactComponent as SpinnerSVG } from '../atoms/icons/spinner.svg';

const Backup = () => {
    const [saveButton, setSaveButton] = useState<string>('restore');
    const [saveColor, setSaveColor] = useState<string>('blue');
    const [filenameOK, setFilenameOK] = useState<boolean>(false);
    const [file, setFile] = useState<string>('');
    const timeout = useRef<ReturnType<typeof setInterval> | null>(null);
    let fileReader: any;

    const handleFileRead = (e: any) => {
        const content: string = fileReader.result;
        setFile(JSON.stringify(JSON.parse(content)));
    };

    const changedFile = (event: any) => {
        setFilenameOK(event.target.files[0].name === 'config.json');
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(event.target.files[0]);
    }

    const restore = () => {
        if(saveButton === 'restore') {
            clearTimeout(timeout.current ?? undefined);
            setSaveColor('yellow');
            setSaveButton('saving');
            
            fetch(`${hostUrl()}/esp/saveConfig`, { 
                method: 'post',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'config:' + file 
            })
            .then(res => res.text())
            .then((result) => {
                if(result === 'OK') {
                    setSaveColor('green');
                    setSaveButton('saved');
                    window.location.reload();
                }
                else {
                    setSaveColor('red');
                    setSaveButton('notSaved');
                    console.error(result);
                }
            }, 
            (error) => {
                setSaveColor('red');
                setSaveButton('notSaved');
                console.error(error);
            })
        }
    }

    useEffect(() => {
        if(saveButton === 'notSaved' || saveButton === 'saved') {
            timeout.current = setTimeout(() => {
                setSaveColor('blue');
                setSaveButton('restore');
            }, 5000);
        }

        return () => window.clearTimeout(timeout.current ?? undefined);
    }, [saveButton]);

    const content = <>
        <Card header={i18n.t('downloadSettingsBackupFile')}
            content={<>
                <div className="h-14 w-full rounded-md border border-menu_light dark:border-menu_dark px-3.5 py-4 outline-none bg-card_light dark:bg-card_dark">
                    config.json
                </div>

                <div className="mt-10 md:mt-28 flex justify-center">
                    <a href="/config.json"
                        className={'focus:ring-4 focus:ring-blue-300 py-2 px-4 my-2 sm:mx-4 rounded text-text_dark bg-green-600 hover:bg-green-700'}
                        download
                    >
                        {i18n.t('download')}
                    </a>
                </div>
            </>} 
        />

        <Card header={i18n.t('restoreSettingsFromBackupFile')} 
            content={<>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">{i18n.t('clickToSelectFile')}</span> {i18n.t('orDragAndDrop')}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">config.json</p>
                        </div>
                        <input id="file" 
                            type="file" 
                            className="hidden"
                            accept=".json" 
                            onChange={(e) => changedFile(e)}
                        />
                    </label>
                </div>

                <div className="mt-10 flex justify-center">
                    <Button className={
                            (filenameOK 
                                ? `bg-${saveColor}-600 hover:bg-${saveColor}-700 text-text_dark` 
                                : "bg-blue-200 dark:bg-blue-900 text-blue-100 dark:text-blue-600 cursor-not-allowed"
                            )
                        }
                        disabled={!filenameOK}
                        label={<div className="flex justify-center">
                            {i18n.t(saveButton)}
                            {saveButton === "saving" && <div className="ms-4 w-6 h-6"><SpinnerSVG /></div>}
                        </div>}
                        onClick={() => restore()}
                    />
                </div>
            </>}
        />
    </>

    return <>
        <TwoColumns navbar={true}
            header={[i18n.t('backup')]} 
            content={[content]} 
            buttons={['reset']} 
        />
    </>
}

export default Backup;