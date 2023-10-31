import React from "react";
import DropdownBox from "../dropdownBox/dropdownBox";
import { iMenuItem } from "../../interfaces";

export default (props: iMenuItem) => {
    const passive = "text-gray-900 dark:text-gray-200 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium";
    const active = "bg-gray-900 dark:bg-gray-300 text-white dark:text-gray-900 rounded-md px-3 py-2 font-medium";
    const desktop = " text-sm";
    const mobile = " text-base block";

    return (<div className="relative">
        <a href={props.link} className={(props.current == props.link ? active : passive) + (props.mobile ? mobile : desktop)} 
          aria-current={props.current == props.link ? "page" : "false"}
        >
            {props.title}
        </a>

        {props.children && <DropdownBox className="mt-2" open={true}>
            {props.children}
        </DropdownBox>}
    </div>)
}