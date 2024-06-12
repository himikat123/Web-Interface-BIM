export default function relPath(): string {
    let path = '';
    const pth = window.location.pathname.split('/');
    pth.pop();
    if(pth.length) path = pth.join('/');

    return path;
}