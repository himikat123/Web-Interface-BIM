import segmentFont from "./segmentFont";
import { iNumitron } from "../../interfaces";
import "./vfd.scss";

export default function VFD(props: iNumitron) {
    const code = segmentFont();
    const symb = props.symb < code.length ? props.symb : 15;

    return <svg height="200" viewBox="0 0 304 1011" fill="none" className="vfd">
        <rect x="36" y="259" width="232" height="447" fill="#282828"/>
        <path d="M219.5 485.5L230 502.5L217 596.5C215.04 607.936 211.061 613.399 200.5 622L188.5 603C192.779 599.816 193.62 598.217 194 595.5L206 498.5L219.5 485.5Z" className={code[symb][2] ? ' on' : ''}/>
        <path d="M302 810C302 756.691 286.196 705.566 258.066 667.872C229.936 630.177 191.782 609 152 609C112.218 609 74.0645 630.177 45.934 667.872C17.8035 705.566 2.00001 756.691 2 810L152 810H302Z" fill="url(#paint0_radial_7_5)" fill-opacity="0.8"/>
        <path d="M67 615.083L84 601.5C86 604.5 90.2067 608 94.4262 608L177.5 608.5L192 628H100.228C81.2405 627.583 73.5414 623.479 67 615.083Z" className={code[symb][3] ? ' on' : ''}/>
        <path d="M78 498L90.5 486.5L101 499L88 585L68.5 604L66.5 604.5C63.8334 603.364 63.1868 602.577 63 601L78 498Z" className={code[symb][4] ? ' on' : ''}/>
        <path d="M113.739 493L103 481.766L116.961 469H202.872L212 479.723L198.576 493H113.739Z" className={code[symb][6] ? ' on' : ''}/>
        <path d="M212 460L224.5 371.5V368.5C224.5 366 222 363.5 222 363.5L237 348.5H238.5C246.173 357.563 248.031 361.908 247.5 368.5L235 462L221.5 473L212 460Z" className={code[symb][1] ? ' on' : ''}/>
        <path d="M106 353.5L121 372L107 463L94.5 477H93L84 464.5L101 357.5L106 353.5Z" className={code[symb][5] ? ' on' : ''}/>
        <path d="M135 359.5C133.833 359.5 130.7 359.6 127.5 362L126.5 363L112.5 347C116.76 343.118 123.5 338.5 126 338C128.5 337.5 227.5 338.5 227.5 338.5L228.5 339.5L229.5 340.5V342.5L213 359.5H135Z" className={code[symb][0] ? ' on' : ''}/>
        <circle cx="242" cy="620" r="15" className={props.dot ? ' on' : ''}/>
        <path d="M302 763.18L300.126 214M3.99624 214L2.12199 763.18" stroke="#777777" stroke-width="3"/>
        <path d="M221.408 856.784H80.84C14.414 856.832 0.501391 832.929 2.122 763.18H302C300.786 828.322 294.924 859.95 221.408 856.784Z" fill={props.color}/>
        <path d="M254.93 132.063C291.135 148.3 304.024 168.08 301.747 213.79H2.12189C2.27921 170.661 10.4249 156.254 47.6899 136.393C94.7574 121.429 97.6273 108.789 110.112 78.4799C115.73 58.9952 120.755 35.7219 124.5 16.7785C130.904 3 138.5 0 150.062 0C162.546 0 168.164 1.62372 175.655 16.7785C180.325 35.421 183.978 50.8766 192.509 78.4799C203.365 113.61 220.598 122.32 254.93 132.063Z" fill="#D9D9D9"/>
        <line x1="35" y1="263" x2="40" y2="258" className="gd"/>
        {[...Array(7)].map((i, x) => {
            const xx = x * 29 + 64;
            return <line x1={xx} y1="701" x2={xx} y2="264" className="gd"/>
        })}
        {[...Array(15)].map((i, y) => {
            const yy = y * 29 + 289;
            return <line x1="41" y1={yy} x2="263" y2={yy} className="gd"/>
        })}
        <defs>
            <radialGradient id="paint0_radial_7_5" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(152 810) rotate(90) scale(201 150)">
                <stop stop-color={props.color}/>
                <stop offset="1" stop-color="#737373" stop-opacity="0"/>
            </radialGradient>
        </defs>
    </svg>
}