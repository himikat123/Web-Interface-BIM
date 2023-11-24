import React, { useEffect, useRef, useState } from "react";
import DropdownBox from "./dropdownBox";
import { iMenuItem } from "../interfaces";
import "./menuItem.scss";

const MenuItem = (props: iMenuItem) => {
    function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if(ref.current && !ref.current.contains(event.target)) setSubMenuOpen(false);
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef);

    const active = "bg-menu_active_light dark:bg-menu_active_dark ring-2 ring-gray-500 ring-offset-2 ring-offset-gray-800";
    const desktop = " text-sm";
    const mobile = " text-base block";
    const btn = "flex rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-800 ";
    let highlight = btn + (props.current === props.link ? active : '');
    React.Children.toArray(props.children).map((child: any) => {
        if(props.current === child.props.link) return highlight = btn + active;
        return null;
    });

    return (
        <div ref={wrapperRef} className="relative">
            <div onClick={() => setSubMenuOpen(!subMenuOpen)} title={props.title}>
                <button className={"text-text_dark " + highlight + (props.mobile ? mobile : desktop)} 
                  onClick={e => props.children ? null : window.location.href=props.link}
                >
                    <span>{props.icon}</span>
                    <span className="md:hidden mx-4 my-auto">{props.title}</span>
                </button>
            </div>

            {props.children && <DropdownBox className="submenu-dropbox animate-vertical" open={subMenuOpen}>
                {props.children}
            </DropdownBox>}
        </div>
    )
}

export default MenuItem;