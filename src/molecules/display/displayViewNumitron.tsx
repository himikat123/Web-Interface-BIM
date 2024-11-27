import { useEffect, useState } from 'react';
import slotTick from '../../atoms/slotTick';
import displayLength from '../../atoms/segmentsDisplay/displayLength';
import Numitron from '../../atoms/canvas/numitron';
import { iSegState } from '../../interfaces';

export default function DisplayViewNumitron(props: {num: number}) {
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

    const dispLength = displayLength(props.num);

    return <div className='h-full flex items-center'> 
        <div className='w-full mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600 max-w-fit'>
            <div className='bg-black flex p-1.5 ps-[8px]'>
                {[...Array(dispLength)].map((i: number, x: number) => {
                    return <Numitron key={'n' + x} 
                        num={x}
                        symb={state.segments[x] % 100} 
                        color={state.colors[x]}
                        dot={state.segments[x] >= 100}
                    />
                })}
            </div>
        </div>
    </div>
}