'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import { PayPalScriptProvider,PayPalButtons,usePayPalScriptReducer } from '@paypal/react-paypal-js';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../container/Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import Button from '../container/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import './paymentModal.css'
import usePaymentModal from '@/app/hooks/usePaymentModal';
import { IoMdClose } from 'react-icons/io';
import EventEmitter from 'events';
import { EventNotifier, getSSEWriter } from 'ts-sse'
import {z} from 'zod'





import io from 'socket.io-client'
import getCurrentUser from '@/app/actions/getCurrentUsers';
import { SafeUser } from '@/app/types';



const socket = io('/api/mpesa/callback', {
  path: '/api/mpesa/callback',
});

interface SocketEvents {
  message: (data: any) => void;
  // Add any other custom events here
}

interface User {
  // Define the properties of your User type
  // For example:
  id: string;
  name: string;
  // Add more properties as needed
}
interface ModalProps {
    setShowPayModal: React.Dispatch<React.SetStateAction<boolean>>;
    onPaymentComplete: (data: any) => void; // Define a callback prop
    totalPrice:string,
    currentUser?: SafeUser | null
  }
const PaymentModal: React.FC<ModalProps> = ({ setShowPayModal, onPaymentComplete, totalPrice, currentUser }) => {

  
    const [isScriptReady, scriptLoadPromise] = usePayPalScriptReducer();
    const closeModal = () => {
      setShowPayModal(false);
    }; 
    const router = useRouter()
    const registerModal = useRegisterModal();
    const paymentModal = usePaymentModal(); 
    const [isLoading, setIsLoading] = useState(false);
    const [mpesaPaymentSuccess, setMpesaPaymentSuccess] = useState(false);
    const [mpesaPaymentFailure, setMpesaPaymentFailure] = useState(false);
    const [payInitiated, setPayInitiated] = useState(false);
    
    const [mpesaloading, setMpesaloading] = useState(false);
    const [mpesaprocessing, setMpesaprocessing] = useState(false);

    const [formData, setFormData] = useState({ phoneNumber: '' });
    const [mpesaInitiateData, setMpesaInitiateData] = useState(null)
    


  const [value, setValue] = useState(null);

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

   


    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const paymentOptions = ['Paypal', 'Mpesa'];
    
  
    const handleMpesaPay = async (event:any) => {
      event.preventDefault()
      try {
        // Fetch access token
        setMpesaloading(true); // Set loading state to true when payment starts
        

        const response = await fetch('/api/mpesa/generatetoken', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          
        });
  
        console.log("Access token response", response)
        const { access_token } = await response.json();
        
  
        console.log("Access Tokennne", access_token)
  
        const finalData = {PhoneNumber:formData.phoneNumber,Amount:totalPrice, accessToken:access_token}

    

        setMpesaloading(false)
        setMpesaprocessing(true)
        
        const paymentResponse = await fetch('/api/mpesa/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        });
  
        const paymentData = await paymentResponse.json();
        setMpesaInitiateData(paymentData)
        
        // Handle success or error
        console.log('Payment response:', paymentData);
        // Display success message or handle errors
      } catch (error) {
        console.error("Error in form", error);
        // Display error message to user
      }
    };



    const completePayment = (data:any) => 
      {
        setPayInitiated(false)
        console.log(data.data)
        const paymentDetailsJson = JSON.parse(data.data.paymentDetails);
        const result_code = paymentDetailsJson.Body.stkCallback.ResultCode; 

        console.log("Resuslt code ", result_code)
        
        if(result_code===0)
          {
            setMpesaPaymentSuccess(true)
            onPaymentComplete(paymentDetailsJson)
            setMpesaprocessing(false)
          }
          else
          {
             
            setMpesaloading(false)
            setMpesaprocessing(false)
            setMpesaPaymentFailure(true)
          }
      }


    const fetchData = async () => {
      console.log("Current User ", currentUser)
      if(mpesaInitiateData!=null)
        {
      setIsLoading(true); // Set loading state (optional)
      try {
 

        const response = await axios.get("/api/mpesa/callback", {
          params: { transactionRef: JSON.stringify(mpesaInitiateData)  }, 
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.data;

        if(data.data)
        {

          console.log("Data returned from response", data.data.paymentDetails)
          completePayment(data)
         }
     

       
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Clear loading state (optional)

      }
    }
    };
    useEffect(() => {
   
      console.log("Mpesa Initiate Data changed:", mpesaInitiateData);
  
      if (mpesaInitiateData) {
        // Perform subsequent steps here
        setPayInitiated(true)
        console.log("Performing subsequent steps with Mpesa Initiate Data:", mpesaInitiateData);
      }
    }, [mpesaInitiateData]);

   useEffect(()=>{
     {
      if(payInitiated)
      {
       fetchData(); // Fetch data initially
       
       const interval = setInterval(() => {
         fetchData(); // Fetch data again at a set interval
        }, 15000); // Adjust polling interval as needed
        
        return () => clearInterval(interval); // Cleanup on component unmount
      }
      }},
      [payInitiated])




    const bodyContent = (
        <div className='payment_modal_container'>
          <div className="payment_modal_main_body">
            
          <IoMdClose size={18} className="payment_modal_close_icon" onClick={()=>setShowPayModal(false)}/>
          <h2 style={{fontWeight:'600',fontSize:'16px'}}>Payment</h2>
          <hr style={{color:'gray'}}/>
            <div className="payment_modal_top">
            {paymentOptions.map((option) => (
          <div
            key={option}
            className={`payment_option ${paymentMethod === option ? 'active' : ''}`}
            onClick={() => setPaymentMethod(option)}
          >
            {option}
          </div>
        ))}
                {/* <div className="payment_option">Paypal</div>
                <div className="payment_option">Mpesa</div> */}
            </div>
            {paymentMethod==='Paypal'?
            <div className="paypal">
            {/* <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}> */}
            



      <div>
                {isScriptReady ? (
                 
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalPrice,
                            },
                          },
                        ],
                      });
                    }}

                   onApprove={async (data, actions) => {

             if (actions?.order) {

                const order = await actions.order.capture();

                onPaymentComplete(order);

              }

              return;

            }}
/>
          
        ) : (
          <span>Loading PayPal Script...</span>
        )}
      </div>
   
            </div>
            : paymentMethod ==='Mpesa'? 
            <div className="mpesa">
              {mpesaloading? (<div>Loading...</div>):
              mpesaprocessing? (<div>Processing...</div>):

              
                (<form onSubmit={handleMpesaPay} className='mpesa_pay_form'>
                  {mpesaPaymentFailure && <div style={{color:"red"}}>Payment failed, please try again</div>}
                  <div className='mpesa_pay_formGroup'> {/* Wrap labels & inputs */}
                    <label className="mpesa_pay_label" htmlFor="phoneNumber">Enter Mpesa Number:</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      required
                      value={formData.phoneNumber} // Set value from state
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log('New value:', newValue);
                        setFormData({ ...formData, phoneNumber: newValue });
                      }}
                      className='mpesa_pay_phoneNumberInput'
                    />
                    {errors.PhoneNumber && <span className='mpesa_pay_error'>Please enter a valid phone number.</span>}
                  </div>
                  
                 
                 
                  <button type="submit" className='mpesa_pay_btn'>
                    Pay with Mpesa
                  </button>
                </form>
                )}
              
             </div>: 
             
             <div className="otherpayment">Payment not defined</div>
}
          </div>
           
        </div>
    
    )
  return (
  
    bodyContent
  
  )
}

export default PaymentModal