// import { buffer } from 'micro';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { WebSocket, WebSocketServer } from 'ws';

import { NextRequest, NextResponse } from "next/server"
import { rickAstleySchema } from "./types"
import { Server } from "socket.io";

import http, { createServer } from 'http';

import { Socket } from 'net';

import { NextApiRequest, NextApiResponse } from "next";

// const wss = new WebSocketServer({ noServer: true });

// wss.on('connection', (ws: WebSocket) => {
//   console.log('WebSocket connection established');

//   ws.on('message', (data: string | Buffer) => {
//     // Handle the message received from the client
//     console.log('Received message:', data.toString());
//   });

//   ws.on('close', () => {
//     console.log('WebSocket connection closed');
//   });
// });


// // const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   export async function POST(req: NextApiRequest, res: NextApiResponse) { 

 
//     console.log("Callback reached")
//     if (req.method === 'POST') {
//     const buf = await buffer(req);
//     const callbackData = buf.toString();

//     const { socket, head } = await new Promise<{ socket: WebSocket; head: Buffer }>((resolve, reject) => {
//       wss.handleUpgrade(req, req.socket, Buffer.from(head || ''), (socket: any) => {
//         resolve({ socket, head: Buffer.from('') });
//       });
//     });

//     wss.emit('connection', socket, req);
//     res.status(101).end();


//     // Process the callback data

//     // You can parse the callback data and perform any necessary actions
//     // such as updating the payment status in your database

//     res.status(200).end();
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default handler;


// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';
// import { WebSocket, WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ noServer: true });

// wss.on('connection', (ws: WebSocket) => {
//   console.log('WebSocket connection established');

//   ws.on('message', (data: string | Buffer) => {
//     // Handle the message received from the client
//     console.log('Received message:', data.toString());
//   });

