import React from "react";
import i18n from '../i18n/main';

const FooterButtons = (props: any) => {
    return (<div className="flex justify-center w-full p-8">
        {props.buttons.includes('save') && <button 
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mx-4 rounded"
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