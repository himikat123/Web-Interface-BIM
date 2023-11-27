import React from "react";
import cn, { Argument } from 'classnames';
import { twMerge } from 'tailwind-merge';

import { iButton } from "../interfaces";

const cnMerge = (...classNames: Argument[]) => {
    return twMerge(cn(classNames));
}

const Button = (props: iButton) => {
    return <button className={cnMerge([props.className, "focus:ring-4 focus:ring-blue-300 py-2 px-4 my-2 sm:mx-4 rounded"])} 
        disabled={props.disabled}
        onClick={props.onClick}
    >
        {props.label}
    </button>
}

export default Button;