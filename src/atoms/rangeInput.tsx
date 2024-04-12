import React from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { iRangeInput } from "../interfaces";
import "./rangeInput.scss";

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

    return (<div className={"range-input " + (props.className ?? '')}>
        {props.label && <div className="text-center mt-3 select-none">
            <label className="form-label">{props.label}</label>
        </div>}

        <div className="flex items-center mt-2 cursor-pointer input-icon">
            <div className="me-2 w-4" onClick={() => minus()}>
                <CaretLeft />
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
            
            <div className="ms-2 w-4 cursor-pointer" onClick={() => plus()}>
                <CaretRight />
            </div>
            
            <div className="ms-2 w-24 select-none text-right">
                {props.indication}
            </div>
        </div>
    </div>);
};

export default RangeInput;