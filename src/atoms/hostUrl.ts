const hostUrl = () => {
    const origin = window.location.origin;
    let href = [origin.split(':')[0], origin.split(':')[1]].join(':');
    if(href !== 'http://localhost') href = '.';    
    return href;
}

export default hostUrl;