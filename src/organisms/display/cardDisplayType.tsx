import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import SelectSwitch from "../../atoms/selectSwitch";
import DisplayBrightLimit from "../../molecules/display/displayBrightLimit";
import DisplayDigitsReassignment from "../../molecules/display/displayDigitsReassignment";
import { iConfig } from "../../redux/configTypes";
import { iDisplay } from "../../interfaces";
import * as cf from "../../redux/slices/config";
import Indication from "../../atoms/indication";

export default function CardDisplayType(props: iDisplay) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const types = [
        "--",
        "LCD/TFT",
        i18n.t('neopixel'),
        i18n.t('segment7'),
        //i18n.t('numitron'),
        //i18n.t('vfd'),
        //i18n.t('nixie'),
        //i18n.t('matrix'),
        
    ];

    const disableTypes = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0]
    ];

    const lcd = [
        { 'NX4832K035': 140 }, 
        { 'NX4832T035': 140 },
        { 'ILI9341': 100 }
    ];

    const segment = [
        { [`TM1637 (4${i18n.t('digits')})`]: 160 },
        { [`TM1637 (6${i18n.t('digits')})`]: 240 },
        { [`MAX7219 (4${i18n.t('digits')})`]: 160 },
        { [`MAX7219 (6${i18n.t('digits')})`]: 240 },
        { [`MAX7219 (8${i18n.t('digits')})`]: 320 }
    ];

    const numitron = [
        { [`4${i18n.t('tubes')}`]: 640 },
        { [`6${i18n.t('tubes')}`]: 960 },
        { [`8${i18n.t('tubes')}`]: 1280 }
    ];

    const neopixel = [
        { [`WS2812b (4${i18n.t('digits')}, 1 ${i18n.t('ledPerSegment')})`]: 1800 },
        { [`WS2812b (4${i18n.t('digits')}, 2 ${i18n.t('ledsPerSegment')})`]: 3480 },
        { [`WS2812b (4${i18n.t('digits')}, 3 ${i18n.t('ledsPerSegment')})`]: 5160 },
        { [`WS2812b (6${i18n.t('digits')}, 1 ${i18n.t('ledPerSegment')})`]: 2760 },
        { [`WS2812b (6${i18n.t('digits')}, 2 ${i18n.t('ledsPerSegment')})`]: 5280 },
        { [`WS2812b (6${i18n.t('digits')}, 3 ${i18n.t('ledsPerSegment')})`]: 7800 },
        //{ [`WS2812b (8${i18n.t('digits')}, 1 ${i18n.t('ledPerSegment')})`]: 3720 },
        //{ [`WS2812b (8${i18n.t('digits')}, 2 ${i18n.t('ledsPerSegment')})`]: 7080 },
        //{ [`WS2812b (8${i18n.t('digits')}, 3 ${i18n.t('ledsPerSegment')})`]: 10440 }
    ];

    const vfd = [
        { [`${i18n.t('segment7withDot')} (4${i18n.t('digits')})`]: 1000 },
        { [`${i18n.t('segment7withDot')} (6${i18n.t('digits')})`]: 1000 },
        { [`${i18n.t('segment7withDot')} (8${i18n.t('digits')})`]: 1000 }
    ];

    const matrix = [
        { [`MAX7219 (${i18n.t('matrices4')})`]: 1280 }
    ];

    const nixie = [
        { [`Nixie (4${i18n.t('tubes')})`]: 1000 },
        { [`Nixie (6${i18n.t('tubes')})`]: 1000 },
        { [`Nixie (8${i18n.t('tubes')})`]: 1000 }
    ];

    let models: string[] = [];
    let consums: number[] = [];

    switch(config.display.type[props.num]) {
        case 1: 
            models = lcd.map(d => Object.keys(d)[0]);
            consums = lcd.map(d => Object.values(d)[0]);
            break;
        case 2: 
            models = neopixel.map(d => Object.keys(d)[0]);
            consums = neopixel.map(d => Object.values(d)[0]);
            break;
        case 3: 
            models = segment.map(d => Object.keys(d)[0]);
            consums = segment.map(d => Object.values(d)[0]);
            break;
        case 4: 
            models = numitron.map(d => Object.keys(d)[0]);
            consums = numitron.map(d => Object.values(d)[0]);
            break;
        case 5: 
            models = vfd.map(d => Object.keys(d)[0]);
            consums = vfd.map(d => Object.values(d)[0]);
            break;
        case 6: 
            models = nixie.map(d => Object.keys(d)[0]);
            consums = nixie.map(d => Object.values(d)[0]);
            break;
        case 7: 
            models = matrix.map(d => Object.keys(d)[0]);
            consums = matrix.map(d => Object.values(d)[0]);
            break;
        default:
            models = [];
            consums = [];
    }
    
    return <Card content={<>
        <SelectSwitch label={i18n.t('displayType')}
            options={types}
            value={config.display.type[props.num]}
            onChange={val => {
                dispatch(cf.displayTypeChange({num: props.num, val: val}));
                dispatch(cf.displayModelChange({num: props.num, val: 0}));
                dispatch(cf.displayAnimationPointsChange({num: props.num, val: 0}));
            }}
            disabled={disableTypes[props.num]}
        />

        {models.length > 0 && <div className="mt-8">
            <SelectSwitch label={i18n.t('displayModel')}
                options={models}
                value={config.display.model[props.num]}
                onChange={val => {
                    dispatch(cf.displayModelChange({num: props.num, val: val}));
                    dispatch(cf.displayAnimationPointsChange({num: props.num, val: 0}));
                    for(let i=0; i<8; i++) {
                        dispatch(cf.displayTimeslotDataChange({slot: i, num: props.num, val: 0}));
                    }
                }}
            />
        </div>}

        {config.display.type[props.num] > 0 && <>
            {config.display.type[props.num] <= 2 && <DisplayBrightLimit num={props.num} />}

            <div className="mt-4 text-xs">
                {i18n.t('maximumDisplayCurrent')}:
                <Indication error={false} 
                    value={String(
                        config.display.type[props.num] === 2 
                            ? (Math.round(consums[config.display.model[props.num]] 
                                * config.display.brightness.max[props.num] 
                                / 255
                            ) + 1)
                            : consums[config.display.model[props.num]]
                    ) + i18n.t('units.ma')} 
                />
            </div>

            {config.display.type[props.num] === 3 && <DisplayDigitsReassignment num={props.num} />}
        </>}
    </>} />
}