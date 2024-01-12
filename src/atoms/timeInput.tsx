import React, { useEffect, useState } from 'react';
import i18n from '../i18n/main';
import cn, { Argument } from 'classnames';
import { twMerge } from 'tailwind-merge';
import { iNumberInput } from '../interfaces';
import { ReactComponent as ArrowDownSVG } from '../atoms/icons/arrowDown.svg';
import './numberInput.scss';

const TimeInput = (props: any) => {
    /* tailwind classes */
    const inputClasses = {
        root: 'group relative h-14 w-full rounded-md border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary border-menu_light dark:border-menu_dark',
        input: 'z-10 h-full w-full rounded-md px-3.5 py-4 outline-none bg-card_light dark:bg-card_dark text-text_light dark:text-text_dark',
        label: 'absolute left-2 top-1/2 z-0 -translate-y-1/2 bg-card_light dark:bg-card_dark px-1 text-base pointer-events-none duration-200 group-focus-within:top-0 group-focus-within:text-xs'
    };

    /* merge classes */
    const cnMerge = (...classNames: Argument[]) => {
        return twMerge(cn(classNames));
    }

    return <> 
        <div className={cnMerge(["number-input relative", inputClasses.root, props.className])}>
            <label className={cnMerge([inputClasses.label, String(props.value) && 'top-0 text-xs'])}>
                {props.label}
            </label>
            <input className={inputClasses.input} 
                type="time"
                value={props.value ?? 0}
            
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(Number(e.target.value))} 
            />
        </div>
    </>;
}

export default TimeInput;