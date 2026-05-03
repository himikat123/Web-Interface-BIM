import { Link } from 'react-router-dom';
import i18n from '../../i18n/main';
import { useSelector } from 'react-redux';
import device from '../../device';
import { iConfig } from "../../redux/configTypes";
import { iDisplay } from '../../interfaces';
import DisplayViewLCD from '../../molecules/display/displayViewLCD';
import DisplayView7segment from '../../molecules/display/displayView7segment';
import DisplayView7SegmentTubes from '../../molecules/display/DisplayView7SegmentTubes';
import * as D from '../../atoms/constants/displayTypes';

export default function CardStatusDisplay(props: iDisplay) {
    const config = useSelector((state: iConfig) => state.config);

    function displayHeader(num: number) {
        return <div className='text-center'>
            {device() === 'WeatherMonitorBIM32' 
                ? <Link to={'display' + num} className='text-xl'>
                    {i18n.t('display.singular')} {num}
                </Link>
                : <Link to={'display'} className='text-xl'>
                    {i18n.t('display.singular')}
                </Link>
            }
        </div>
    }
    
    function displayView() {
        switch(props.num) {
            case D.DISPLAY1: { /* Display 1 */
                switch(config.display.type ? config.display.type[props.num] : 0) {
                    case D.LCD: return <DisplayViewLCD />;
                    case D.PIXEL: return <DisplayView7segment num={D.DISPLAY1} />;
                    case D.SEGMENT: return <DisplayView7segment num={D.DISPLAY1} />;
                    case D.NUMITRON: return <DisplayView7SegmentTubes num={D.DISPLAY1} type="numitron" />;
                    case D.VFD: return <DisplayView7SegmentTubes num={D.DISPLAY1} type="vfd" />;
                    default: return <></>;
                }
            }
            case D.DISPLAY2: { /* Display 2 */
                switch(config.display.type ? config.display.type[props.num] : 0) {
                    case D.PIXEL: return <DisplayView7segment num={D.DISPLAY2} />;
                    case D.SEGMENT: return <DisplayView7segment num={D.DISPLAY2} />;
                    case D.NUMITRON: return <DisplayView7SegmentTubes num={D.DISPLAY2} type="numitron" />;
                    case D.VFD: return <DisplayView7SegmentTubes num={D.DISPLAY2} type="vfd" />;
                    default: return <></>;
                }
            }
            default: return <></>;
        }
    }

    return <>
        {displayHeader(props.num + 1)}
        {device() === 'WeatherMonitorBIM32' && displayView()}
        {device() === 'WeatherMonitorBIM' && <DisplayViewLCD />}
    </>
}