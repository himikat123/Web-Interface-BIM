import { useEffect, useState } from 'react';
import slotTick from '../atoms/slotTick';
import SegSegment from '../atoms/canvas/segSegment';
import SegClockPoints from '../atoms/canvas/segClockPoints';
import { iSegState } from '../interfaces';

export default function DisplayView7segment(props: any) {
    const [state, setState] = useState<iSegState>({
        segments: [0, 0, 0, 0, 0, 0, 0, 0],
        colors: ['', '', '', '', '', '', '', ''],
        points: false,
        pointsColor: '',
        slot: 0,
        prevSlot: 0,
        prevSlotMillis: 0
    });
    
    useEffect(() => {
        const int = setInterval(() => {
            const st = slotTick(props.num, state.slot, state.prevSlot, state.prevSlotMillis);
            if(JSON.stringify(st) !== JSON.stringify(state)) {setState(st); console.log(st);}
        }, 10);
        return () => clearInterval(int);
    }, [props.num, state]);

    return <div className='h-full flex items-center'> 
        <div className='w-fit mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600'>
            <div className='bg-black flex p-1.5 ps-[8px]'>
                {[...Array(2)].map((i: number, x: number) => {
                    return <SegSegment key={x} symb={state.segments[x]} color={state.colors[x]} />
                })}
                <SegClockPoints points={state.points} color={state.pointsColor} />
                {[...Array(2)].map((i: number, x: number) => {
                    return <SegSegment key={x + 2} symb={state.segments[x + 2]} color={state.colors[x]} />
                })}
            </div>
        </div>
    </div>
}