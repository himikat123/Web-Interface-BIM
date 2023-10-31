import React from "react";
import { iMenuButton } from "../../interfaces";

export default (props: iMenuButton) => {
    return (
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" 
              className="relative inline-flex items-center justify-center rounded-md p-2 text-black dark:text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
              aria-controls="mobile-menu" 
              aria-expanded={props.open ? "true" : "false"}
            >
                <span className="absolute -inset-0.5"></span>
                {props.children}
            </button>
        </div>
    )
}