import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface TokenResponse {
    access_token: string;
    expires_in: number;
}

const generateToken = async (req: NextApiRequest, res: NextApiResponse<TokenResponse | { error: string }>) => {
    try {
        const consumerKey = process.env.MPESA_CONSUMER_KEY;
        const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
              'Authorization': `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
            },
          });
          
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate token' });
        
    }
};

export default generateToken;
