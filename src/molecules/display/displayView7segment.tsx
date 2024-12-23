import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import slotTick from '../../atoms/slotTick';
import SegDoubleDigit from '../../atoms/canvas/segDoubleDigit';
import displayLength from '../../atoms/segmentsDisplay/displayLength';
import { iSegState } from '../../interfaces';
import { iConfig } from "../../redux/configTypes";

export default function DisplayView7segment(props: {num: number}) {
    const config = useSelector((state: iConfig) => state.config);
    const dType = config.display.type ? config.display.type[props.num] : 0;
    const dModel = config.display.model[props.num];
    const colorsTM1637 = ['#0F0', '#0F0', '#0F0', '#0F0', '#0F0', '#0F0', '#0F0', '#0F0'];
    const colorsMAX7219 = ['#F00', '#F00', '#F00', '#F00', '#F00', '#F00', '#F00', '#F00'];

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
    
    useEffect(() => {
        const int = setInterval(() => {
            const st = slotTick(props.num, state);
            if(JSON.stringify(st) !== JSON.stringify(state)) setState(st);
        }, 10);
        return () => clearInterval(int);
    }, [props.num, state]);

    const bottomDots = dType === 3 && dModel > 0;
    const dispLength = displayLength(props.num);

    return <div className='h-full flex items-center'> 
        <div className='w-full mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600 max-w-fit'>
            <div className='bg-black flex p-1.5 ps-[8px]'>
                <SegDoubleDigit shift={0}
                    segments={state.segments}
                    colors={dType === 2 ? state.colors : dModel < 2 ? colorsTM1637 : colorsMAX7219}
                    withDoubleDots={true}
                    bottomDots={bottomDots}
                />
                <SegDoubleDigit shift={2}
                    segments={state.segments}
                    colors={dType === 2 ? state.colors : dModel < 2 ? colorsTM1637 : colorsMAX7219}
                    withDoubleDots={dType === 2 ? dModel > 2 : dModel === 1}
                    bottomDots={bottomDots}
                />
                {dispLength > 4 && <SegDoubleDigit shift={4}
                    segments={state.segments}
                    colors={dType === 2 ? state.colors : dModel < 2 ? colorsTM1637 : colorsMAX7219}
                    withDoubleDots={false}
                    bottomDots={bottomDots}
                />}
                {dispLength > 6 && <SegDoubleDigit shift={6}
                    segments={state.segments}
                    colors={dType === 2 ? state.colors : dModel < 2 ? colorsTM1637 : colorsMAX7219}
                    withDoubleDots={false}
                    bottomDots={bottomDots}
                />}
            </div>
        </div>
    </div>
}