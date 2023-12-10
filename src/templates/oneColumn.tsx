import React from "react";
import { iColumnsTemplate } from "../interfaces";
import Navbar from '../organisms/navbar';
import FooterButtons from "../molecules/footerButtons";

const OneColumn = (props: iColumnsTemplate) => {
    return (<div className="flex flex-col min-h-screen">
        {props.navbar && <Navbar />}

        <>{props.content.map((c: React.ReactNode, i: number) => {
            return <div key={"cl" + i} className={(props.navbar ? "pt-16 " : "") + "flex flex-col items-center flex-grow"}>
                {props.header[i] && <h1 className="text-2xl mt-8 mb-4">{props.header[i]}</h1>}

                <div className="max-w-xl w-full grid grid-cols-1 gap-4 p-4">
                    {props.content[i]}
                </div>
            </div>
        })}</>

        {props.buttons && <FooterButtons buttons={props.buttons} />}
    </div>);
}

export default OneColumn;