import React, { useRef, useEffect, useState } from "react";
import MenuMobileButton from "../molecules/menu/menuMobileButton";
import MenuItems from "./menuItems";
import MenuThemeSwitch from "../atoms/menuThemeSwitch";
import MenuUserDropdown from "../molecules/menu/menuUserDropdown";
import { List, X, ArrowCircleUp } from "@phosphor-icons/react";
import "./navbar.scss";
import i18n from "../i18n/main";

export default function Navbar() {
    const [upwardArrow, setUpwardArrow] = useState<boolean>(false);

    useEffect(() => {
        const updatePosition = () => {
            setUpwardArrow(window.scrollY > 200);
        }
        window.addEventListener("scroll", updatePosition);
        updatePosition();
        return () => window.removeEventListener("scroll", updatePosition);
    }, []);

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
    const currentPath = window.location.hash.replace('#', '');
    
    return <> 
        <nav ref={wrapperRef} className="bg-menu_light dark:bg-menu_dark navbar fixed z-40 w-full">
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

        <div className={"z-10 fixed right-4 lg:right-10 -bottom-20 cursor-pointer transition-all" + (upwardArrow ? " bottom-4 lg:bottom-10" : "")}
            title={i18n.t('upward')}
            onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
        >
            <ArrowCircleUp size={48} />
        </div>
    </>
}