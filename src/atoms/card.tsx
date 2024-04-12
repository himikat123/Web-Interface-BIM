import { iCard } from "../interfaces";
import "./card.scss";

export default function Card(props: iCard) {
    return <div className={"card border-2 border-menu_light dark:border-menu_dark bg-card_light dark:bg-card_dark rounded-lg p-6 pb-10 "
        + (props.className ?? '')
    }>
        {props.header && <div className="text-xl text-center min-h-14 mb-8 sm:mt-4 select-none">{props.header}</div>}

        {props.content}
    </div>
}