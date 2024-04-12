import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import RangeInput from "../atoms/rangeInput";
import { iConfig } from "../redux/configTypes";
import { iDisplay } from "../interfaces";
import * as cf from "../redux/slices/config";
import Indication from "../atoms/indication";

export default function CardDisplayType(props: iDisplay) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    let types = [
        "--",
        "LCD/TFT",
        i18n.t('neopixel'),
        //i18n.t('segment7'),
        //i18n.t('matrix'),
        //i18n.t('nixie')
    ];
    const lcd = [
        { 'NX4832K035': 140 }, 
        { 'NX4832T035': 140 },
        { 'ILI9341': 100 }
    ];
    const segment = [
        { [`TM1637 (4${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 90 },
        { [`TM1637 (6${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 130 },
        { [`TM1637 (6${i18n.t('digits')}, ${i18n.t('withSeconds')}, ${i18n.t('points')})`]: 130 },
        { [`MAX7219 (4${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 90 },
        { [`MAX7219 (6${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 130 },
        { [`MAX7219 (6${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('dashes')})`]: 130 },
        { [`MAX7219 (6${i18n.t('digits')}, ${i18n.t('withSeconds')}, ${i18n.t('points')})`]: 130 },
        { [`MAX7219 (8${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 170 },
        { [`MAX7219 (8${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('dashes')})`]: 170 },
        { [`MAX7219 (8${i18n.t('digits')}, ${i18n.t('withSeconds')}, ${i18n.t('points')})`]: 170 },
        { [`MAX7219 (8${i18n.t('digits')}, ${i18n.t('withSeconds')}, ${i18n.t('dashes')})`]: 170 },
        { [`MAX7219 (8${i18n.t('digits')}, ${i18n.t('withMilliSeconds')}, ${i18n.t('points')})`]: 170 }
    ];
    const matrix = [
        { [`MAX7219 (${i18n.t('matrices4')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 680 }
    ];
    const neopixel = [
        { [`WS2812b (4${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, 1 ${i18n.t('ledPerSegment')})`]: 1800 },
        { [`WS2812b (4${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, 2 ${i18n.t('ledsPerSegment')})`]: 3480 },
        { [`WS2812b (4${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, 3 ${i18n.t('ledsPerSegment')})`]: 5160 },
        //{ [`WS2812b (6${i18n.t('digits')}, ${i18n.t('withSeconds')}, 1 ${i18n.t('ledPerSegment')})`]: 2760 },
        //{ [`WS2812b (6${i18n.t('digits')}, ${i18n.t('withSeconds')}, 2 ${i18n.t('ledsPerSegment')})`]: 5280 },
        //{ [`WS2812b (6${i18n.t('digits')}, ${i18n.t('withSeconds')}, 3 ${i18n.t('ledsPerSegment')})`]: 7800 },
        //{ [`WS2812b (8${i18n.t('digits')}, ${i18n.t('withMilliSeconds')}, 1 ${i18n.t('ledPerSegment')})`]: 3720 },
        //{ [`WS2812b (8${i18n.t('digits')}, ${i18n.t('withMilliSeconds')}, 2 ${i18n.t('ledsPerSegment')})`]: 7080 },
        //{ [`WS2812b (8${i18n.t('digits')}, ${i18n.t('withMilliSeconds')}, 3 ${i18n.t('ledsPerSegment')})`]: 10440 }
    ];
    const nixie = [
        { [`Nixie (4${i18n.t('tubes')})`]: 1000 },
        { [`Nixie (6${i18n.t('tubes')})`]: 1000 },
        { [`Nixie (8${i18n.t('tubes')})`]: 1000 }
    ];
    if(props.num === 1) types.splice(1, 1);

    let models: string[] = [];
    let consums: number[] = [];

    switch(config.display.type[props.num] + props.num) {
        case 1: 
            if(props.num === 0) {
                models = lcd.map(d => Object.keys(d)[0]);
                consums = lcd.map(d => Object.values(d)[0]);
            }
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
            models = matrix.map(d => Object.keys(d)[0]);
            consums = matrix.map(d => Object.values(d)[0]);
            break;
        case 5: 
            models = nixie.map(d => Object.keys(d)[0]);
            consums = nixie.map(d => Object.values(d)[0]);
            break;
    }
    
    const sendLimits = () => {
        let url = `${hostUrl()}/esp/brightLimit`;
        url += `?min=${config.display.brightness.min[props.num]}`;
        url += `&max=${config.display.brightness.max[props.num]}`;
        url += `&num=${props.num}`;
        fetch(url);
    }

    return <Card content={<>
        <SelectSwitch label={i18n.t('displayType')}
            options={types}
            value={config.display.type[props.num]}
            onChange={val => {
                dispatch(cf.displayTypeChange({num: props.num, val: val}));
                dispatch(cf.displayModelChange({num: props.num, val: 0}));
            }}
        />

        {models.length > 0 && <div className="mt-8">
            <SelectSwitch label={i18n.t('displayModel')}
                options={models}
                value={config.display.model[props.num]}
                onChange={val => dispatch(cf.displayModelChange({num: props.num, val: val}))}
            />
        </div>}

        {config.display.type[props.num] > 0 && <>
            <RangeInput value={config.display.brightness.min[props.num]}
                label={i18n.t('minimumBrightnessLimit')}
                min={0}
                max={255}
                limitMin={0}
                limitMax={config.display.brightness.max[props.num]}
                step={1}
                indication={String(config.display.brightness.min[props.num])}
                onChange={val => {
                    dispatch(cf.displayBrightMinChange({num: props.num, val: val}));
                    sendLimits();
                }}
                className="mt-4"
            />

            <RangeInput value={config.display.brightness.max[props.num]}
                label={i18n.t('maximumBrightnessLimit')}
                min={0}
                max={255}
                limitMin={config.display.brightness.min[props.num]}
                limitMax={255}
                step={1}
                indication={String(config.display.brightness.max[props.num])}
                onChange={val => {
                    dispatch(cf.displayBrightMaxChange({num: props.num, val: val}));
                    sendLimits();
                }}
                className="mt-2"
            />

            <div className="mt-4 text-xs">
                {i18n.t('maximumDisplayCurrent')}:
                <Indication error={false} 
                    value={String(
                        config.display.type[props.num] + props.num === 2 
                            ? (Math.round(consums[config.display.model[props.num]] 
                                * config.display.brightness.max[props.num] 
                                / 255
                            ) + 1)
                            : consums[config.display.model[props.num]]
                    ) + i18n.t('units.ma')} 
                />
            </div>
        </>}
    </>} />
}