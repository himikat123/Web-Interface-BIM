import React from 'react';
import { ReactComponent as PlaySVG } from '../atoms/icons/play.svg';
import { iButtonPlay } from '../interfaces';

const ButtonPlay = (props: iButtonPlay) => {
    return <div className="ms-2 hover:scale-110 transition" 
        onClick={() => props.play()}
    >
        {<PlaySVG />}
    </div>
}

export default ButtonPlay;