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

const BUTTON_STYLES = {
    resetToFactory: "bg-blue-600 hover:bg-blue-700",
    saving: "bg-yellow-600 hover:bg-yellow-700",
    saved: "bg-green-600 hover:bg-green-700",
    notSaved: "bg-red-600 hover:bg-red-700"
};

type ButtonStatus = keyof typeof BUTTON_STYLES;

const shouldExpandZeroLevel = (level: number) => level === 0;

export default function Default() {
    const [saveButton, setSaveButton] = useState<ButtonStatus>('resetToFactory');
    const [defaultConfig, setDefaultConfig] = useState<object>({});
    const timeout = useRef<ReturnType<typeof setInterval> | null>(null);

    const restore = async() => {
        if(saveButton !== 'resetToFactory') return;

        clearTimeout(timeout.current ?? undefined);
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
                setSaveButton('saved');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } 
            else {
                setSaveButton('notSaved');
                console.error(result);
            }
        } 
        catch (error) {
            setSaveButton('notSaved');
            console.error(error);
        }
    }

    useEffect(() => {
        if(saveButton === 'notSaved') {
            timeout.current = setTimeout(() => {
                setSaveButton('resetToFactory');
            }, 5000);
        }

        return () => window.clearTimeout(timeout.current ?? undefined);
    }, [saveButton]);

    useEffect(() => {
        fetch(`${hostUrl()}/defaultConfig.json?code=${localStorage.getItem('code') || '0'}`)
        .then(res => res.text())
        .then((result: string) => {
            if (IsJsonString(result)) setDefaultConfig(JSON.parse(result));
        })
        .catch(console.error);
    }, []);

    const theme = window.document.documentElement.classList.contains('dark') ? darkStyles : defaultStyles;

    const content = <>
        <Card header={i18n.t('fileContents')}
            content={
                <div className="max-h-96 overflow-y-scroll">
                    {Object.keys(defaultConfig).length === 0 
                        ? <div className="flex justify-center items-center h-24">
                            <StepsAnimation />
                        </div>
                        : <JsonView data={defaultConfig} shouldExpandNode={shouldExpandZeroLevel} style={theme} />
                    }
                </div>
            } 
        />

        <div className="mt-8 text-center">
            <Button className={`${BUTTON_STYLES[saveButton]} text-text_dark`}
                label={<div className="flex justify-center items-center">
                    {i18n.t(saveButton)}
                    {saveButton === "saving" && <div className="ms-4 w-6 h-6 animate-spin">
                        <SpinnerSVG />
                    </div>}
                </div>}
                onClick={() => restore()}
                disabled={saveButton !== 'resetToFactory'}
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