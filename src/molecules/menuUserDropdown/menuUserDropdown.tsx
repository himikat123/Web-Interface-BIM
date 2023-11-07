import React, { useRef, useEffect, useState } from "react";
import MenuSubItem from "../../atoms/menuSubItem/menuSubItem";
import DropdownBox from "../../atoms/dropdownBox/dropdownBox";
import i18n from '../../i18n/main';
import { ReactComponent as AccountSVG } from '../../atoms/icons/account.svg';
import { iMenuUserDropdown } from "../../interfaces";

const MenuUserDropdown = (props: iMenuUserDropdown) => {
    function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if(ref.current && !ref.current.contains(event.target)) setMenuUserOpen(false);
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [menuUserOpen, setMenuUserOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef);
    
    return (
        <div ref={wrapperRef} className="relative ml-3">
            <div onClick={() => setMenuUserOpen(!menuUserOpen)} title={i18n.t('account')}>
                <button type="button" className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"></span>
                    <span><AccountSVG /></span>
                </button>
            </div>

            <DropdownBox className="right-0 mt-2" open={menuUserOpen}>
                <MenuSubItem link="/username" current={props.current} title={i18n.t('username')} num={0} />
                <MenuSubItem link="/userpass" current={props.current} title={i18n.t('password')} num={1} />
                <MenuSubItem link="/lang" current={props.current} title={i18n.t('language')} num={2} />
                <hr className="m-2" />
                <MenuSubItem link="/login" current={props.current} title={i18n.t('logout')} num={3} />
            </DropdownBox>
        </div>
    )
}

export default MenuUserDropdown;