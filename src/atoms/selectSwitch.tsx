import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as ArrowDownSVG } from '../atoms/icons/arrowDown.svg';
import { iSelectSwitch } from '../interfaces';
import "./selectSwitch.scss";

const SelectSwitch = (props: iSelectSwitch) => {
    function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            function handleClickOutside(event: TouchEvent | MouseEvent) {
                if(ref.current && !ref.current.contains(event.target as Node)) setDropdownOpen(false);
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef);

    return <> 
        <div ref={wrapperRef}
            className="relative rounded-md border border-menu_light dark:border-menu_dark p-4"  
            onClick={() => {setDropdownOpen(!dropdownOpen)}}
        >
            <input className="h-full w-full rounded-md outline-none bg-card_light dark:bg-card_dark text-text_light dark:text-text_dark cursor-pointer" 
                value={props.options[props.value ?? 0]} 
                readOnly
            />

            <div className="absolute left-2 -top-2 bg-card_light dark:bg-card_dark px-1 text-xs">
                {props.label}
            </div>

            <div className={"w-4 absolute top-5 right-3 select-icon cursor-pointer " + (dropdownOpen ? "dropdownOpen" : "")}>
                <ArrowDownSVG />
            </div>

            <div className={"absolute w-full top-14 left-0 z-10 select-options overflow-hidden " + (dropdownOpen ? "dropdownOpen" : "")}>
                <div className="rounded-md border border-menu_light dark:border-menu_dark cursor-pointer">
                    {props.options.map((option: string, i: number) => {
                        return <div key={option} 
                            className={"select-item p-4 first:rounded-t-md last:rounded-b-md " + (props.value === i 
                                ? "bg-menu_active_light dark:bg-menu_active_dark text-text_dark" 
                                : "bg-page_light dark:bg-page_dark"
                            )}
                            onClick={() => {
                                props.onChange(i);
                                setDropdownOpen(false);
                            }}
                        >
                            {option}
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>
}

export default SelectSwitch;