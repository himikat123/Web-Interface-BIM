import React from "react";
import {ReactComponent as ArrowLeft} from "./icons/arrowLeft.svg";
import { iRangeInput } from "../interfaces";

const RangeInput = (props: iRangeInput) => {
    const round = (val: number): number => {
        return Math.round(val * (1 / props.step)) / (1 / props.step);
    }

    const minus = () => {
        if(props.value > props.limitMin) {
            props.onChange(round(Number(props.value) - Number(props.step)));
        }
    }

    const plus = () => {
        if(props.value < props.limitMax) {
            props.onChange(round(Number(props.value) + Number(props.step)));
        }
    }

    const min = (props.limitMin - props.min) * 100 / (props.max - props.min);
    const max = (props.max - props.limitMax) * 100 / (props.max - props.min);

    return (<>
        {props.label && <div className="text-center mt-3 select-none">
            <label className="form-label">{props.label}</label>
        </div>}

        <div className="flex items-center mt-2 cursor-pointer input-icon">
            <div className="me-2 w-4" onClick={() => minus()}>
                <ArrowLeft />
            </div>

            <div className="h-2 bg-gray-300 dark:bg-gray-500" style={{width: `${min}%`}} />
            <input type="range" 
                className="h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer"
                style={{width: `${100 - max - min}%`}}
                min={props.limitMin}
                max={props.limitMax}
                step={props.step}
                value={props.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(Number(e.target.value))}
            />
            <div className="h-2 bg-gray-300 dark:bg-gray-500" style={{width: `${max}%`}} />
            
            <div className="ms-2 w-4 rotate-180 cursor-pointer" onClick={() => plus()}>
                <ArrowLeft />
            </div>
            
            <div className="ms-2 w-20 select-none text-right">
                {props.indication}
            </div>
        </div>
    </>);
};

export default RangeInput;