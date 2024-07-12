import store from '../../redux/store';
import { iSegClockPoints } from '../../interfaces';

export default function SegClockPoints(props: iSegClockPoints) {
    const config = store.getState().config;
    let point1 = false;
    let point2 = false;
    switch(config.display.animation.points[props.dispNum]) {
        case 0: point1 = point2 = props.points; break;
        case 1: point1 = props.points; point2 = !point1; break;
        case 2: point1 = point2 = true; break;
        case 3: point1 = point2 = false; break;
        default: ; break;
    }
    if(!props.clockpoints) point1 = point2 = false;

    return <svg height="40" viewBox="0 0 4.42 19.2" style={{marginTop: '15px'}}>
        <g transform="translate(-45.4,-20.4)">
            <circle fill={point1 ? props.color : '#222'} cx="48" cy="22" r="1.65"/>
            <circle fill={point2 ? props.color : '#222'} cx="47.4" cy="34" r="1.65"/>
        </g>
    </svg>
}