import segmentFont from "./segmentFont";

const SEGMENT_PATHS = [
    new Path2D("m 55.578195,23.918293 h -1.212674 l -0.482314,-0.509875 q 0.192926,-0.151584 0.434083,-0.151584 h 1.405599 l 0.130914,0.01378 z"),
    new Path2D("m 55.674655,24.021645 0.303169,-0.70969 q 0.385851,0.172255 0.36518,0.606338 l -0.110243,1.722548 -0.234267,0.172255 -0.420302,-0.330729 z"),
    new Path2D("m 55.529961,26.329861 0.454753,-0.330729 0.213596,0.172254 -0.103353,1.715659 q -0.02756,0.440973 -0.440973,0.613228 l -0.220486,-0.709691 z"),
    new Path2D("m 54.117471,27.887045 h 1.212674 l 0.192926,0.654569 -0.130914,0.0069 h -1.4056 q -0.241157,0 -0.413412,-0.144694 z"),
    new Path2D("m 54.027901,27.797475 -0.544325,0.509874 q -0.137804,-0.179145 -0.117133,-0.420302 l 0.103353,-1.715659 0.234266,-0.172254 0.420302,0.330729 z"),
    new Path2D("m 54.172595,25.482369 -0.454752,0.330729 -0.213597,-0.172255 0.110244,-1.722548 q 0.01378,-0.234267 0.172254,-0.413412 l 0.482314,0.509874 z"),
    new Path2D("m 53.807415,25.902671 0.454753,-0.33073 h 1.219565 l 0.413411,0.33073 -0.454753,0.330729 h -1.219564 z")  // 6
];

export default function lcdSegmentFont(ctx: CanvasRenderingContext2D, x: number, y: number, symb: number, color: string, scale: number) {
    const code = segmentFont();
    const activeSymb = symb < code.length ? symb : 15;
    const activeSegments = code[activeSymb];

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.translate(-53.363748, -23.256833);

    SEGMENT_PATHS.forEach((path, index) => {
        ctx.fillStyle = activeSegments[index] ? color : '#000';
        ctx.fill(path);
    });

    ctx.restore();
};
