export interface iValid {
    valid: {
        connect: boolean,
        accesspoint: boolean,
        wsensors: boolean,
        clock: boolean,
        display1: boolean,
        display2: boolean,
        history: boolean,
        receive: boolean,
        sendThingspeak: boolean,
        sendNarodmon: boolean,
        sendMqtt: boolean,
        account: boolean
    }
}