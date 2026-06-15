import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import slotTick from '../../atoms/slotTick';
import SegDoubleDigit from '../../atoms/canvas/segDoubleDigit';
import displayLength from '../../atoms/segmentsDisplay/displayLength';
import type { iSegState } from '../../interfaces';
import type { iConfig } from "../../redux/configTypes";
import type { iData } from '../../redux/dataTypes';
import * as D from '../../atoms/constants/displayTypes';

export default function DisplayView7segment(props: {num: number, isDisplayOn: boolean}) {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const dType = config.display.type ? config.display.type[props.num] : 0;
    const dModel = config.display.model[props.num];
    const colorsTM1637 = Array(8).fill('#0F0');
    const colorsMAX7219 = Array(8).fill('#F00');
    const [state, setState] = useState<iSegState>({
        segments: [0, 0, 0, 0, 0, 0, 0, 0],
        colors: ['', '', '', '', '', '', '', ''],
        clockpoints: false,
        points: false,
        pointsColor: '',
        slot: 0,
        prevSlot: 0,
        prevSlotMillis: 0,
        animMillis: 0,
        animSlot: 0
    });
    const [lastSecond, setLastSecond] = useState(0);
    const [millisec, setMillisec] = useState(0);
    
    useEffect(() => {
        const int = setInterval(() => {
            const st = slotTick(props.num, state, config, data, millisec);
            if(JSON.stringify(st) !== JSON.stringify(state)) setState(st);
            if(millisec < 99) setMillisec(millisec + 1);
            if(lastSecond != data.time) {
                setLastSecond(data.time);
                setMillisec(0);
            }
        }, 10);
        return () => clearInterval(int);
    }, [props.num, state]);

    const bottomDots = dType === D.SEGMENT && dModel > D.TM1637_4;
    const dispLength = displayLength(props.num);
    const colors = dType === D.PIXEL ? state.colors : dModel < D.MAX7219_4 ? colorsTM1637 : colorsMAX7219;

    return <div className='h-full flex items-center'> 
        <div className='w-full mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600 max-w-fit'>
            <div className='bg-black flex p-1.5 ps-[8px]'>
                <SegDoubleDigit shift={0}
                    segments={state.segments}
                    colors={colors}
                    withDoubleDots={true}
                    bottomDots={bottomDots}
                    isDisplayOn={props.isDisplayOn}
                />
                <SegDoubleDigit shift={2}
                    segments={state.segments}
                    colors={colors}
                    withDoubleDots={dType === D.PIXEL && dispLength > 4}
                    bottomDots={bottomDots}
                    isDisplayOn={props.isDisplayOn}
                />
                {dispLength > 4 && <SegDoubleDigit shift={4}
                    segments={state.segments}
                    colors={colors}
                    withDoubleDots={dType === D.PIXEL && dispLength > 6}
                    bottomDots={bottomDots}
                    isDisplayOn={props.isDisplayOn}
                />}
                {dispLength > 6 && <SegDoubleDigit shift={6}
                    segments={state.segments}
                    colors={colors}
                    withDoubleDots={false}
                    bottomDots={bottomDots}
                    isDisplayOn={props.isDisplayOn}
                />}
            </div>
        </div>
    </div>
}