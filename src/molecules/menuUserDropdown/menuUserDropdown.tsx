import React, { useRef, useEffect, useState } from "react";
import MenuUserItem from "../../atoms/menuUserItem/menuUserItem";
import DropdownBox from "../../atoms/dropdownBox/dropdownBox";
import "./menuUserDropdown.scss";
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
                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"></span>
                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </button>
            </div>

            <DropdownBox open={menuUserOpen}>
                <MenuUserItem link="/profile" current={props.current} title="Your Profile" num={0} />
                <MenuUserItem link="/settings" current={props.current} title="Settings" num={1} />
                <hr className="m-2" />
                <MenuUserItem link="/signout" current={props.current} title="Sign out" num={2} />
            </DropdownBox>
        </div>
    )
}