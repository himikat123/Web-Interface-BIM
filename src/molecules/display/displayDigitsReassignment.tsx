import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iConfig } from "../../redux/configTypes";
import { displayOrderChange } from "../../redux/slices/config";
import Button from "../../atoms/button";
import i18n from "../../i18n/main";
import hostUrl from "../../atoms/hostUrl";

export default function DisplayDigitsReassignment(props: any) {
    const [showOrder, setShowOrder] = useState<boolean>(false);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const width = config.display.model[props.num] <= 1 ? 6 : 8;

    function orderChange(dig: number, val: number) {
        dispatch(displayOrderChange({num: props.num, dig: dig, val: val}));
    }

    function sendShowCommand() {
        setShowOrder(!showOrder);
    }

    useEffect(() => {
        fetch(`${hostUrl()}/esp/showOrder?show=${Number(showOrder)}`);
    }, [showOrder]);

    return <div className="mt-6">
        <h3 className="text-lg">{i18n.t('orderOfDigits')}</h3>

        <div className="mt-4 p-2 border border-blue-800">
            <div className="flex justify-between">
                {[...Array(width + 1)].map((x, i) => {
                    return <div key={"h" + i} className={i === 0 ? 'opacity-0' : ''}>{i}</div>
                })}
            </div>
            {[...Array(width)].map((y, n) => {
                return <div key={"r" + n} className="flex justify-between">
                    {[...Array(width + 1)].map((x, i) => {
                        return <div key={"c" + n + String(i)}>
                            {i === 0 && <span>
                                {n + 1}
                            </span>}
                            {i > 0 && <input type="radio"
                                checked={config.display.order ? config.display.order[props.num][n] === i : false} 
                                name={"digit" + n} 
                                value={i}
                                onChange={() => orderChange(n, i)}
                            />}
                        </div>
                    })}
                </div>
            })}
        </div>
        <div className="text-center mt-2">
            <Button className="bg-green-600 hover:bg-green-700 text-text_dark" 
                onClick={() => sendShowCommand()} 
                label={showOrder ? i18n.t('cancel') : i18n.t('showOrder')} 
            />
        </div>
    </div>
}