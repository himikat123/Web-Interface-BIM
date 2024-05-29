export function drawLine(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y + h);
    ctx.stroke();
}

export function fillCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

export function drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, color: string) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.stroke();
}

export function fillRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

export function drawImage(ctx: CanvasRenderingContext2D, image: string, x: number, y: number) {
    let img = new Image();
    img.onload = () => ctx.drawImage(img, x, y);
    img.src = image;
}

export function drawScaledImage(ctx: CanvasRenderingContext2D, image: string, x: number, y: number, w: number, h: number) {
    let img = new Image();
    img.onload = () => ctx.drawImage(img, x, y, w, h);
    img.src = image;
}

export function printText(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, text: string, font: number, align: CanvasTextAlign, color: string, bgColor: string) {
    fillRect(ctx, x, y, w, h, bgColor);
    ctx.font = `${font}px Ubuntu`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    if(align === 'center') x += w / 2;
    if(align === 'right') x += w;
    ctx.fillText(text, x, y + font - font / 4);
}