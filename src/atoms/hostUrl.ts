const hostUrl = () => {
    const origin = window.location.origin;
    const href = [origin.split(':')[0], origin.split(':')[1]].join(':');
    
    return href;
}

export default hostUrl;