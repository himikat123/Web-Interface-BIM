import React, { useEffect, useRef, useState } from "react";
import DropdownBox from "../dropdownBox/dropdownBox";
import { iMenuItem } from "../../interfaces";

export default (props: iMenuItem) => {
    function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if(ref.current && !ref.current.contains(event.target)) setSubMenuOpen(false);
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, subMenuOpen]);
    }
    const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef);

    const passive = "text-gray-900 dark:text-gray-200 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium";
    const active = "bg-gray-900 dark:bg-gray-300 text-white dark:text-gray-900 rounded-md px-3 py-2 font-medium";
    const desktop = " text-sm";
    const mobile = " text-base block";
    
    let highlight = (props.current == props.link) ? active : passive;
    React.Children.toArray(props.children).map((child: any) => {
        if(props.current == child.props.link) highlight = active;
    });

    return (
        <div ref={wrapperRef} className="relative">
            <div onClick={() => setSubMenuOpen(!subMenuOpen)}>
                <a className={highlight + (props.mobile ? mobile : desktop)} 
                  href={props.link}
                  onClick={e => (props.children ? e.preventDefault() : null)}
                >
                    {props.title}
                </a>
            </div>

            {props.children && <DropdownBox className="submenu-dropbox animate-vertical" open={subMenuOpen}>
                {props.children}
            </DropdownBox>}
        </div>
    )
}