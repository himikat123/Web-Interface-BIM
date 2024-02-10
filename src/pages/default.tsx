import React, { useRef, useState, useEffect } from "react";
import i18n from '../i18n/main';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import OneColumn from "../templates/oneColumn";
import Card from "../atoms/card";
import Button from "../atoms/button";
import hostUrl from "../atoms/hostUrl";
import { ReactComponent as SpinnerSVG } from '../atoms/icons/spinner.svg';

const Default = () => {
    const [saveButton, setSaveButton] = useState<string>('resetToFactory');
    const [saveColor, setSaveColor] = useState<string>('blue');
    const [defaultConfig, setDefaultConfig] = useState<string>('');
    const timeout = useRef<ReturnType<typeof setInterval> | null>(null);

    const restore = () => {
        if(saveButton === 'resetToFactory') {
            clearTimeout(timeout.current ?? undefined);
            setSaveColor('yellow');
            setSaveButton('saving');
            
            fetch(`${hostUrl()}/esp/defaultConfig`, { 
                method: 'post',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'config:default' 
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
                setSaveButton('resetToFactory');
            }, 5000);
        }

        return () => window.clearTimeout(timeout.current ?? undefined);
    }, [saveButton]);

    useEffect(() => {
        fetch('./defaultConfig.json')
        .then(res => res.text())
        .then((result: string) => {
            setDefaultConfig(JSON.stringify(JSON.parse(result), undefined, 2))
        })
    }, []);

    const theme = window.document.documentElement.classList[0] == 'dark' ? vs2015 : xcode;

    const content = <>
        <Card header={i18n.t('fileContents')}
            content={<div className="max-h-96 overflow-y-scroll">
                <SyntaxHighlighter language="json" style={theme}>
                    {defaultConfig}
                </SyntaxHighlighter>
            </div>} 
        />

        <div className="mt-8 text-center">
            <Button className={
                    ('filenameOK' 
                        ? `bg-${saveColor}-600 hover:bg-${saveColor}-700 text-text_dark` 
                        : "bg-blue-200 dark:bg-blue-900 text-blue-100 dark:text-blue-600 cursor-not-allowed"
                    )
                }
                disabled={!'filenameOK'}
                label={<div className="flex justify-center">
                    {i18n.t(saveButton)}
                    {saveButton === "saving" && <div className="ms-4 w-6 h-6"><SpinnerSVG /></div>}
                </div>}
                onClick={() => restore()}
            />
        </div>
    </>

    return <>
        <OneColumn navbar={true}
            header={[i18n.t('defaultSettings')]} 
            content={[content]} 
            buttons={['reset']} 
        />
    </>
}

export default Default;