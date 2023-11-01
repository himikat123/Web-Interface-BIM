import React from "react";
import { iMenuMobileButton } from "../../interfaces";

export default (props: iMenuMobileButton) => {
    return (
        <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-menu_dark dark:text-menu_light hover:bg-menu_dark hover:text-menu_light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5"></span>
                {props.children}
            </button>
        </div>
    )
}