import React from 'react';
import cn, { Argument } from 'classnames';
import { twMerge } from 'tailwind-merge'

const TextInput = (props: any) => {
    const inputClasses = {
        root: `group relative h-14 w-full rounded-md border border-menu_light dark:border-menu_dark focus-within:border-primary focus-within:ring-2 focus-within:ring-primary`,
        label: `absolute left-2 top-1/2 z-0 -translate-y-1/2 bg-card_light dark:bg-card_dark text-text_light dark:text-text_dark px-1 text-base pointer-events-none duration-200 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-primary`,
        input: `z-10 h-full w-full rounded-md px-3.5 py-4 outline-none bg-card_light dark:bg-card_dark text-text_light dark:text-text_dark`
    };

    return <div className={inputClasses.root}>
        <label className={cnMerge([inputClasses.label, props.value && 'top-0 text-xs'])} htmlFor={props.id}>
            {props.label}
        </label>
        <input className={inputClasses.input} type="text" id={props.id} value={props.value} onChange={props.onChange} />
    </div>;

    function cnMerge(...classNames: Argument[]) {
        return twMerge(cn(classNames));
    }
}

export default TextInput;