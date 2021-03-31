import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { w3cwebsocket as W3CWebsocket } from 'websocket';
import { Card, Avatar, Input, Typography, message } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const client = new W3CWebsocket('ws://127.0.0.1:8000');

export default function App() {

    const [userName, setUsername] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [searchVal, setSearchVal] = useState();

    const onButtonClicked = (value) => {
        client.send(JSON.stringify({
            type: "message",
            msg: value,
            user: userName
        }));
        setSearchVal();
    };

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply', dataFromServer);
            if (dataFromServer.type === 'message') {
                setMessages([...messages,
                {
                    msg: dataFromServer.msg,
                    user: dataFromServer.user
                }
                ])
            }
        };
    });

    return (
        <div className='main'>
            {isLoggedIn ?
                <div>
                    <div className='title'>
                        <Text type='secondary' style={{ fontSize: '36px', color: 'white' }}>WebSocket Chat</Text>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }} id='messages'>
                        {messages.map(msg =>
                            <Card key={msg.msg} style={{ width: 300, margin: '16px 4px 0 4px', alignSelf: userName === msg.user ? 'flex-end' : 'flex-start' }} loading={false}>
                                <Meta
                                    avatar={
                                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{msg.user[0].toUpperCase()}</Avatar>
                                    }
                                    title={msg.user + ":"}
                                    description={msg.msg}
                                />
                            </Card>
                        )}
                    </div>
                    <div className='bottom'>
                        <Search
                            placeholder='Say something...'
                            enterButton='Send'
                            value={searchVal}
                            size='large'
                            onChange={(e) => setSearchVal(e.target.value)}
                            onSearch={value => onButtonClicked(value)}
                        />
                    </div>
                </div>
                :
                <div style={{ padding: '200px 40px' }}>
                    <Search
                        placeholder="Enter Username"
                        enterButton="Login"
                        size="Large"
                        onSearch={value => (setIsLoggedIn(true), setUsername(value))}
                    />
                </div>
            }

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));