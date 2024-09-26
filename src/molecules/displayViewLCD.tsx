import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import { displayLcdMainScreen } from './displayLcdMainScreen';
import { displayLcdNetworkScreen } from './displayLcdNetworkScreen';
import { iLcdMainState, iLcdNetworkState } from '../interfaces';

export default function DisplayViewLCD() {
    const config = useSelector((state: iConfig) => state.config);
    const model = config.display.model[0];
    const dispModel = (model === 0 || model === 1) ? 0 : 1;

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null);
    const [page, setPage] = useState<string>('main');
    const [clockPointsState, setClockPointsState] = useState<boolean>(false);
    const [mainState, setMainState] = useState<iLcdMainState>();
    const [networkState, setNetworkState] = useState<iLcdNetworkState>();

    const dispNextion = useRef<HTMLCanvasElement>(null);
    const dispILI9341 = useRef<HTMLCanvasElement>(null);

    const draw = useCallback(() => {
        if(ctx) {
            if(page === 'main') {
                setMainState(displayLcdMainScreen(ctx, dispModel, mainState, clockPointsState));
            }
            if(page === 'network') {
                setNetworkState(displayLcdNetworkScreen(ctx, dispModel, networkState));
            }
        }
    }, [ctx, clockPointsState, dispModel, page, mainState, networkState]);

    useEffect(() => {
        setCanvas(dispModel === 0 ? dispNextion.current : dispILI9341.current);
        setCtx(canvas?.getContext('2d'));
    }, [dispModel, canvas]);
  
    useEffect(() => {
        const int = setInterval(() => {
            const date = new Date();
            setClockPointsState((date.getMilliseconds() % 1000) > 500);
            draw();
        }, 30);
        return () => clearInterval(int);
    }, [draw]);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const rect = canvas?.getBoundingClientRect();
        const x = Math.round(e.clientX - (rect ? rect.left : 0));
        const y = Math.round(e.clientY - (rect ? rect.top : 0));
        console.log(x, y);

        if(x > (dispModel ? 284 : 320) && y < (dispModel ? 25 : 36)) {
            if(page === 'main') {
                setNetworkState(undefined);
                setPage('network');
            }
            if(page === 'network') {
                setMainState(undefined);
                setPage('main');
            }
        }
    }

    return <div className='w-fit mx-auto mt-4 p-2 bg-gray-400 dark:bg-gray-600'>
        {/* NX4832K035 & NX4832T035 */}
        {dispModel === 0 && <canvas width="362" height="241" ref={dispNextion} onClick={handleClick} style={{
                margin: 0, padding: 0, width: '100%', maxWidth: '362px', maxHeight: '241px', border: '4px solid black'
            }}
        />}
        {/* ILI9341 */}
        {dispModel === 1 && <canvas width="320" height="240" ref={dispILI9341} onClick={handleClick} style={{
                margin: 0, padding: 0, width: '100%', maxWidth: '320px', maxHeight: '240px', border: '4px solid black'
            }}
        />}
    </div>
}