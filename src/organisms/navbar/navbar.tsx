import React, { useState } from "react";
import Logo from "../../atoms/icons/logo";
import MobileMenuButton from "../../molecules/menuButton/mobileMenuButton";
import MenuItems from "../../molecules/menuItems/menuItems";
import MenuThemaSwitch from "../../molecules/menuThemaSwitch/menuThemaSwitch";
import MenuUserDropdown from "../../molecules/menuUserDropdown/menuUserDropdown";
import "./navbar.scss";

export default () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    return <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
                <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <MobileMenuButton open={mobileMenuOpen} />
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <Logo />
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            <MenuItems current="team" mobile={false} />
                        </div>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <MenuThemaSwitch />
                    <MenuUserDropdown />
                </div>
            </div>
        </div>

        <div className={"mobile-menu sm:hidden" + (mobileMenuOpen ? "" : " hide")} id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
                <MenuItems current="team" mobile={true} />
            </div>
        </div>
    </nav>
}