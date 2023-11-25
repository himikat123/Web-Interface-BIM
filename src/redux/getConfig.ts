

const getConfig = () => {
    fetch("./config.json")
    .then(res => res.json())
    .then(
        (result) => {
            console.log(result);
            //config: result
        },
        (error) => {
            console.error(error);
            //this.setState({ configState: { isLoaded: true, error }, config: { lang: 'en' } });
        }
    )
    .then(() => {
        console.log('done');
        //if(!this.state.configState.isLoaded || this.state.configState.error) {
        //    setTimeout(() => {
        //    this.getConfig();
        //    }, 5000);
        //}
    })
}

export { getConfig };