import React, { useState } from "react";
import i18n from '../i18n/main';
import Button from "../atoms/button";
import ModalRestart from "../modals/restart";
import { iFooterButtons } from "../interfaces";

const FooterButtons = (props: iFooterButtons) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (<>
        <div className="flex flex-col sm:flex-row justify-center w-full p-8">
            {(props.buttons.includes('save') || props.buttons.includes('nsave')) && <Button 
                className={
                    (props.buttons.includes('save') 
                        ? "bg-blue-600 hover:bg-blue-700 text-text_dark" 
                        : "bg-blue-200 dark:bg-blue-900 text-blue-100 dark:text-blue-600 cursor-not-allowed"
                    )
                }
                disabled={props.buttons.includes('nsave')}
                label={i18n.t('save')}
                onClick={() => {}}
            />}

            {props.buttons.includes('reset') && <Button 
                className="bg-red-500 hover:bg-red-700 text-text_dark "
                label={i18n.t('restart')}
                onClick={() => {setModalOpen(true)}}
            />}
        </div>

        {modalOpen && <ModalRestart modalClose={() => setModalOpen(false)} />}
    </>);
}

export default FooterButtons;