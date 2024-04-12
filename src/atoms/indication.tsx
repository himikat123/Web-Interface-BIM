import { iIndication } from "../interfaces";

export default function Indication(props: iIndication) {
    return <span className={"ms-1 " + (props.error 
        ? "text-red-500 dark:text-red-600" 
        : "text-blue-700 dark:text-blue-400"
    )}>
        {props.value}
    </span>
}