import { iDropdownBox } from "../interfaces";
import "./dropdownBox.scss";

export default function DropdownBox(props: iDropdownBox) {
    return <div className={"shadow-xl absolute z-10 w-52 origin-top-right rounded-md bg-dropdown_light dark:bg-dropdown_dark py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none menu-dropdown " 
        + props.className + (props.open ? "" : " hide")
    }>
        {props.children}
    </div>
}