'use client'

import axios, { AxiosResponse } from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../container/Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import Button from '../container/Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';
import getCurrentUser from '@/app/actions/getCurrentUsers';
import Lago from '../navbar/Lago';
import Link from "next/link"

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const userType = registerModal.userType
    const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
    const [emailError, setEmailError] = useState(''); // Error state for email

    
    const checkEmailExists = async (email: any) => {
        console.log("Main", email)
        try {
          const response = await axios.post('/api/users', { email });
          console.log("response mail check", response)
          return response.data.exists; // Expecting { exists: true/false }
        } catch (error) {
          console.error("Error checking email:", error);
          return false; // Or handle error appropriately
        }
      };

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            contact: '',
            country: ''
            
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

         // Check if email exists before submitting
    const emailExists = await checkEmailExists(data.email);
    if (emailExists) {
        setEmailError('Email is already registered');
        setIsLoading(false);
        return;
      }
        axios.post('/api/register', {...data, userType:userType})
            .then(async () => {

                try {
                    const response = await axios.post('/api/mailing/',

                    // const response: AxiosResponse<any> = await axios.post('/api/mailing/',
                    
         
                      {sender:'devancatour@gmail.com',
                          recipient:data.email,
                             subject:"Registration Successful",
                             user_name:data.name,
                             templateName: 'sign_up_template',
                             baseUrl: baseUrl,
                            
                                },

                                {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                    );
                
                    const dataa = await response.data;
                    console.log(dataa); // handle success message
                
                  } catch (error) {
                    console.error(error); // handle error message
                  }

                toast.success('Registration successful!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                // console.log(error)
                toast.error('Something went wrong, try again!');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        loginModal.onOpen();
        registerModal.onClose();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Create a new account'
                subtitle=''
                // center
            />
             {emailError && <p className="text-red-500">{emailError}</p>} {/* Display manual email error */}
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                error={errors}
                required
            />
            <Input
                id='contact'
                label='contact'
                type='text'
                disabled={isLoading}
                register={register}
                error={errors}
                required
            />
            {/* <Input
                id='country'
                label='country'
                type='text'
                disabled={isLoading}
                register={register}
                error={errors}
                required
            /> */}
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                error={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                error={errors}
                required
            />
            <p className='text-[12px]'>By continuing, you agree to Lee-yan smart properties <Link href="/" className='text-blue-600'>Conditions of Use</Link> and <Link href="/" className='text-blue-600'>Privacy Notice.</Link></p>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            {/* <div className='google-btn'>
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
                />
            </div> */}
            <div className='text-normal-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div
                        onClick={toggle}
                        className='text-neutral-800 w-full justify-center hover:bg-neutral-100 border-[1px] border-solid border-neutral-300 rounded-lg px-5 py-[6px] text-sm hover:shadow-md cursor-pointer'>
                        Already have an account? Log in
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
          disabled={isLoading}  
          isOpen={registerModal.isOpen} 
          title={<Lago />}
          actionLabel='Continue'
          onClose={registerModal.onClose}
          onSubmit={handleSubmit(onSubmit)} 
          body={bodyContent}
          footer={footerContent}
    />
  )
}

export default RegisterModal