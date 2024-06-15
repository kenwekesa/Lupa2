import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';



interface MpesaPaymentRequest {
    PhoneNumber: string;
    Amount: number;
    ShortCode: string;
    AccountReference: string;
    accessToken:string;
}

const generatePassword = (shortCode: number, passkey: string, timestamp: string): string => {
    const data = `${shortCode}${passkey}${timestamp}`;
    const password = Buffer.from(data).toString('base64');
    return password;
  };



const initiatePayment = async (req: NextApiRequest, res: NextApiResponse<any | { error: string }>) => {
    try {
        console.log("BOOOOOODY", req.body)
        const { PhoneNumber, Amount, ShortCode, AccountReference, accessToken }: MpesaPaymentRequest = req.body;

       // const accessToken = await getAccessToken(); // Call a function to retrieve access token


       console.log("server received acess token===>", accessToken)
       console.log("server received amount===>", Amount)
       console.log("server received phone===>", PhoneNumber)

       // Generate the timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);

    // Generate the password
    const passkey = process.env.MPESA_PASS_KEY || '' // Replace with your actual passkey
    const password = generatePassword(174379, passkey, timestamp);

    console.log("Pass keyyyyyyyyyyyy::::>", passkey)
    console.log("Password generated::::::>>>", password)

        const data = {
            BusinessShortCode: 174379,
            Password: password,
            Timestamp: timestamp,//new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
            TransactionType: process.env.MPESA_TRANSACTION_TYPE || 'CustomerPayBillOnline',
            Amount: Amount,
            PartyA: `254${PhoneNumber.slice(1)}`, // Sanitize the phone number,
            PartyB:174379,   // 4119567,
            PhoneNumber: `254${PhoneNumber.slice(1)}`, // Sanitize the phone number,
            CallBackURL: 'https://b3ce-196-200-35-68.ngrok-free.app/api/callback', // Replace with your callback URL
            TransactionDesc: "stk push",
            AccountReference: 'Payment for your purchase',
        };

        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to initiate payment' });
    }
};


export default initiatePayment;


// import axios, { AxiosResponse } from 'axios';

// const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
// const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
// const MPESA_PASSKEY = 'your_passkey';

// type PaymentRequest = {
//   amount: number;
//   phone: string;
//   description: string;
// };

// type AccessTokenResponse = {
//   access_token: string;
//   expires_in: string;
// };

// type PaymentResponse = {
//   // Define the structure of the payment response according to the M-Pesa API
// };

// interface MpesaPaymentRequest {
//     PhoneNumber: string;
//     Amount: number;
//     ShortCode: string;
//     AccountReference: string;
//     accessToken:string;
// }

// const getStkPushPassword = (timestamp: string): string => {
//   const data = `${MPESA_CONSUMER_KEY}${MPESA_PASSKEY}${timestamp}`;
//   const encodedPassword = Buffer.from(data).toString('base64');
//   return encodedPassword;
// };

// export const initiatePayment = async (
//   req: NextApiRequest
// ): Promise<AxiosResponse<PaymentResponse>> => {
//   try {

//     const { PhoneNumber, Amount, ShortCode, AccountReference, accessToken }: MpesaPaymentRequest = req.body;

    
  
//    // const accessToken = tokenResponse.data.access_token;

//     // Step 2: Initiate an M-Pesa payment
//     const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
//     const password = getStkPushPassword(timestamp);

//     const paymentResponse: AxiosResponse<PaymentResponse> = await axios.post(
//       'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
//       {
//         BusinessShortCode: '600000',
//         Password: password,
//         Timestamp: timestamp,
//         TransactionType: 'CustomerPayBillOnline',
//         Amount: Amount,
//         PartyA: `254${PhoneNumber.slice(1)}`, // Sanitize the phone number
//         PartyB: '600000',
//         PhoneNumber: `254${PhoneNumber.slice(1)}`, // Sanitize the phone number
//         CallBackURL: 'your_callback_url',
//         AccountReference: 'Ref',
//         TransactionDesc: 'Description',
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     return paymentResponse;
//   } catch (error) {
//     console.error('Error while paying:', error);
//     throw new Error('An error occurred during the payment process');
//   }
// };

// export default initiatePayment;
