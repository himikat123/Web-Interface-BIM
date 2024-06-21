import { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import Button from "../atoms/button";
import ModalRestart from "../pages/modalRestart";
import hostUrl from "../atoms/hostUrl";
import { iFooterButtons } from "../interfaces";
import { iValid } from "../redux/validTypes";
import { iConfig } from "../redux/configTypes";
import { ReactComponent as SpinnerSVG } from '../atoms/icons/spinner.svg';

export default function FooterButtons(props: iFooterButtons) {
    const [saveButton, setSaveButton] = useState<string>('save');
    const [saveColor, setSaveColor] = useState<string>('blue');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const valid = useSelector((state: iValid) => state.valid);
    const areAllPagesValid = !Object.values(valid).includes(false);
    const config = useSelector((state: iConfig) => state.config);
    const timeout = useRef<ReturnType<typeof setInterval> | null>(null);

    async function Save_config() {
        if(saveButton === 'save') {
            clearTimeout(timeout.current ?? undefined);
            setSaveColor('yellow');
            setSaveButton('saving');
            
            let data = new FormData();
            if(props.passChange) {
                data.append("oldPass", props.passChange.old);
                data.append("newPass", props.passChange.new);
            }
            else data.append("config", JSON.stringify(config).replace('"configState":"ok",', ''));
            try {
                const response = await fetch(`${hostUrl()}/esp/${props.passChange ? 'changePass' : 'saveConfig'}`, {
                  method: "POST",
                  body: data
                });
                const result = await response.text();
                if(result === 'OK') {
                    setSaveColor('green');
                    setSaveButton('saved');
                }
                else {
                    setSaveColor('red');
                    setSaveButton('notSaved');
                    console.error(result);
                }
            } catch (error) {
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
                setSaveButton('save');
            }, 5000);
        }

        return () => window.clearTimeout(timeout.current ?? undefined);
    }, [saveButton]);

    return <>
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
    </>
}