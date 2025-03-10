import React from 'react';
import { iSelectSwitch, iSelectOptions } from '../interfaces';
import "./selectSwitch.scss";

export default function SelectSwitch(props: iSelectSwitch) {
    return <div className="relative w-full">
        <select className="form-select h-14" 
            value={props.value ?? 0} 
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => props.onChange(Number(event.target.value))}
        >
            {props.options.map((option: string | iSelectOptions, i: number) => (option instanceof Object) 
                ? <option key={option.title} value={option.num} disabled={props.disabled ? Boolean(props.disabled[i]) : false}>
                    {option.title}
                </option> 
                : <option key={option} value={i} disabled={props.disabled ? Boolean(props.disabled[i]) : false}>
                    {option}
                </option>
            )}
        </select>

        <div className="absolute left-2 -top-2 bg-card_light dark:bg-card_dark px-1 text-xs">
            {props.label}
        </div>
    </div>
}