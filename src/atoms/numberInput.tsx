import React, { useEffect, useState } from 'react';
import i18n from '../i18n/main';
import cn, { Argument } from 'classnames';
import { twMerge } from 'tailwind-merge';
import { iNumberInput } from '../interfaces';
import './numberInput.scss';

const NumberInput = (props: iNumberInput) => {
    const [valid, setValid] = useState<boolean>(true);

    /* Validate changed value */
    useEffect(() => {
        const isValid = props.value >= props.min && props.value <= props.max;
        if(props.isValid) props.isValid(isValid);
        setValid(isValid);
    }, [props, setValid]);

    /* tailwind classes */
    const inputClasses = {
        root: {
            base: 'group relative h-14 w-full rounded-md border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary',
            normal: 'border-menu_light dark:border-menu_dark',
            error: 'border-red-500 text-red-500'
        },
        input: {
            base: 'z-10 h-full w-full rounded-md px-3.5 py-4 outline-none bg-card_light dark:bg-card_dark',
            normal: 'text-text_light dark:text-text_dark',
            error: 'text-red-500'
        },
        label: 'absolute left-2 top-1/2 z-0 -translate-y-1/2 bg-card_light dark:bg-card_dark px-1 text-base pointer-events-none duration-200 group-focus-within:top-0 group-focus-within:text-xs'
    };

    /* merge classes */
    const cnMerge = (...classNames: Argument[]) => {
        return twMerge(cn(classNames));
    }

    return <> 
        <div className={cnMerge(["number-input relative", inputClasses.root.base, (valid) ? inputClasses.root.normal : inputClasses.root.error, props.className])}>
            <label className={cnMerge([inputClasses.label, String(props.value) && 'top-0 text-xs'])}>
                {props.label}
            </label>
            <input className={cnMerge([
                    inputClasses.input.base, 
                    (valid) ? inputClasses.input.normal : inputClasses.input.error
                ])} 
                type="number"
                value={props.value ?? 0}
                min={props.min}
                max={props.max} 
            
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(Math.round(Number(e.target.value)))} 
                readOnly={props.readonly}
            />
            {props.children}
        </div>
        
        {/* error tips */}
        <div className={"number-input-tip text-red-500" + (!valid ? " open" : "")}>
            {i18n.t('tips.tip3').replace('{min}', String(props.min)).replace('{max}', String(props.max))}
        </div>
    </>;
}

export default NumberInput;