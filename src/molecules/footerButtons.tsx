import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import Button from "../atoms/button";
import ModalRestart from "../pages/modalRestart";
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

    const Save_config = () => {
        setSaveColor('yellow');
        setSaveButton('saving');
        
        let origin = window.location.origin;
        let href = [origin.split(':')[0], origin.split(':')[1]].join(':');
        fetch(`${href}/esp/saveConfig`, { 
            method: 'post', 
            mode: 'cors',
            body: 'config:' + JSON.stringify(config) 
        })
        .then(res => res.text())
        .then((result) => {
            if(result === 'OK') {
                setSaveColor('green');
                setSaveButton('saved');
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
            }
        )
    }

    useEffect(() => {
        if(saveButton === 'notSaved') {
            setTimeout(() => {
                setSaveColor('blue');
                setSaveButton('save');
            }, 5000);
        }
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
                label={<div className="flex">
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

        {modalOpen && <ModalRestart modalClose={() => setModalOpen(false)} />}
    </>);
}

export default FooterButtons;