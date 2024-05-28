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
        console.log('New client connected')
        ws.send('Welcome to the websocket');
    
        //Error Emitter
        ws.on('error', console.error);

        
        //Message Emitter
        ws.on('message', function message(data) {
          console.log('received: %s', data);
          ws.send(`Client sent this message:${message}`);
        });
      
        //Disconnect
        ws.on('close', function close() {
            console.log('Client disconnected');
        });
    });
}

export const broadCast = (data:any )=>{
          wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(data));
            }
          });

}