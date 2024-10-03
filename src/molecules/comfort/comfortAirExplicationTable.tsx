import i18n from "../../i18n/main";
import { iComfortAirExplicationTable } from "../../interfaces";

export default function ComfortAirExplicationsTable(props: iComfortAirExplicationTable) {
    return <table className="table-auto w-full mt-8">
        <thead>
            <tr className="bg-gray-200 dark:bg-gray-600">
                <th>{props.param}</th>
                <th>{i18n.t('airQuality')}</th>
            </tr>
        </thead>
        <tbody className="text-center text-black">
            <tr className="bg-green-200">
                <td>&lt; {props.min}</td>
                <td>{i18n.t('cleanAir')}</td>
            </tr>
            <tr className="bg-yellow-200">
                <td>{props.min} - {props.max}</td>
                <td>{i18n.t('polutedAir')}</td>
            </tr>
            <tr className="bg-red-300">
                <td>&gt; {props.max}</td>
                <td>{i18n.t('havilyPolutedAir')}</td>
            </tr>
        </tbody>
    </table>
}