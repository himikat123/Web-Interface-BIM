import { Link } from 'react-router-dom';
import i18n from '../i18n/main';
import { useSelector } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import { iDisplay } from '../interfaces';
import DisplayViewLCD from '../molecules/displayViewLCD';

export default function CardStatisDisplay(props: iDisplay) {
    const config = useSelector((state: iConfig) => state.config);
    const ws2812b = <>WS2812</>;

    function displayHeader(num: number) {
        return <div className='text-center'>
            <Link to={'display' + num} className='text-lg'>
                {i18n.t('display.singular')} {num}
            </Link>
        </div>
    }
    
    function displayView() {
        switch(props.num) {
            case 0: { /* Display 1 */
                switch(config.display.type[props.num]) {
                    case 1: return <DisplayViewLCD />;
                    case 2: return ws2812b;
                    default: return <></>;
                }
            }
            case 1: { /* Display 2 */
                switch(config.display.type[props.num]) {
                    case 1: return ws2812b;
                    default: return <></>;
                }
            }
            default: return <></>;
        }
    }

    return <>
        {displayHeader(props.num + 1)}
        {displayView()}
    </>
}