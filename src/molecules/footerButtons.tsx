import React from "react";
import i18n from '../i18n/main';
import Button from "../atoms/button";
import { iFooterButtons } from "../interfaces";

const FooterButtons = (props: iFooterButtons) => {
    return (<div className="flex flex-col sm:flex-row justify-center w-full p-8">
        {(props.buttons.includes('save') || props.buttons.includes('nsave')) && <Button 
            className={
                (props.buttons.includes('save') 
                    ? "bg-blue-600 hover:bg-blue-700 text-text_dark" 
                    : "bg-blue-200 dark:bg-blue-900 text-blue-100 dark:text-blue-600"
                )
            }
            disabled={props.buttons.includes('nsave')}
            label={i18n.t('save')}
            onClick={() => {}}
        />}

        {props.buttons.includes('reset') && <Button 
            className="bg-gray-500 hover:bg-gray-700 text-text_dark "
            label={i18n.t('restart')}
            onClick={() => {}}
        />}
    </div>);
}

export default FooterButtons;