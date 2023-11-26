import React from "react";
import i18n from '../i18n/main';
import { iFooterButtons } from "../interfaces";

const FooterButtons = (props: iFooterButtons) => {
    return (<div className="flex justify-center w-full p-8">
        {(props.buttons.includes('save') || props.buttons.includes('nsave')) && <button 
            className={
                (props.buttons.includes('save') ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400") 
                + " text-white py-2 px-4 mx-4 rounded"
            }
            disabled={props.buttons.includes('nsave')}
        >
            {i18n.t('save')}
        </button>}

        {props.buttons.includes('reset') && <button 
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 mx-4 rounded"
        >
            {i18n.t('restart')}
        </button>}
    </div>);
}

export default FooterButtons;