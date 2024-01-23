import React from 'react';
import { iSelectSwitch } from '../interfaces';
import "./selectSwitch.scss";

const SelectSwitch = (props: iSelectSwitch) => {
    return <div className="relative w-full">
        <select className="form-select h-14" 
            value={props.value ?? 0} 
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => props.onChange(Number(event.target.value))}
        >
            {props.options.map((option: string, i: number) => 
                <option key={option} value={i}>{option}</option>
            )}
        </select>

        <div className="absolute left-2 -top-2 bg-card_light dark:bg-card_dark px-1 text-xs">
            {props.label}
        </div>
    </div>
}

export default SelectSwitch;