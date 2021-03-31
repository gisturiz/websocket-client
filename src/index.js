import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { w3cwebsocket as W3CWebsocket } from 'websocket';

const client = new W3CWebsocket('ws://127.0.0.1:8000');

export default function App() {

    const onButtonClicked = (value) => {
        client.send(JSON.stringify({
            type: "message",
            msg: value,
        }));
    };

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply', dataFromServer);
        };
    });

    return (
        <div>
            <button onClick={() => onButtonClicked("Hello")}>Send Message</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));