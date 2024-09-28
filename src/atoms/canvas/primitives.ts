export function drawLine(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y + h);
    ctx.stroke();
}

export function line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
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

export function fillTriangle(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
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

export function printText(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, text: string, font: number, align: CanvasTextAlign, color: string, bgColor: string, valign=false) {
    fillRect(ctx, x, y, w, h, bgColor);
    ctx.font = `${font}px Ubuntu`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    if(align === 'center') x += w / 2;
    if(align === 'right') x += w;
    ctx.save();
    if(valign) ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y + font - font / 4);
    ctx.restore();
}

export function printScrollText(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, l: number, shift: number, text: string, font: number, color: string, bgColor: string): number {
    const canv = document.createElement('canvas');
    canv.width = l + w;
    canv.height = h;
    let cnv = canv.getContext('2d');
    if(cnv) {
        fillRect(cnv, 0, 0, l + w, h, bgColor);
        cnv.font = `${font}px Ubuntu`;
        cnv.fillStyle = color;
        cnv.textAlign = 'left';
        cnv.fillText(text, 0, 0 + font - font / 4);
        ctx.drawImage(canv, shift++, 0, w, h, x, y, w, h);
    }
    if(shift > (l + 1)) shift = 0 - w;

    return shift;
}

export function printSegment(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, text: string, font: number, color: string, bgColor: string) {
    fillRect(ctx, x - 1, y - 1, w + 2, h + 2, bgColor);
    ctx.font = `${font}px Segment7`;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.fillText(text, x, y + font - font / 4);
}