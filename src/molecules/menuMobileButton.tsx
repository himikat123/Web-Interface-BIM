import React from "react";
import { useSelector } from 'react-redux';
import { iMenuMobileButton } from "../interfaces";

const MenuMobileButton = (props: iMenuMobileButton) => {
    const valid = useSelector((state: any) => state.valid);
    let validArray = Object.values(valid);
    validArray.pop();
    const areAllPagesValid = !validArray.includes(false);

    return (
        <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-text_dark hover:bg-bg-menu_active_light hover:bg-menu_active_dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5"></span>
                <span className={areAllPagesValid ? "" : "error"}>{props.children}</span>
            </button>
        </div>
    )
}

export default MenuMobileButton;