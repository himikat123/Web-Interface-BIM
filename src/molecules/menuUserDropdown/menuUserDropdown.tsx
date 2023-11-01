import React, { useRef, useEffect, useState } from "react";
import MenuSubItem from "../../atoms/menuSubItem/menuSubItem";
import DropdownBox from "../../atoms/dropdownBox/dropdownBox";
import { ReactComponent as AccountSVG } from '../../atoms/icons/account.svg';
import { iMenuUserDropdown } from "../../interfaces";

export default (props: iMenuUserDropdown) => {
    function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if(ref.current && !ref.current.contains(event.target)) setMenuUserOpen(false);
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, menuUserOpen]);
    }

    const [menuUserOpen, setMenuUserOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef);
    
    return (
        <div ref={wrapperRef} className="relative ml-3">
            <div onClick={() => setMenuUserOpen(!menuUserOpen)}>
                <button type="button" className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"></span>
                    <span><AccountSVG /></span>
                </button>
            </div>

            <DropdownBox className="right-0 mt-2" open={menuUserOpen}>
                <MenuSubItem link="/profile" current={props.current} title="Your Profile" num={0} />
                <MenuSubItem link="/settings" current={props.current} title="Settings" num={1} />
                <hr className="m-2" />
                <MenuSubItem link="/signout" current={props.current} title="Sign out" num={2} />
            </DropdownBox>
        </div>
    )
}