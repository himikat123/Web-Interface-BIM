import React from "react";

export default (props: any) => {
    return (
        <div className={"shadow-xl absolute z-10 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none menu-user-dropdown " + props.className + (props.open ? "" : " hide")}
             role="menu" 
             aria-orientation="vertical" 
             aria-labelledby="user-menu-button" 
             tabIndex={-1}
        >
            {props.children}
        </div>
    )
}