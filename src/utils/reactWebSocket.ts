import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv'
dotenv.config()

const config: any = {
    port: process.env.NODE_WEBHOOK_PORT
}

const wss = new WebSocketServer(config);

export const reactWebSocketInstance = async(): Promise<void> =>{
    wss.on('connection', function connection(ws) {
        //Initialization message
        ws.send('Welcome to the websocket');
    
        //Error Emitter
        ws.on('error', console.error);
        console.log('New client connected')
      
        //Message Emitter
        ws.on('message', function message(data) {
          console.log('received: %s', data);
          ws.send(`Client sent this message:${message}`); //Should return array
        });
      
        //Disconnect
        ws.on('close', function close() {
            console.log('Client disconnected');
        });
    });
}

