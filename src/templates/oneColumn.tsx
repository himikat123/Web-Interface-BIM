import React from "react";
import { iColumnsTemplate } from "../interfaces";
import Navbar from '../organisms/navbar';

const OneColumn = (props: iColumnsTemplate) => {
    return (<>
        {props.navbar && <Navbar />}

        <div className={(props.navbar ? "pt-16 " : "") + "flex flex-col items-center"}>
            <h1 className="text-2xl mt-8 mb-4">{props.header}</h1>

            <div className="max-w-2xl w-full grid grid-cols-1 gap-4 p-4">
                {props.content}
            </div>
        </div>
    </>);
}

export default OneColumn;