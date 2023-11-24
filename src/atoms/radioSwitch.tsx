import React from "react";
import { iRadioSwitch } from "../interfaces";

const RadioSwitch = (props: iRadioSwitch) => {
    return (
        <div className="flex items-center my-3">
            <input 
              id={props.id}
              name={props.name}
              checked={props.checked}
              onChange={props.onChange} 
              type="radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label 
              htmlFor={props.id} 
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center"
            >
                {props.icon && <div className="ms-1 me-2 w-6">{props.icon}</div>}
                {props.label}
            </label>
        </div>
    );
}

export default RadioSwitch;