//   ws.on('close', () => {
//     console.log('WebSocket connection closed');
//   });
// });

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {
    
//   const { socket, head } = await new Promise<{ socket: WebSocket; head: Buffer }>((resolve, reject) => {
//     wss.handleUpgrade(req, req.socket, Buffer.from(head || ''), (socket: any) => {
//       resolve({ socket, head: Buffer.from('') });
//     });
//   });

//   wss.emit('connection', socket, req);
//   return res.status(101).end();
// } catch (error) {
    
//   console.log("Error in GET", error)
// }
// }

// export async function POST(req: NextApiRequest, res: NextApiResponse) { 
//   try {
    
 
//   console.log('Callback reached');

//   if (req.method === 'POST') {
//     console.log("before bufer")
//     const rawBody = await req.body;
//     const callbackData = rawBody.toString();

  

//     // Broadcast the callback data to all connected WebSocket clients
//     wss.clients.forEach((client: { readyState: any; send: (arg0: string) => void; }) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(callbackData);
//       }
//     });
    
    
//     res.status(200).json({ data: callbackData });
//   } else {
//     res.status(405).json({ status: 405, message: 'Method not allowed' });
//   }
// } catch (error) {

//   console.log("An error in POST", error)
    
// }
// }

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     console.log('Callback reached');

//     if (req.method === 'POST') {
//       console.log('before buffer');
//       const rawBody = await req.body;
//       const callbackData = rawBody.toString();

//       // Broadcast the callback data to all connected WebSocket clients
//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(callbackData);
//         }
//       });

//       return res.status(200).json({ data: callbackData });
//     } else {
//       return res.status(405).json({ status: 405, message: 'Method not allowed' });
//     }
//   } catch (error) {
//     console.log('An error in POST', error);
//     return res.status(500).json({ error: 'An error occurred' });
//   }
// }

// Initialize a WebSocket server


// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   // Initialize the Socket.IO server
//   // if (!io) {
//   //   const { query, socket, head } = parse(req.url || '', true);
//   //   io = new Server({ path: '/api/mpesa/callback' });
//   //   io.on('connection', (socket: Socket) => {
//   //     console.log('Socket.IO connection established');

//   //     socket.on('message', (data: string | Buffer) => {
//   //       // Handle the message received from the client
//   //       console.log('Received message:', data.toString());
//   //     });

//   //     socket.on('disconnect', () => {
//   //       console.log('Socket.IO connection closed');
//   //     });
//   //   });
//   // }

//   //return res.status(200).json({ message: 'Socket.IO server initialized' });
//   return NextResponse.json({ status: 200, message: 'An error occured' });   
// }


//-----------------------------------------------------------------------------------------------------

// let io: SocketIOServer;

// // Function to initialize the Socket.IO server
// function initializeSocketIO(server: http.Server) {
//   if (!io) {
//     io = new SocketIOServer(server, {
//       cors: {
//         origin: '*', // Allow connections from any origin (for development)
//       },
//     });

//     io.on('connection', (socket: Socket) => {
//       console.log('User connected to Socket.IO');

//       socket.on('payment-status-update', (data) => {
//         const { userId, paymentStatus, message } = data;
//         // ... Logic to identify connected clients associated with the user ID
//         // Broadcast the payment update to relevant clients
//         io.emit('payment-update', { paymentData: data });
//       });

//       // ... other event listeners for additional needs
//     });
//   }
// }

//--------------------------------------------------------------------------------------------------
// const callbackData = rawBody.toString();

// // Broadcast the callback data to all connected Socket.IO clients
// //io.emit('message', callbackData);
// console.log("Event emit started")
// eventEmitter.emit('mpesa-callback', callbackData);
// console.log("event emmited")


// return NextResponse.json({ data: callbackData });



//     const server = http.createServer((req, res) => { 
//       res.writeHead(404);
//       res.end('Not Found');
//   });

//   server.listen(3000, () => {
//     console.log('Socket.IO server listening on port 3000');
//   });

//   const io: SocketIOServer = new SocketIOServer(server, {
//       cors: {
//           origin: '*', // Allow connections from any origin (for development)
//       },
//   } as ServerOptions);





//   io.on('connection', (socket) => {
//     console.log('User connected to Socket.IO');

//     socket.on('payment-status-update', (data) => {
//         const { userId, paymentStatus, message } = data;
//         // ... Logic to identify connected clients associated with the user ID
//         // Broadcast the payment update to relevant clients
//         io.emit('payment-update', { paymentdata:paymentData});
//     });

//     // ... other event listeners for additional needs
// });


//==============================================================
// import EventEmitter from 'events';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';


// export async function GET(req, res) {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive'); 

//   // Send an initial event to the client
//   res.write('data: connected\n\n');

//   // Handle the SSE connection
//   const interval = setInterval(() => {
//     // Send data to the client
//     res.write('data: hello\n\n');
//   }, 5000);

//   req.on('close', () => {
//     clearInterval(interval);
//     res.end();
//   });

//   return NextResponse.next();
// }


//  import { NextApiRequest, NextApiResponse } from 'next';
// import { NextRequest, NextResponse } from 'next/server';



// export async function GET(req:, res) {
//   try {
//     console.log('Callback reached via GET');

//     // Set appropriate headers for SSE
//    const  response = new NextResponse(JSON.stringify({ event: 'approval' }), {
//       status: 200,
//       headers: {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         Connection: 'keep-alive',
//       },
//     });  

//     return response
//     // ... (Optional) Logic to keep the connection open ...

//   } catch (error) {
//     console.error('An error in GET', error);
//     // Handle errors appropriately
//   }
// }
// interface EventData {
//   // Define the structure of your data to be sent over SSE
//   [key: string]: any;
// }

// export async function GET(req: NextRequest) {
//   const res = new NextResponse();

//   // Set appropriate headers for SSE
//   res.headers.set('Content-Type', 'text/event-stream');
//   res.headers.set('Cache-Control', 'no-cache');
//   res.headers.set('Connection', 'keep-alive');

//   // Replace with your actual logic for fetching data from the third-party site
//   const data = await fetch('https://example.com/data'); // Replace URL
//   const jsonData: EventData = await data.json();

//   // Write initial data (alternative approach)
//   const body = `data: ${JSON.stringify(jsonData)}\n\n`;
//   res.text(body); // Set the response body with formatted data

//   // You can periodically simulate data updates (adjust interval as needed)
//   const intervalId = setInterval(() => {
//     // Simulate new data (replace with your actual logic)
//     const newData: EventData = { message: 'New data!' };
//     const newBody = `data: ${JSON.stringify(newData)}\n\n`;

//     // Alternative 1: Send a new NextResponse (less efficient)
//     // return new NextResponse.text(newBody); // Replace the entire response

//     // Alternative 2: Consider a third-party library (more efficient)
//     // ... (code using next-sse to write data efficiently)
//   }, 5000); // Update interval every 5 seconds

//   // Disconnection handling (consider alternative strategies)
//   console.warn('Direct disconnection handling not supported in current Next.js version. Consider alternative strategies:');
//   console.warn('- Utilize a third-party library like `next-sse` (if applicable)');
//   console.warn('- Implement long polling for more robust disconnection handling');

//   return res;
// }
 
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   // Handle the POST request from the third-party site
//   console.log('Received POST request:', await req.json());

//   // Trigger the action in your frontend
//   return NextResponse.json({ message: 'Action triggered in the frontend' });
// }

// export async function GET(req: NextRequest) {
//   const res = new NextResponse();

//   res.headers.set('Content-Type', 'text/event-stream');
//   res.headers.set('Cache-Control', 'no-cache');
//   res.headers.set('Connection', 'keep-alive');


//   // Write data to the response stream when available
//   res.write(`data being from GET`);

 

//   return res;
// }




// import { EventNotifier, getSSEWriter } from 'ts-sse'
// import z from 'zod'
// import { NextApiRequest, NextApiResponse } from "next"

// import { Server as WebSocketServer } from 'socket.io'; // Assuming 'socket.io' is installed


// type SyncEvents = EventNotifier<{
//   update: {
//     data: z.infer<typeof rickAstleySchema>
//     event: 'update'
//   }
//   complete: {
//     data: z.infer<typeof rickAstleySchema>
//     event: 'update'
//   }
//   close: {
//     data: never
//   }
//   error: {
//     data: never
//   }
// }>


// export async function GET(request: NextRequest) {
//   const responseStream = new TransformStream()
//   const writer = responseStream.writable.getWriter()
//   const encoder = new TextEncoder()
//   let abort = false

//   request.signal.onabort = () => {
//     abort = true
//     writer.close()
//   }

//   const beforeFn = (message: { data: string; event: 'update' }) => {
//     rickAstleySchema.parse(message.data)
//     if (abort) {
//       throw new Error('Abort!')
//     }
//   }

//   const messages = [
//     'Never gonna give you up',
//     'Never gonna let you down',
//     'Never gonna run around and desert you',
//     'Never gonna make you cry',
//     'Never gonna say goodbye',
//     'Never gonna tell a lie and hurt you',
//     'fin',
//   ]
//   const syncStatusStream = async (notifier: SyncEvents) => {
//     for (const message of messages) {
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       notifier.update({ data: message, event: 'update' }, { beforeFn })
//     }
//   }

//   syncStatusStream(getSSEWriter(writer, encoder))

//   return new NextResponse(responseStream.readable, {
//     headers: {
//       'Content-Type': 'text/event-stream',
//       Connection: 'keep-alive',
//       'Cache-Control': 'no-cache, no-transform',
//     },
//   })
// }

// export async function POST(req: NextRequest) {
//   // Handle the POST request from the third-party site
//   const data = await req.json()
//   console.log('Received POST request:', data);

//   // Trigger the action in your frontend
//   return new NextResponse(data, {
//     headers: {
//       'Content-Type': 'text/event-stream',
//       Connection: 'keep-alive',
//       'Cache-Control': 'no-cache, no-transform',
//     },
//   })
// }
import getCurrentUser from "@/app/actions/getCurrentUsers";

// import prisma from '@/app/libs/prismadb';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export async function GET(req: NextRequest, res: NextResponse) {
  try {

    
   
   // console.log("Queeery", req)
    //const {userId} = req.query
    const url = new URL(req.url);
    const transactionRefString = url.searchParams.get('transactionRef');
    let transactionRef: any;
    
    if (transactionRefString !== null) {
      transactionRef = JSON.parse(transactionRefString);
      console.log("Transaction ref" ,transactionRef)
    } else {
        // Handle the case when transactionRefString is null
    } //const userId = req.query.userId as string; // Assuming userId is passed as a query parameter

  
    
    const merchantRequestId = transactionRef?.MerchantRequestID
    const checkoutRequestID = transactionRef?.CheckoutRequestID

    console.log("Merchant RequestID for search", merchantRequestId)
    console.log("Checkout request ID for search", checkoutRequestID)
    // Fetch the payment log record with the specified userId
    // const paymentLog = await prisma.paymentlog.findFirst({
    //   where: {
    //     phoneNumber: phoneNumber, // Assuming userId is of type number
    //   },
    // });
  // Fetch the payment log record (using findUnique or findFirst with limit)
  // Search for payment log using Prisma filtering
  const paymentLog = await prisma.paymentlog.findFirst({
    where: {
        merchantRequestId:
        merchantRequestId
    }
  }
);

console.log("Paymenent Log", paymentLog)

    if (!paymentLog) {
      //return NextResponse.json({ error: 'Payment log not found' });
      return NextResponse.json({ message: 'Action triggered in the frontend', status: 404 });
     // return res.status(404).json({ error: 'Payment log not found' });
    }


    console.log("PAYMENTLOG",paymentLog)
    
    //return NextResponse.json({data:paymentLog});
    if(paymentLog)
      {

        return NextResponse.json({data: paymentLog});
      }
      else
      {

        return NextResponse.json(null);
      }
    //return res.status(200).json(paymentLog);

  
  } catch (error) {
    console.error('Error retrieving payment log:', error);
   // return NextResponse.json({ error: 'An error occurred while retrieving payment log' });

   return NextResponse.json({ error: "an errror occured while retireving payhmebnt log"});
   //return res.status(500).json({ error: 'An error occurred while retrieving payment log' });
  }
}
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {

    
   
   // console.log("Queeery", req)
    //const {userId} = req.query
    const url = new URL(req.url);
    const transactionRefString = url.searchParams.get('transactionRef');
    let transactionRef: any;
    
    if (transactionRefString !== null) {
      transactionRef = JSON.parse(transactionRefString);
      console.log("Transaction ref" ,transactionRef)
    } else {
        // Handle the case when transactionRefString is null
    } //const userId = req.query.userId as string; // Assuming userId is passed as a query parameter

  
    
    const merchantRequestId = transactionRef?.MerchantRequestID
    const checkoutRequestID = transactionRef?.CheckoutRequestID

    console.log("Merchant RequestID for search", merchantRequestId)
    console.log("Checkout request ID for search", checkoutRequestID)
    // Fetch the payment log record with the specified userId
    // const paymentLog = await prisma.paymentlog.findFirst({
    //   where: {
    //     phoneNumber: phoneNumber, // Assuming userId is of type number
    //   },
    // });
  // Fetch the payment log record (using findUnique or findFirst with limit)
  // Search for payment log using Prisma filtering
  const deletedPaymentLog = await prisma.paymentlog.deleteMany({
    where: {
      merchantRequestId: merchantRequestId,
    },
  });

console.log("Paymenent Log", deletedPaymentLog)

    if (!deletedPaymentLog) {
      //return NextResponse.json({ error: 'Payment log not found' });
      return NextResponse.json({ message: 'Action triggered in the frontend', status: 404 });
     // return res.status(404).json({ error: 'Payment log not found' });
    }


   
    
    //return NextResponse.json({data:paymentLog});
    if(deletedPaymentLog)
      {

        return NextResponse.json({message:"deleted"});
      }
      else
      {

        return NextResponse.json({message:"failed"});
      }
    //return res.status(200).json(paymentLog);

  
  } catch (error) {
    console.error('Error retrieving payment log:', error);
   // return NextResponse.json({ error: 'An error occurred while retrieving payment log' });

   return NextResponse.json({ error: "an errror occured while retireving payhmebnt log"});
   //return res.status(500).json({ error: 'An error occurred while retrieving payment log' });
  }
}

export async function POST(req:NextRequest, res:NextApiResponse) {

  //const body = await buffer(req);
  const paymentDetails =await req.json()

  console.log("Pmanent details===::>", paymentDetails)

    // Accessing PhoneNumber
const merchantRequestID = paymentDetails.Body.stkCallback.MerchantRequestID
const checkoutRequestID = paymentDetails.Body.stkCallback.CheckoutRequestID



   
    const paylog = await prisma.paymentlog.create({
        data: {
            
            paymentDetails:JSON.stringify(paymentDetails),
            merchantRequestId: merchantRequestID,
            checkoutRequestId: checkoutRequestID,
            
          
        }
    });

    console.log("Payment saved....")
    console.log("saved", paylog)
 
    return NextResponse.json({data:paylog});

}



