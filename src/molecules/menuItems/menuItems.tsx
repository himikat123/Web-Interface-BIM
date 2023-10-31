import React from "react";
import { iMenuItems } from "../../interfaces";
import MenuItem from "../../atoms/menuItem/menuItem";
import MenuUserItem from "../../atoms/menuUserItem/menuUserItem";

export default (props: iMenuItems) => {
    return <>
        <MenuItem link="/" current={props.current} title="Dashboard" mobile={props.mobile}>
            <MenuUserItem link="/profile" current={props.current} title="Your Profile" num={0} />
            <MenuUserItem link="/profile" current={props.current} title="Your Profile" num={0} />
        </MenuItem>
        <MenuItem link="/team" current={props.current} title="Team" mobile={props.mobile} />
        <MenuItem link="/projects" current={props.current} title="Projects" mobile={props.mobile}>
            <MenuUserItem link="/profile" current={props.current} title="Your Profile" num={0} />
            <MenuUserItem link="/profile" current={props.current} title="Your Profile" num={0} />
            <MenuUserItem link="/profile" current={props.current} title="Your Profile" num={0} />
        </MenuItem>
        <MenuItem link="/calendar" current={props.current} title="Calendar" mobile={props.mobile}>
            <MenuUserItem link="/profile" current={props.current} title="Your Profile" num={0} />
            <MenuUserItem link="/profile" current={props.current} title="Your Profile" num={0} />
        </MenuItem>
    </>
}