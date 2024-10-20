import { iSegClockPoints } from '../../interfaces';

export default function SegClockPoints(props: iSegClockPoints) {
    return <svg height="40" viewBox="0 0 4.42 19.2" style={{marginTop: '15px'}}>
        <g transform="translate(-45.4,-20.4)">
            <circle fill={props.point[0]} cx="48" cy="22" r="1.65"/>
            <circle fill={props.point[1]} cx="47.4" cy="34" r="1.65"/>
        </g>
    </svg>
}