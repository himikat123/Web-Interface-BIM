import segmentFont from "./segmentFont";
import { iNumitron } from "../../interfaces";
import './numitron.scss';

export default function Numitron(props: iNumitron) {
    const code = segmentFont();
    const symb = props.symb < code.length ? props.symb : 15;

    return <svg height="200" viewBox="0 0 116 412" fill="none" className="mx-1 filament">
        <line x1="0" y1="357" x2="0" y2="87" stroke="#DDD"/>
        <line x1="115" y1="357" x2="115" y2="87" stroke="#DDD"/>
        <line y1="356" x2="116" y2="356" stroke="#DDD"/>
        <path d="M116 87C116 80.3026 114.5 73.6707 111.585 67.4831C108.67 61.2955 104.398 55.6733 99.0122 50.9376C93.6264 46.2018 87.2325 42.4451 80.1956 39.8821C73.1588 37.3192 65.6167 36 58 36C50.3833 36 42.8412 37.3192 35.8044 39.8821C28.7675 42.4451 22.3736 46.2018 16.9878 50.9376C11.602 55.6733 7.32976 61.2955 4.41499 67.4831C1.50021 73.6708 -6.6587e-07 80.3026 0 87L58 87H116Z" fill="#777"/>
        <path d="M57.5 0L76.1195 40.5H38.8805L57.5 0Z" fill="#777"/>
        <rect x="13" y="109" width="92" height="180" fill="#222"/>
        <rect x="29" y="248" width="58" height="1" fill="#333"/>
        <rect x="19" y="289" width="78" height="11" fill="#222"/>
        {[...Array(15)].map((i, n) => {
            const cx = [21, 60, 87, 87, 94, 21, 87, 28, 87, 28, 94, 94, 21, 28, 87];
            const cy = [123, 292, 272, 292, 253, 253, 183, 183, 128, 128, 188, 123, 188, 248, 248];
            return <circle cx={cx[n]} cy={cy[n]} r="2.5" fill="#555"/>
        })}
        <rect x="87" y="273" width="1" height="19" fill="#333"/>
        <rect x="86" y="272" width="1" height="31" transform="rotate(52.5408 86.2902 272)" fill="#333"/>
        {[...Array(11)].map((i, n) => {
            const x = [29, 29, 21, 94, 21, 94, 26, 57, 87, 70, 44];
            const y = [128, 183, 124, 189, 189, 124, 300, 300, 300, 300, 300];
            const w = [58, 58, 1, 1, 1, 1, 2, 2, 2, 2, 2];
            const h = [1, 1, 64, 64, 65, 64, 39, 39, 39, 39, 39];
            return <rect x={x[n]} y={y[n]} width={w[n]} height={h[n]} fill={n < 6 ? "#333" : "#DDD"}/>
        })}
        <rect x="33" y="245" width="50" height="7" className={'filament' + (code[symb][3] ? ' on' : '')}/>
        <rect x="18" y="193" width="7" height="56" className={'filament' + (code[symb][4] ? ' on' : '')}/>
        <rect x="91" y="128" width="7" height="56" className={'filament' + (code[symb][1] ? ' on' : '')}/>
        <rect x="91" y="193" width="7" height="56" className={'filament' + (code[symb][2] ? ' on' : '')}/>
        <rect x="18" y="128" width="7" height="56" className={'filament' + (code[symb][5] ? ' on' : '')}/>
        <rect x="33" y="125" width="50" height="7" className={'filament' + (code[symb][0] ? ' on' : '')}/>
        <rect x="33" y="180" width="50" height="7" className={'filament' + (code[symb][6] ? ' on' : '')}/>
        <rect x="84" y="277" width="7" height="13" className={'filament' + (props.dot ? ' on' : '')}/>
        <rect x="82.7921" y="273.83" width="7" height="24.7636" transform="rotate(52.4099 83.7921 271.83)" className={'filament' + (props.dot ? ' on' : '')}/>
        <rect x="1" y="337" width="114" height="20" fill={props.color}/>
        <path d="M116 337C116 317.109 109.889 298.032 99.0122 283.967C88.1351 269.902 73.3826 262 58 262C42.6174 262 27.8649 269.902 16.9878 283.967C6.1107 298.032 2.3227e-06 317.109 0 337L58 337H116Z" fill={`url(#paint0_linear_${props.num})`}/>
        <defs>
            <linearGradient id={`paint0_linear_${props.num}`} x1="58" y1="262" x2="58" y2="412" gradientUnits="userSpaceOnUse">
                <stop stopColor="#737373" stopOpacity="0"/>
                <stop offset="1" stopColor={props.color}/>
            </linearGradient>
        </defs>
    </svg>
}