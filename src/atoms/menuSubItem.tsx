import { iMenuUserItem } from "../interfaces";
import { Link } from "react-router-dom";

export default function MenuSubItem(props: iMenuUserItem) {
    return <Link to={props.link} 
        className={"block px-4 py-2 text-sm " + 
            (props.current === props.link 
                ? props.valid 
                    ? "bg-menu_active_light dark:bg-menu_active_dark text-text_dark"
                    : "bg-red-500 text-text_dark"
                : props.valid 
                    ? "text-text_light dark:text-text_dark"
                    : "text-red-500 font-bold"
            )
        } 
        role="menuitem" 
        tabIndex={-1} 
    >
        {props.title}
    </Link>
}