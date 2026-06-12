import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import SelectSwitch from "../../atoms/selectSwitch";
import Toggle from "../../atoms/toggle";
import DisplayBrightLimit from "../../molecules/display/displayBrightLimit";
import DisplayDigitsReassignment from "../../molecules/display/displayDigitsReassignment";
import type { iConfig } from "../../redux/configTypes";
import type { iData } from "../../redux/dataTypes";
import type { iDisplay } from "../../interfaces";
import * as cf from "../../redux/slices/config";
import Indication from "../../atoms/indication";

export default function CardDisplayType(props: iDisplay) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data)

    const types = [
        { num: 0, title: "--" },
        { num: 1, title: "LCD/TFT" },
        { num: 2, title: i18n.t('pixelLEDs') },
        { num: 3, title: i18n.t('segment7') },
        //{ num: 4, title: i18n.t('numitron') },
        //{ num: 5, title: i18n.t('vfd') },
        //{ num: 6, title: i18n.t('nixie') },
        //{ num: 7, title: i18n.t('matrix') }
    ];

    const disableTypes = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0]
    ];

    const lcd = [
        { 'NX4832K035': 145 }, 
        { 'NX4832T035': 145 },
        { 'NX4827K043': 250 },
        { 'ILI9341': 70 }
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

    const pixelLEDs = [
        { [`WS2812b (4 ${i18n.t('digits')})`]: 1500 },
        { [`WS2812b (6 ${i18n.t('digits')})`]: 2300 },
        { [`SK9822 (4 ${i18n.t('digits')})`]: 1500 },
        { [`SK9822 (6 ${i18n.t('digits')})`]: 2300 },
        { [`SK9822 (8 ${i18n.t('digits')})`]: 3100 }
    ];

    const leds = [
        { num: 0, title: `1 ${i18n.t('ledPerSegment')}` },
        { num: 1, title: `2 ${i18n.t('ledsPerSegment')}` },
        { num: 2, title: `3 ${i18n.t('ledsPerSegment')}` },
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

    switch(config.display.type ? config.display.type[props.num] : 0) {
        case 1: 
            models = lcd.map(d => Object.keys(d)[0]);
            consums = lcd.map(d => Object.values(d)[0]);
            break;
        case 2: 
            models = pixelLEDs.map(d => Object.keys(d)[0]);
            consums = pixelLEDs.map(d => Object.values(d)[0]);
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

    function typeChange(val: number) {
        if(data.cyd !== 1) {
            dispatch(cf.displayTypeChange({num: props.num, val: val}));
            dispatch(cf.displayModelChange({num: props.num, val: 0}));
            dispatch(cf.displayAnimationPointsChange({num: props.num, val: 0}));
        }
    }

    function modelChange(val: number) {
        if(data.cyd !== 1) {
            dispatch(cf.displayModelChange({num: props.num, val: val}));
            dispatch(cf.displayAnimationPointsChange({num: props.num, val: 0}));
            for(let i=0; i<8; i++) {
                dispatch(cf.displayTimeslotDataChange({slot: i, num: props.num, val: 0}));
            }
        }
    }

    return <Card content={<>
        <SelectSwitch label={i18n.t('displayType')}
            options={types}
            value={config.display.type ? config.display.type[props.num] : 0}
            onChange={val => typeChange(val)}
            disabled={disableTypes[props.num]}
        />

        {models.length > 0 && <div className="mt-8">
            <SelectSwitch label={i18n.t('displayModel')}
                options={models}
                value={config.display.model[props.num]}
                onChange={val => modelChange(val)}
            />
        </div>}

        {config.display.type && config.display.type[props.num] === 2 && <div className="mt-8">
            <SelectSwitch label={i18n.t('numberOfLEDs')}
                options={leds}
                value={config.display.cntLeds ? config.display.cntLeds[props.num] : 0}
                onChange={val => dispatch(cf.displayCntLedsChange({num: props.num, val: val}))}
            />
        </div>}

        {config.display.type && config.display.type[props.num] > 0 && <>
            {config.display.type[props.num] === 2 && <div className="mt-8"> 
                <Toggle label={i18n.t('useSacrificialLED')}
                    checked={config.display.sLed ? config.display.sLed[props.num] : 0}
                    onChange={() => dispatch(cf.displaySLedChange({
                        num: props.num, 
                        val: config.display.sLed ? config.display.sLed[props.num] ? 0 : 1 : 0
                    }))}
                />
            </div>}

            {config.display.type[props.num] <= 2 && <DisplayBrightLimit num={props.num} />}

            <div className="mt-4 text-xs">
                {i18n.t('maximumDisplayCurrent')}:
                <Indication error={false} 
                    value={String(
                        config.display.type[props.num] === 2 
                            ? (Math.round((consums[config.display.model[props.num]] * (config.display.cntLeds ? (config.display.cntLeds[props.num] + 1) : 1)) 
                                * (config.display.brightness.max ? config.display.brightness.max[props.num] : 1) 
                                / 255
                            ))
                            : consums[config.display.model[props.num]]
                    ) + i18n.t('units.ma')} 
                />
            </div>

            {config.display.type[props.num] === 3 && <DisplayDigitsReassignment num={props.num} />}
        </>}
    </>} />
}