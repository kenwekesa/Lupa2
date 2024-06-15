// import { NextResponse, NextWebSocket } from 'next/server';

// export const config = {
//   runtime: 'edge',
// };

// export default async function handler(req) {
//   if (req.method === 'GET') {
//     return NextWebSocket(req, (socket) => {
//       console.log('WebSocket connection established');

//       socket.on('message', (data) => {
//         console.log('Received message:', data);
//         // Handle the message and trigger the necessary actions
//       });

//       socket.on('close', () => {
//         console.log('WebSocket connection closed');
//       });
//     });
//   }

//   return NextResponse.json({ message: 'WebSocket server is running' }, { status: 200 });
// }