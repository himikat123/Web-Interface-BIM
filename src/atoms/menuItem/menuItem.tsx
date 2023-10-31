import React from "react";
import DropdownBox from "../dropdownBox/dropdownBox";
import { iMenuItem } from "../../interfaces";

export default (props: iMenuItem) => {
    const passive = "text-gray-900 dark:text-gray-200 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium";
    const active = "bg-gray-900 dark:bg-gray-300 text-white dark:text-gray-900 rounded-md px-3 py-2 font-medium";
    const desktop = " text-sm";
    const mobile = " text-base block";
    
    let highlight = (props.current == props.link) ? active : passive;
    React.Children.toArray(props.children).map((child: any) => {
        if(props.current == child.props.link) highlight = active;
    });

    return (<div className="relative">
        <a href={props.link} className={highlight + (props.mobile ? mobile : desktop)}>
            {props.title}
        </a>

        {props.children && <DropdownBox className="mt-2" open={true}>
            {props.children}
        </DropdownBox>}
    </div>)
}