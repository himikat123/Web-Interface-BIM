import React from "react";
import { iMenuItems } from "../../interfaces";
import MenuItem from "../../atoms/menuItem/menuItem";
import MenuSubItem from "../../atoms/menuSubItem/menuSubItem";

export default (props: iMenuItems) => {
    return <>
        <MenuItem link="/" current={props.current} title="Dashboard" mobile={props.mobile}>
            <MenuSubItem link="/profile" current={props.current} title="Your Profile" num={0} />
            <MenuSubItem link="/profile" current={props.current} title="No Profile" num={1} />
        </MenuItem>
        <MenuItem link="/team" current={props.current} title="Team" mobile={props.mobile} />
        <MenuItem link="/projects" current={props.current} title="Projects" mobile={props.mobile}>
            <MenuSubItem link="/profile" current={props.current} title="Your" num={0} />
            <MenuSubItem link="/profile" current={props.current} title="My" num={1} />
            <MenuSubItem link="/profile" current={props.current} title="Our" num={2} />
        </MenuItem>
        <MenuItem link="/calendar" current={props.current} title="Calendar" mobile={props.mobile}>
            <MenuSubItem link="/profile" current={props.current} title="Today" num={0} />
            <MenuSubItem link="/profile" current={props.current} title="Tomorrow" num={1} />
        </MenuItem>
    </>
}