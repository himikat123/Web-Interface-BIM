import React from 'react';
import { iTimeInput } from '../interfaces';

const TimeInput = (props: iTimeInput) => {
    return <> 
        <div className="group relative h-14 w-full rounded-md border focus-within:border-primary focus-within:ring-2 border-menu_light dark:border-menu_dark">
            <label className="absolute left-2 -top-1 z-0 -translate-y-1 bg-card_light dark:bg-card_dark px-1 text-base pointer-events-none duration-200 text-xs">
                {props.label}
            </label>
            <input className="z-10 h-full w-full rounded-md px-3.5 py-4 outline-none bg-card_light dark:bg-card_dark text-text_light dark:text-text_dark" 
                type="time"
                step={props.step}
                value={props.value ?? 0}
            
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)} 
            />
        </div>
    </>;
}

export default TimeInput;