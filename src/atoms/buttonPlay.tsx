import { PlayCircle } from '@phosphor-icons/react';
import { iButtonPlay } from '../interfaces';

export default function ButtonPlay(props: iButtonPlay) {
    return <div className="hover:scale-110 transition" 
        onClick={() => props.play()}
    >
        {<PlayCircle size={60} weight="fill" color="#05F" />}
    </div>
}