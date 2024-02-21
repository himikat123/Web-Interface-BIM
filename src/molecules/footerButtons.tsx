import React, { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import i18n from '../i18n/main';
import Button from "../atoms/button";
import ModalRestart from "../pages/modalRestart";
import hostUrl from "../atoms/hostUrl";
import { iFooterButtons } from "../interfaces";
import { iValid } from "../redux/validTypes";
import { iConfig } from "../redux/configTypes";
import { ReactComponent as SpinnerSVG } from '../atoms/icons/spinner.svg';

const FooterButtons = (props: iFooterButtons) => {
    const [saveButton, setSaveButton] = useState<string>('save');
    const [saveColor, setSaveColor] = useState<string>('blue');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const valid = useSelector((state: iValid) => state.valid);
    const areAllPagesValid = !Object.values(valid).includes(false);
    const config = useSelector((state: iConfig) => state.config);
    const timeout = useRef<ReturnType<typeof setInterval> | null>(null);

    const Save_config = () => {
        if(saveButton === 'save') {
            clearTimeout(timeout.current ?? undefined);
            setSaveColor('yellow');
            setSaveButton('saving');
            
            const cfg = new URLSearchParams();
            cfg.append('config', JSON.stringify(config).replace('"configState":"ok",', ''));

            const pass = new URLSearchParams();
            pass.append('oldPass', JSON.stringify(props.passChange?.old));
            pass.append('newPass', JSON.stringify(props.passChange?.new));
            
            axios(`${hostUrl()}/esp/${props.passChange ? 'changePass' : 'saveConfig'}`, {
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: props.passChange
                    ? `oldPass=${props.passChange.old}&newPass=${props.passChange.new}` 
                    : `config=${JSON.stringify(config, null).replace('"configState":"ok",', '')}`
            })
            .then(res => {
                if(res.data === 'OK') {
                    setSaveColor('green');
                    setSaveButton('saved');
                }
                else {
                    setSaveColor('red');
                    setSaveButton('notSaved');
                    console.error(res.data);
                }
            })
            .catch(err => {
                setSaveColor('red');
                setSaveButton('notSaved');
                console.error(err);
            });
        }
    }

    useEffect(() => {
        if(saveButton === 'notSaved' || saveButton === 'saved') {
            timeout.current = setTimeout(() => {
                setSaveColor('blue');
                setSaveButton('save');
            }, 5000);
        }

        return () => window.clearTimeout(timeout.current ?? undefined);
    }, [saveButton]);

    return (<>
        <div className="flex flex-col sm:flex-row justify-center w-full p-8">
            {(props.buttons.includes('save')) && <Button 
                className={
                    (areAllPagesValid 
                        ? `bg-${saveColor}-600 hover:bg-${saveColor}-700 text-text_dark` 
                        : "bg-blue-200 dark:bg-blue-900 text-blue-100 dark:text-blue-600 cursor-not-allowed"
                    )
                }
                disabled={!areAllPagesValid}
                label={<div className="flex justify-center">
                    {i18n.t(saveButton)}
                    {saveButton === "saving" && <div className="ms-4 w-6 h-6"><SpinnerSVG /></div>}
                </div>}
                onClick={() => {Save_config()}}
            />}

            {props.buttons.includes('reset') && <Button 
                className="bg-red-600 hover:bg-red-700 text-text_dark"
                label={i18n.t('restart')}
                onClick={() => {setModalOpen(true)}}
            />}
        </div>

        {modalOpen && <ModalRestart modalClose={() => {
            document.querySelector('body')?.classList.remove('modal-open');
            setModalOpen(false);
        }} />}
    </>);
}

export default FooterButtons;