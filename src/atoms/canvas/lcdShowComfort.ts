import store from '../../redux/store';
import { printText } from "./primitives";
import lcdGetComfort from "../lcdGetComfort";

export default function lcdShowComfort(ctx: CanvasRenderingContext2D, 
    prevComfort: string, sequence: string, color: string, bgColor: string
): string {
    const comfort = lcdGetComfort(sequence).slice(0, 14);

    if(comfort !== prevComfort) {
        const model = store.getState().config.display.model[0];
        const dispModel = (model === 0 || model === 1) ? 0 : 1;
        const font = dispModel ? 14 : 18;
        const x = dispModel ? 145 : 196;
        const y = dispModel ? 29 : 27;
        const w = dispModel ? 175 : 130;
        printText(ctx, x, y, w, 18, comfort, font, 'center', color, bgColor);
    }

    return comfort;
}