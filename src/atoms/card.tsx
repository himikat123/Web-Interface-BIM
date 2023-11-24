import React from "react";
import { iCard } from "../interfaces";

const Card = (props: iCard) => {
    return (
        <div className={"border-2 border-menu_light dark:border-menu_dark bg-card_light dark:bg-card_dark rounded-lg p-4"}>
            {props.content}
        </div>
    );
}

export default Card;