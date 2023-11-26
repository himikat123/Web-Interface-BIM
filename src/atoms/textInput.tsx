import React, { useEffect, useState } from 'react';
import i18n from '../i18n/main';
import cn, { Argument } from 'classnames';
import { twMerge } from 'tailwind-merge';

const TextInput = (props: any) => {
    const validate = (val: string) => {
        return props.pattern ? !val.match(props.pattern) ? true : false : true;
    }

    const filled = (val: string) => {
        return props.required ? val ? true : false : true;
    }

    const [valid, setValid] = useState<boolean>(true);
    const [isNotEmpty, setIsNotEmpty] = useState<boolean>(true);

    useEffect(() => {
        const isValid = validate(props.value);
        const isNotEmpty = filled(props.value);
        props.isValid(isValid && isNotEmpty);
        setValid(isValid);
        setIsNotEmpty(isNotEmpty);
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
        setIsNotEmpty(isNotEmpty);
    }

    return <> 
        <div className={cnMerge([inputClasses.root.base, (valid && isNotEmpty) ? inputClasses.root.normal : inputClasses.root.error])}>
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
        {(!valid || !isNotEmpty) && <div className="mt-4 text-red-500 text_input-tip">
            {!valid && <div>{props.title}</div>}
            {!isNotEmpty && <div>{i18n.t('tips.tip0')}</div>}
        </div>}
    </>;
}

export default TextInput;