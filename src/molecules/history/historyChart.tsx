import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { iConfig } from "../../redux/configTypes";
import { iHistoryChart } from "../../interfaces";

export default function HistoryChart(props: iHistoryChart) {
    const [chartWidth, setChartWidth] = useState<number>(100);
    const config = useSelector((state: iConfig) => state.config);
    const bgColor = window.document.documentElement.classList[0] === 'dark' ? '000000' : 'FFFFFF';

    function changeChartWidth() {
        const width = document.querySelector('.thchart')?.getBoundingClientRect().width ?? 100;
        setChartWidth(Math.round(width));
    }

    useEffect(() => {
        changeChartWidth();

        window.addEventListener('resize', changeChartWidth);

        return () => {
            window.removeEventListener('resize', changeChartWidth);
        }
    }, []);

    let src = `https://thingspeak.com/channels/${config.history?.channelID ?? ''}/`;
    src += `charts/${props.num + 1}`;
    src += `?bgcolor=%23${bgColor}`;
    src += `&color=%23${props.chartColor}`;
    src += '&dynamic=true';
    src += '&results=72';
    src += '&round=2';
    src += `&title=${props.title}`;
    src += '&type=line';
    src += `&api_key=${config.history?.rdkey ?? ''}`;
    src += `&width=${chartWidth}`;

    return <div className="w-100 text-center">
        <iframe title={`chart${props.num}`} 
            width={chartWidth - 1} 
            height="261" 
            style={{border: '1px solid #cccccc'}} 
            src={src}>
        </iframe>
    </div>
}