import React from "react";
import { iColumnsTemplate } from "../interfaces";
import Navbar from '../organisms/navbar';
import FooterButtons from "../molecules/footerButtons";

const ThreeColumns = (props: iColumnsTemplate) => {
    return (<div className="flex flex-col min-h-screen">
        {props.navbar && <Navbar />}

        <div className={(props.navbar ? "pt-16 " : "") + "flex flex-col items-center flex-grow"}>
            <h1 className="text-2xl mt-8 mb-4">{props.header}</h1>

            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {props.content}
            </div>
        </div>

        {props.buttons && <FooterButtons buttons={props.buttons} />}
    </div>);
}

export default ThreeColumns;