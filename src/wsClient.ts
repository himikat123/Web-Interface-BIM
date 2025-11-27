import store from "./redux/store"; 
import { setDataState } from "./redux/slices/data"; 

let ws: WebSocket | null = null; 
let reconnectTimer: any = null;

export function initWebSocket() {
    try {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const host = window.location.hostname;
        const url = `${protocol}//${host}:88`;

        ws = new WebSocket(url);

        ws.onopen = () => {
            console.log("WS connected");
            if(reconnectTimer) clearTimeout(reconnectTimer);
        };

        ws.onmessage = (evt) => {
            try {
                const json = JSON.parse(evt.data);
                store.dispatch(setDataState(json));
                console.log("message received: ", json);
            } 
            catch (e) { console.error("WS bad JSON:", e); }
        };

        ws.onclose = () => {
            console.log("WS disconnected");
            ws = null;
            reconnectTimer = setTimeout(initWebSocket, 3000);
        };

        ws.onerror = () => {
            console.log("WS error");
            ws?.close();
        };
    }
    catch (err) {
        console.error("WS init failed:", err);
        reconnectTimer = setTimeout(initWebSocket, 3000);
    }
}
