import React from "react";
import i18n from '../i18n/main';
import TwoColumns from "../templates/twoColumns";
import Card from "../atoms/card";

const Status = () => {
    const content = <>
        <Card content={<div>1</div>} />
        <Card content={<div>2</div>} />
        <Card content={<div>3</div>} />
        <Card content={<div>4</div>} />
    </>;

    return (<>
        <TwoColumns header={i18n.t('status')} content={content} navbar={true} />
    </>);
}

export default Status;