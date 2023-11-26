import React, { useEffect, useState } from 'react';
import i18n from '../i18n/main';
import cn, { Argument } from 'classnames';
import { twMerge } from 'tailwind-merge';
import './textInput.scss';

const TextInput = (props: any) => {
    const validate = (val: string) => {
        return props.pattern ? !val.match(props.pattern) ? true : false : true;
    }

    const filled = (val: string) => {
        return props.required ? val ? true : false : true;
    }

    const [valid, setValid] = useState<boolean>(true);
    const [notEmpty, setNotEmpty] = useState<boolean>(true);
    const [tip, setTip] = useState<string>('');

    useEffect(() => {
        const isValid = validate(props.value);
        const isNotEmpty = filled(props.value);
        props.isValid(isValid && isNotEmpty);
        setValid(isValid);
        setNotEmpty(isNotEmpty);
        if(!isNotEmpty) setTip(i18n.t('tips.tip0'));
        if(!isValid) setTip(props.title);
    }, [props.value]);

    const inputClasses = {
        root: {
            base: 'group relative h-14 w-full rounded-md border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary',
            normal: 'border-menu_light dark:border-menu_dark',
            error: 'border-red-500 text-red-500'
        },
        label: 'absolute left-2 top-1/2 z-0 -translate-y-1/2 bg-card_light dark:bg-card_dark px-1 text-base pointer-events-none duration-200 group-focus-within:top-0 group-focus-within:text-xs',
        input: 'z-10 h-full w-full rounded-md px-3.5 py-4 outline-none bg-card_light dark:bg-card_dark'
    };

    const cnMerge = (...classNames: Argument[]) => {
        return twMerge(cn(classNames));
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        const isValid = validate(value);
        const isNotEmpty = filled(value);
        props.onChange(value);
        props.isValid(isValid && isNotEmpty);
        setValid(isValid);
        setNotEmpty(isNotEmpty);
    }

    return <> 
        <div className={cnMerge([inputClasses.root.base, (valid && notEmpty) ? inputClasses.root.normal : inputClasses.root.error])}>
            <label className={cnMerge([inputClasses.label, props.value && 'top-0 text-xs'])} htmlFor={props.id}>
                {props.label} {props.required ? '*' : ''}
            </label>
            <input className={inputClasses.input} 
                type="text" 
                id={props.id} 
                value={props.value} 
                onChange={onChange} 
            />
        </div>
        
        <div className={"text_input-tip text-red-500" + (!valid || !notEmpty ? " open" : "")}>
            {tip}
        </div>
    </>;
}

export default TextInput;