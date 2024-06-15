import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

interface TokenResponse {
    access_token: string;
    expires_in: number;
}

// const generateToken = async (req: NextApiRequest, res: NextApiResponse<TokenResponse | { error: string }>) => {
 export async function POST(req: NextRequest, res: NextResponse<TokenResponse | { error: string }>) { 

try {
        const consumerKey = process.env.MPESA_CONSUMER_KEY;
        const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
              'Authorization': `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
            },
          });

           // Delay response by 15 seconds
         // Simulate 15 second delay
        //yawait new Promise(resolve => setTimeout(resolve, 15000));
        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
    }
};

//export default generateToken;
