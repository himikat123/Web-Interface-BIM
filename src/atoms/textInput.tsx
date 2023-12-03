import React, { useEffect, useState } from 'react';
import i18n from '../i18n/main';
import cn, { Argument } from 'classnames';
import { twMerge } from 'tailwind-merge';
import { iTextInput } from '../interfaces';
import './textInput.scss';

const TextInput = (props: iTextInput) => {
    const [valid, setValid] = useState<boolean>(true);
    const [notEmpty, setNotEmpty] = useState<boolean>(true);
    const [tip, setTip] = useState<string>('');

    /* Validate changed value */
    useEffect(() => {
        const isValid = props.pattern 
            ? props.pattern[1] 
                ? props.value?.match(props.pattern[0]) ? true : false
                : !props.value?.match(props.pattern[0]) ? true : false
            : true;
        const isNotEmpty = props.required 
            ? props.value 
                ? true 
                : false 
            : true;
        if(props.isValid) props.isValid(isValid && isNotEmpty);
        setValid(isValid);
        setNotEmpty(isNotEmpty);
        if(!isNotEmpty) setTip(i18n.t('tips.tip0'));
        if(!isValid && props.tip) setTip(props.tip);
    }, [props, setValid, setNotEmpty, setTip]);

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
        <div className={cnMerge([inputClasses.root.base, (valid && notEmpty) ? inputClasses.root.normal : inputClasses.root.error, props.className])}>
            <label className={cnMerge([inputClasses.label, props.value && 'top-0 text-xs'])}>
                {props.label} {props.required ? '*' : ''}
            </label>
            <input className={cnMerge([inputClasses.input.base, (valid && notEmpty) ? inputClasses.input.normal : inputClasses.input.error])} 
                type={props.type ?? 'text'}
                value={props.value ?? ''}
                maxLength={props.maxLength} 
                onChange={props.onChange} 
            />
            {props.children}
        </div>
        
        {/* error tips */}
        <div className={"text_input-tip text-red-500" + (!valid || !notEmpty ? " open" : "")}>
            {tip}
        </div>
    </>;
}

export default TextInput;