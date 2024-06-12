import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import { iData } from '../redux/dataTypes';
import { iPrevForecast, iSequence } from '../interfaces';
import { fillRect } from '../atoms/canvas/primitives';
import seg4digitDisplay from '../atoms/canvas/seg4digDisplay';

import * as vl from '../atoms/validateValues';

export default function DisplayView7segment(props: any) {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const model = config.display.model[props.num];
    const dispModel = (model === 0 || model === 1) ? 0 : 1;
    
    const SYMB_DEGREE = 0x0A;
    const SYMB_A = 0x0B;
    const SYMB_C = 0x0C;
    const SYMB_P = 0x0D;
    const SYMB_H = 0x0E;
    const SYMB_SPACE = 0x0F;
    const SYMB_MINUS = 0x10;

    const draw = useCallback(() => {
        const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if(ctx) {
            /* Show time */
            
        }
    }, []);

    useEffect(() => {
        const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if(ctx) {
            fillRect(ctx, 0, 0, 320, 240, '#000');
            seg4digitDisplay(ctx, [8, 9, 10, 11], true, '#F0F');
            setTimeout(() => {
                seg4digitDisplay(ctx, [16, 17, 18, 19], true, '#F0F');
            }, 1000);
        }
    }, []);
  
    useEffect(() => {
        const int = setInterval(() => {
            //setClockPointsState((clockPointsState) => !clockPointsState);
            draw();
        }, 500);
        return () => clearInterval(int);
    }, [draw]);

    return <div className='h-full flex items-center'> 
    <div className='w-fit mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600'>
        <canvas width="169" height="62" id="canvas2" style={{
                margin: 0, padding: 0, width: '100%', border: '4px solid black'
            }}
        />
    </div></div>
}