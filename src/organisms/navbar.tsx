import React, { useRef, useEffect, useState } from "react";
import MenuMobileButton from "../molecules/menuMobileButton";
import MenuItems from "./menuItems";
import MenuThemeSwitch from "../atoms/menuThemeSwitch";
import MenuUserDropdown from "../molecules/menuUserDropdown";
import { List, X } from "@phosphor-icons/react";
import "./navbar.scss";

const Navbar = () => {
    /**
     * Tracking a click outside the mobile menu to close it
     */
    function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            function handleClickOutside(event: TouchEvent | MouseEvent) {
                if(ref.current && !ref.current.contains(event.target as Node)) setMobileMenuOpen(false);
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    /* mobile menu state open/closed */
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef);

    /* url pathname */
    const currentPath = window.location.pathname;

    
    return <nav ref={wrapperRef} className="bg-menu_light dark:bg-menu_dark navbar fixed z-40 w-full">
        <div className="mx-auto px-2 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
                <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <MenuMobileButton>
                        {mobileMenuOpen ? <X /> : <List />}
                    </MenuMobileButton>
                </div>
                <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <div className="hidden md:block">
                        <div className="flex space-x-4">
                            <MenuItems current={currentPath} mobile={false} />
                        </div>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                    <MenuThemeSwitch />
                    <MenuUserDropdown current={currentPath} />
                </div>
            </div>
        </div>

        <div className={"mobile-menu md:hidden" + (mobileMenuOpen ? "" : " hide")} 
          id="mobile-menu"
          style={{overflow: mobileMenuOpen ? "scroll" : "hidden"}}  
        >
            <div className="space-y-1 px-2 pb-3 pt-2">
                <MenuItems current={currentPath} mobile={true} />
            </div>
        </div>
    </nav>
}

export default Navbar;