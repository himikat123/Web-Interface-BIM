export default function SegClockPoints(props: {points: boolean, color: string}) {
    return <svg height="40" viewBox="0 0 4.2000017 19.200001" style={{marginTop: '15px'}}>
        <g transform="translate(-45.399999,-20.400001)">
            <circle fill={props.points ? props.color : '#222'} cx="48" cy="22" r="1.65"/>
            <circle fill={props.points ? props.color : '#222'} cx="47.4" cy="34" r="1.65"/>
        </g>
    </svg>
}