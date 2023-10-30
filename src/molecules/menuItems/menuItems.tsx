import React from "react";
import { iMenuItems } from "../../interfaces";
import MenuItem from "../../atoms/menuItem/menuItem";

export default (props: iMenuItems) => {
    return <>
        <MenuItem link="dashboard" current={props.current} title="Dashboard" mobile={props.mobile} />
        <MenuItem link="team" current={props.current} title="Team" mobile={props.mobile} />
        <MenuItem link="projects" current={props.current} title="Projects" mobile={props.mobile} />
        <MenuItem link="calendar" current={props.current} title="Calendar" mobile={props.mobile} />
    </>
}