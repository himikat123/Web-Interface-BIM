import React from "react";
import { iCard } from "../interfaces";
import "./card.scss";

const Card = (props: iCard) => {
    return (
        <div className={"card border-2 border-menu_light dark:border-menu_dark bg-card_light dark:bg-card_dark rounded-lg p-6 pb-10 " + (props.className ?? '')}>
            {props.header && <h1 className="text-xl text-center mb-8 select-none">{props.header}</h1>}

            {props.content}
        </div>
    );
}

export default Card;