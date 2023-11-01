import React from "react";
import { iDropdownBox } from "../../interfaces";
import "./dropdownBox.scss";

export default (props: iDropdownBox) => {
    return (
        <div className={"shadow-xl absolute z-10 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none menu-dropdown " + props.className + (props.open ? "" : " hide")}>
            {props.children}
        </div>
    )
}