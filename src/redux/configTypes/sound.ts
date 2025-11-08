export default interface iSound {
    vol: number,
    eq: number,
    hourly: number,
    hour: {
        from: string,
        to: string
    }
}