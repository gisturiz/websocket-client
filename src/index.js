import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { w3cwebsocket as W3CWebsocket } from 'websocket';

const client = new W3CWebsocket('ws://127.0.0.1:8000');

export default function App() {

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        }
    }, [])

    return (
        <div>
            Testing App!
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));