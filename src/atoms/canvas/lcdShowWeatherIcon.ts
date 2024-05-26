import { drawImage } from "./primitives";
import Icon_big_01_d from '../img/icons/big/01_d';
import Icon_big_01_n from '../img/icons/big/01_n';
import Icon_big_02_d from '../img/icons/big/02_d';
import Icon_big_02_n from '../img/icons/big/02_n';
import Icon_big_04 from '../img/icons/big/04';
import Icon_big_09 from '../img/icons/big/09';
import Icon_big_10 from '../img/icons/big/10';
import Icon_big_11_d from '../img/icons/big/11_d';
import Icon_big_11_n from '../img/icons/big/11_n';
import Icon_big_13 from '../img/icons/big/13';
import Icon_big_50 from '../img/icons/big/50';
import Icon_big_loading from '../img/icons/big/loading';

export default function lcdShowWeatherIcon(ctx: CanvasRenderingContext2D, icon: number, isDay: boolean) {
    switch(icon) {
        case 1: drawImage(ctx, isDay ? Icon_big_01_d() : Icon_big_01_n(), 0, 104); break;
        case 2: drawImage(ctx, isDay ? Icon_big_02_d() : Icon_big_02_n(), 0, 104); break;
        case 3: drawImage(ctx, isDay ? Icon_big_02_d() : Icon_big_02_n(), 0, 104); break;
        case 4: drawImage(ctx, Icon_big_04(), 0, 104); break;
        case 9: drawImage(ctx, Icon_big_09(), 0, 104); break;
        case 10: drawImage(ctx, Icon_big_10(), 0, 104); break;
        case 11: drawImage(ctx, isDay ? Icon_big_11_d() : Icon_big_11_n(), 0, 104); break;
        case 13: drawImage(ctx, Icon_big_13(), 0, 104); break;
        case 50: drawImage(ctx, Icon_big_50(), 0, 104); break;
        default: drawImage(ctx, Icon_big_loading(), 0, 104); break;
    }
}