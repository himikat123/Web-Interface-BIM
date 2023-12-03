import React from 'react';

const SelectSwitch = (props: any) => {
    return <div className="relative rounded-md border border-menu_light dark:border-menu_dark p-4">
        <select className="h-full w-full rounded-md outline-none bg-card_light dark:bg-card_dark text-text_light dark:text-text_dark" 
            value={props.value ?? 0} 
            onChange={props.onChange} 
        >
            {props.options.map((option: string, i: number) => {
                return <option key={option} value={i} className="mt-8">
                    {option}
                </option>
            })}
        </select>
        <div className="absolute left-2 -top-2 bg-card_light dark:bg-card_dark px-1 text-xs">
            {props.label}
        </div>
    </div>
}

export default SelectSwitch;