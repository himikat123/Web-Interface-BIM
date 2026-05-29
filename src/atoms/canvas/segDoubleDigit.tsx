import SegSegment from "./segSegment";
import SegClockPoints from "./segClockPoints";
import { iSegDoubleDigit } from "../../interfaces";

export default function SegDoubleDigit(props: iSegDoubleDigit) {
    return <>
        {[...Array(2)].map((i: number, x: number) => {
            return <SegSegment key={x + props.shift} 
                symb={props.segments[x + props.shift] % 100} 
                color={props.isDisplayOn ? props.colors[x + props.shift] : "#222"}
                bg="#222"
                point={props.bottomDots}
                dot={props.segments[x + props.shift] >= 100}
            />
        })}
        {props.withDoubleDots && !props.bottomDots && <SegClockPoints point={[
            props.segments[props.shift] >= 100 ? props.isDisplayOn ? props.colors[props.shift] : '#222' : '#222',
            props.segments[props.shift + 1] >= 100 ? props.isDisplayOn ? props.colors[props.shift + 1] : '#222' : '#222'
        ]} />}
    </>
}