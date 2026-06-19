import store from "./redux/store";
import { setDataState, dataStateChange, wsConnectedChange } from "./redux/slices/data";

let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 3;
let ws: WebSocket | null = null;
let reconnectTimer: any;
let heartbeatTimer: ReturnType<typeof setTimeout> | null = null;

const HEARTBEAT_TIMEOUT = 5000;

export function initWebSocket() {
    try {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const host = window.location.hostname;
        const url = `${protocol}//${host}:88`;

        ws = new WebSocket(url);

        ws.onopen = () => {
            console.log("WS connected");
            reconnectAttempts = 0;
            if(reconnectTimer) clearTimeout(reconnectTimer);
            store.dispatch(dataStateChange('ok'));
            startHeartbeat();
            store.dispatch(wsConnectedChange(true));
        };

        ws.onmessage = (evt) => {
            resetHeartbeat();
            try {
                const json = JSON.parse(evt.data);
                store.dispatch(setDataState(json));
                console.log("message received:", json);
                setTimeout(() => sendLocalCode(), 0);
                if((json.state === 'LOGIN') && (window.location.pathname !== '/login') && !window.location.hash.includes('#/login')) {
                    window.location.href = '/#/login';
                }
            } 
            catch (e) {
                console.error("WS bad JSON:", e, evt.data);
            }
        };

        ws.onclose = () => {
            console.log("WS disconnected");
            ws = null;
            clearHeartbeat();
            reconnectAttempts++;
            if(reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) store.dispatch(dataStateChange('error'));
            reconnectTimer = setTimeout(initWebSocket, 3000);
            store.dispatch(wsConnectedChange(false));
        };

        ws.onerror = () => {
            console.log("WS error");
            ws?.close();
        };
    }
    catch (err) {
        console.error("WS init failed:", err);
        reconnectTimer = setTimeout(initWebSocket, 3000);
        store.dispatch(dataStateChange('error'));
        store.dispatch(wsConnectedChange(false));
    }
}

function startHeartbeat() {
    resetHeartbeat();
}

function resetHeartbeat() {
    if(heartbeatTimer) clearTimeout(heartbeatTimer);
    heartbeatTimer = setTimeout(() => {
        console.warn("No WS data for 5s → force close");
        ws?.close();
    }, HEARTBEAT_TIMEOUT);
}

function clearHeartbeat() {
    if(heartbeatTimer) clearTimeout(heartbeatTimer);
    heartbeatTimer = null;
}

function sendLocalCode() {
    if(!ws || ws.readyState !== WebSocket.OPEN) return;

    const code = localStorage.getItem('code');
    if(!code) return;

    ws.send(code);
    console.log("WS code sent:", code);
}
