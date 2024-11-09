import { useDispatch, useSelector } from "react-redux";
import { iConfig } from "../../redux/configTypes";
import { displayOrderChange } from "../../redux/slices/config";
import i18n from "../../i18n/main";

export default function DisplayDigitsReassignment(props: any) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const width = config.display.model[props.num] <= 1 ? 6 : 8;

    function orderChange(dig: number, val: number) {
        dispatch(displayOrderChange({num: props.num, dig: dig, val: val}));
    }

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
                                checked={config.display.order[props.num][n] === i} 
                                name={"digit" + n} 
                                value={i}
                                onChange={() => orderChange(n, i)}
                            />}
                        </div>
                    })}
                </div>
            })}
        </div>
    </div>
}