import React, { useState } from "react";
import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import Button from "../atoms/button";
import ModalRestart from "../pages/modalRestart";
import { iFooterButtons } from "../interfaces";
import { iValid } from "../redux/validTypes";

const FooterButtons = (props: iFooterButtons) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const valid = useSelector((state: iValid) => state.valid);
    const areAllPagesValid = !Object.values(valid).includes(false);

    return (<>
        <div className="flex flex-col sm:flex-row justify-center w-full p-8">
            {(props.buttons.includes('save')) && <Button 
                className={
                    (areAllPagesValid 
                        ? "bg-blue-600 hover:bg-blue-700 text-text_dark" 
                        : "bg-blue-200 dark:bg-blue-900 text-blue-100 dark:text-blue-600 cursor-not-allowed"
                    )
                }
                disabled={!areAllPagesValid}
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