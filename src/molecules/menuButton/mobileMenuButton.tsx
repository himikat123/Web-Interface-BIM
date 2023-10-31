import React from "react";
import { iMobileMenuButton } from "../../interfaces";
import { ReactComponent as HamburgerSVG } from '../../atoms/icons/hamburger.svg';
import { ReactComponent as CloseSVG } from '../../atoms/icons/close.svg';
import "./mobileMenuButton.scss";

export default (props: iMobileMenuButton) => {
    return (
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" 
              className="relative inline-flex items-center justify-center rounded-md p-2 text-black dark:text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
              aria-controls="mobile-menu" 
              aria-expanded={props.open ? "true" : "false"}
            >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                
                <div className={"mobile-menu-icon " + (props.open ? "hidden" : "block")}>
                    <HamburgerSVG />
                </div>

                <div className={"mobile-menu-icon " + (props.open ? "block" : "hidden")}>
                    <CloseSVG />
                </div>
            </button>
        </div>
    )
}