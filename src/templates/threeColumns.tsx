import React from "react";
import { iColumnsTemplate } from "../interfaces";
import Navbar from '../organisms/navbar';
import FooterButtons from "../molecules/footerButtons";

export default function ThreeColumns(props: iColumnsTemplate) {
    return <div className="flex flex-col min-h-screen">
        {props.navbar && <Navbar />}

        <>{props.content.map((c: React.ReactNode, i: number) => {
            return <div key={"cl" + i} className={(props.navbar && i === 0 ? "pt-16 " : "") + "flex flex-col items-center flex-grow"}>
                {props.header[i] && <h1 className="text-2xl mt-8 mb-4 whitespace-nowrap">{props.header[i]}</h1>}

                <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                    {props.content[i]}
                </div>
            </div>
        })}</>

        {props.footer}

        {props.buttons && <FooterButtons buttons={props.buttons} />}
    </div>
}