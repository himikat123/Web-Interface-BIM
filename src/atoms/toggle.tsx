import React from "react";
import { iToggle } from "../interfaces";

const Toggle = (props: iToggle) => {
    return <div className="relative rounded-md border border-menu_light dark:border-menu_dark p-4"> 
        <label className="relative cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={props.checked ? true : false} onChange={props.onChange} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <div className="absolute left-2 -top-2 bg-card_light dark:bg-card_dark px-1 text-xs">
            {props.label}
        </div>
    </div>
}

export default Toggle;