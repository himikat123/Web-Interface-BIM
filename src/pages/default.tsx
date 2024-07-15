import { useRef, useState, useEffect } from "react";
import i18n from '../i18n/main';
import { JsonView, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import OneColumn from "../templates/oneColumn";
import Card from "../atoms/card";
import Button from "../atoms/button";
import hostUrl from "../atoms/hostUrl";
import { ReactComponent as SpinnerSVG } from '../atoms/icons/spinner.svg';
import { IsJsonString } from "./modalFileViewer";
import StepsAnimation from "../atoms/stepsAnimation";

export default function Default() {
    // TODO в просмотрщике json файлов сворачивается код каждые 10 секунд
    const [saveButton, setSaveButton] = useState<string>('resetToFactory');
    const [saveColor, setSaveColor] = useState<string>('blue');
    const [defaultConfig, setDefaultConfig] = useState<object>({});
    const timeout = useRef<ReturnType<typeof setInterval> | null>(null);

    const restore = async() => {
        if(saveButton === 'resetToFactory') {
            clearTimeout(timeout.current ?? undefined);
            setSaveColor('yellow');
            setSaveButton('saving');

            let data = new FormData();
            data.append("config", "default");
            data.append("code", localStorage.getItem('code') || '0');
            
            try {
                const response = await fetch(`${hostUrl()}/esp/defaultConfig`, {
                    method: "POST",
                    body: data
                });
                const result = await response.text();
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
            } 
            catch (error) {
                setSaveColor('red');
                setSaveButton('notSaved');
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if(saveButton === 'notSaved' || saveButton === 'saved') {
            timeout.current = setTimeout(() => {
                setSaveColor('blue');
                setSaveButton('resetToFactory');
            }, 5000);
        }

        return () => window.clearTimeout(timeout.current ?? undefined);
    }, [saveButton]);

    useEffect(() => {
        fetch(`./defaultConfig.json?code=${localStorage.getItem('code') || '0'}`)
        .then(res => res.text())
        .then((result: string) => {
            if(IsJsonString(result)) setDefaultConfig(JSON.parse(result))
        })
    }, []);

    const theme = window.document.documentElement.classList[0] === 'dark' ? darkStyles : defaultStyles;

    const content = <>
        <Card header={i18n.t('fileContents')}
            content={<div className="max-h-96 overflow-y-scroll">
                {Object.keys(defaultConfig).length === 0
                    ? <div className="flex justify-center items-center h-24"><StepsAnimation /></div>
                    : <JsonView data={defaultConfig} shouldExpandNode={level => level === 0} style={theme} />
                }
            </div>} 
        />

        <div className="mt-8 text-center">
            <Button className={`bg-${saveColor}-600 hover:bg-${saveColor}-700 text-text_dark`}
                label={<div className="flex justify-center">
                    {i18n.t(saveButton)}
                    {saveButton === "saving" && <div className="ms-4 w-6 h-6"><SpinnerSVG /></div>}
                </div>}
                onClick={() => restore()}
            />
        </div>
    </>

    return <OneColumn navbar={true}
        header={[i18n.t('defaultSettings')]} 
        content={[content]} 
        buttons={['reset']} 
        full
    />
}