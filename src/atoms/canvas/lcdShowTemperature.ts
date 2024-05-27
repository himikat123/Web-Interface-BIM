import { printText, drawImage } from "./primitives";
import { temp_minus, temp_plus } from "../img/symbols";

function showTemperature(ctx: CanvasRenderingContext2D, temp: number, x: number, y: number, font: number, color: string, bgColor: string) {
    printText(ctx, x, y, 70, 26, (temp >= -50 && temp < 100) ? `${temp}°C` : '--°C', font, 'center', color, bgColor);
}

export function lcdShowTemperatureInside(ctx: CanvasRenderingContext2D, temp: number, font: number, color: string, bgColor: string) {
    showTemperature(ctx, temp, 173, 53, font, color, bgColor);
}

export function lcdShowTemperatureOutside(ctx: CanvasRenderingContext2D, temp: number, font: number, color: string, bgColor: string) {
    if(temp < 0) drawImage(ctx, temp_minus(), 62, 104);
    else drawImage(ctx, temp_plus(), 62, 104);
    showTemperature(ctx, temp, 71, 113, font, color, bgColor);
}