import { Link } from 'react-router-dom';
import i18n from '../../i18n/main';
import { useSelector } from 'react-redux';
import device from '../../device';
import { iConfig } from "../../redux/configTypes";
import { iDisplay } from '../../interfaces';
import DisplayViewLCD from '../../molecules/display/displayViewLCD';
import DisplayView7segment from '../../molecules/display/displayView7segment';
import DisplayView7SegmentTubes from '../../molecules/display/DisplayView7SegmentTubes';

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
            case 0: { /* Display 1 */
                switch(config.display.type[props.num]) {
                    case 1: return <DisplayViewLCD />;
                    case 2: return <DisplayView7segment num={0} />;
                    case 3: return <DisplayView7segment num={0} />;
                    case 4: return <DisplayView7SegmentTubes num={0} type="numitron" />;
                    case 5: return <DisplayView7SegmentTubes num={0} type="vfd" />;
                    default: return <></>;
                }
            }
            case 1: { /* Display 2 */
                switch(config.display.type[props.num]) {
                    case 2: return <DisplayView7segment num={1} />;
                    case 3: return <DisplayView7segment num={1} />;
                    case 4: return <DisplayView7SegmentTubes num={1} type="numitron" />;
                    case 5: return <DisplayView7SegmentTubes num={1} type="vfd" />;
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