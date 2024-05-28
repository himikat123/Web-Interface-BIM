import { printText } from "./primitives";

export default function lcdShowWeekday(ctx: CanvasRenderingContext2D, weekDay: string, prevWeekDay: string, font: number, color: string, bgColor: string): string {
    if(weekDay !== prevWeekDay) {
        if(weekDay.length === 2) printText(ctx, 146, 6, 40, 20, weekDay, font, 'left', color, bgColor);
    }

    return weekDay;
}