'use client'

import Container from "@/app/components/container/Container";
import ListingReservation from "@/app/components/listing/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser, safeListing, safeOffer, safeReservation, safeProperty, safeLand } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import { safeTour } from "@/app/types";
import TourHead from "@/app/components/listing/TourHead";
import TourInfo from "@/app/components/listing/TourInfo";
import { SlCalender } from "react-icons/sl";
import dynamic from "next/dynamic";
import { CiGift } from "react-icons/ci";
import useCountries from "@/app/hooks/useCountries";
import { SlLocationPin } from "react-icons/sl";
import { ImLocation2 } from "react-icons/im";
import { GiWorld } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentModal from "@/app/components/Modals/PaymentModal";
import { IoIosPeople } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
 import { FiPhoneCall } from "react-icons/fi";
import ListingHead from "@/app/components/listing/ListingHead";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GiCash } from "react-icons/gi";
import {MdOutlineMeetingRoom} from "react-icons/md";
import { MdPhotoSizeSelectSmall } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import {SiBandsintown} from "react-icons/si";
import { FaCity } from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
import { RiArticleFill } from "react-icons/ri";
import { PiSubtitles } from "react-icons/pi";
import { MdOutlineCategory } from "react-icons/md";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface TourClientProps {
    reservations?: safeReservation[];
    tour: safeLand & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    locationValue: string;
}

const TourClient: React.FC<TourClientProps> = ({
    tour,
    reservations = [],
    currentUser,
    locationValue
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservations) => {
            const range = eachDayOfInterval({
                start: new Date(reservations.startDate),
                end: new Date(reservations.endDate)
            });

            dates = [...dates, ...range]
        })

        return dates;
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(tour.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [isOpen, setIsOpen] = useState(false); 
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);
    const [isOpen8, setIsOpen8] = useState(false);
    const [isOpen9, setIsOpen9] = useState(false);
    const [isOpen10, setIsOpen10] = useState(false);
    const [isOpen11, setIsOpen11] = useState(false);
    const [isOpen12, setIsOpen12] = useState(false);
    const [isOpen13, setIsOpen13] = useState(false);
    const [isOpen14, setIsOpen14] = useState(false);
    const [isOpen15, setIsOpen15] = useState(false);
    const [isOpen16, setIsOpen16] = useState(false);
    const [isOpen17, setIsOpen17] = useState(false);
    const [isOpen18, setIsOpen18] = useState(false);
    const [showPay, setShowPay] = useState(false)
    // const [selectedPaymentAmount, setSelectedPaymentAmount] = useState<number>(tour.price); // State to track the selected payment amount
    const [selectedPaymentAmount, setSelectedPaymentAmount] = useState<number>(Number(tour.price as string));
    const [dataa, setDataa] = useState('')
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;


    const [numberOfTourists, setNumberOfTourists] = useState(0);
    const [error, setError] = useState('');
    const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';   //Wanna ge the base url of the current app

    const [options, setOptions] = useState(
        {
        guests: 0,
        rooms: 0}
    )

    const [openoptions, setOpenoptions] = useState(false)
    const numberOfGuestsRef = useRef<HTMLInputElement>(null);



    const [showAll, setShowAll] = useState(false);
  
    // const offers = tour.amenities || [];
    // const displayedOffers = showAll ? offers : offers.slice(0, 7);

    // const handleShowMore = () => {
    //     setShowAll(true);
    // };

    const [itExpanded, setItExpanded] = useState(false);

    const ToggleExpands = () => {
        setItExpanded(!itExpanded);
    };
    
     // Function to handle the payment amount selection
    const handlePaymentAmountSelect = (amount: number) => {
        setSelectedPaymentAmount(amount);
    };


        const handlePaymentComplete = (data: any) => {
        // Handle the data passed from PaymentModal
        console.log('Payment completed with data:', data);
        setDataa(data);
        // You can also update the state or trigger other actions
        // ...
        // Check if payment was successful
        if (data && data.status === 'COMPLETED') {
            // Payment was successful, proceed to make reservation
            makeReservation(data);
        } else {
            // Payment failed or was cancelled
            // Handle accordingly, show error message or take appropriate action
            console.log('Payment failed or cancelled.');
            // Optionally, you can show a toast or error message
            toast.error('Payment failed or was cancelled.');
        }
        };
    
      const makeReservation = (data:any) => {
      
          if (data && data.status === 'COMPLETED') {
      
              {
                  setShowPay(false)
                  console.log("Payment Data", dataa)
                  axios.put(`/api/property/${tour?.id}`, {
                      from_flag:'reservation',
                      totalPrice: selectedPaymentAmount,
                      startDate: dateRange.startDate,
                      endDate: dateRange.endDate,
                      tourId: tour?.id,
                      paymentDetails: data,
                      userId: currentUser?.id,
                      slots: options.guests, // Include guests count
                    //   tourists: tour ? tour.tourists : [],
                      rooms: options.rooms // Include rooms count
                  })
                      .then(async () => {
                          toast.success('Listing reserved!');

                          setDateRange(initialDateRange);
                          // redirect to /trips
                          try {
                              const response = await axios.post('/api/mailing/',
                  
                                  {
                                      sender: 'Info@devancatours.com',
                                      recipient: 'wanjooo.ken@gmail.com',
                                      subject: "Devance Reservations",
                                      user_name: currentUser?.name,
                                      templateName: 'tour_mail_template',
                                      baseUrl: baseUrl,
                                      mail_body: `This is a sample test mail from Devance Application and these are the reservatio`

                                  },

                                  {
                                      headers: {
                                          'Content-Type': 'application/json'
                                      }
                                  }
                              );
                
                              const data = await response.data;
                              console.log(data); // handle success message
                
                          } catch (error) {
                              console.error(error); // handle error message
                          }
                          //router.push('/trips');
                      }).catch(() => {
                          toast.error('Something went wrong')
                      }).finally(() => {
                          setIsLoading(false);
                      })
              }
           } else {
                // Payment data is missing or payment was not successful
                // Show error message or take appropriate action
                // console.log('Error: Payment data is missing or payment was not successful.');
                // // Optionally, you can show a toast or error message
                // toast.error('Error: Payment data is missing or payment was not successful.');
            }
            };


      const onCreateReservation = useCallback(() => {

        console.log(baseUrl)

        if (options.guests <= 0) {
            setError('Specify number of tourists, must be greater than 0.');
            return;
          }



        if (!currentUser) {
            return loginModal.onOpen()
        }

       
        try {
            setShowPay(true)
        } catch (error) {
            console.log(error)
        }
       setIsLoading(true);
    }

  , [
        totalPrice,
        dateRange,
        tour?.id,
        router,
        currentUser,
        loginModal,
   
    ]);
    const Map = dynamic(() => import('../../components/container/Map'), {
        ssr: false
    } )

    // Calucating the price. 
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            // if (dayCount && tour.price) {
            //     setTotalPrice(dayCount * tour.price);
            // } else {
            //     setTotalPrice(tour.price);
            // }
        }
    }, [dateRange, tour.price])

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === tour.category);
    }, [tour.category])


    const handleOptions = (name: 'guests' | 'rooms', operations: any) => {
      
            const guestsDets = {
                ...options,
                [name]: operations === 'i' ? options[name] + 1 : options[name] - 1,
            }

            setTotalPrice(tour.price)
      
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operations === 'i' ? options[name] + 1 : options[name] - 1,
            };
        });
        
    };

    const toggleOptions = () => {
        setOpenoptions(!openoptions)
    };



    const handleClickOutside = (event: { target: any; }) => {
        if (numberOfGuestsRef.current && !numberOfGuestsRef.current.contains(event.target)) {
            setOpenoptions(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


//   const calculateTotalPrice = () => {
//     return options.guests * tour.price + options.rooms ;
//   };

  return (
    <Container>
          <div className="max-w-sreen-lg mx-auto">
              <div className="flex flex-col mt-6 gap-6">
                  <ListingHead
                      title={tour.title}
                      imageSrc={tour.imageSrc}
                      id={tour.id}
                      town={tour.town}
                      currentUser={currentUser}
                  /> 
                  {/* <div className="grid grid-cols-1 md:grid-cols-7 md:grid-10 mt-6">    */}
                  <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5">
                      <div className="order-first-second-first col-span-3 flex flex-col gap-7"> 
                          <div className="flex gap-1 items-start justify-start text-xl text-neutral-800">
                              <span className="font-bold">{tour.title}</span>
                          </div> 
    
                        <div className="border-[1px] mt-[13px] border-solid flex items-center gap-[13px] py-4 px-1 border-neutral-300 h-auto w-full rounded-lg">
                              {tour.county !== '' && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-orange-500"><FaCity size={23} /></span><span className="text-md">County: </span></div> <span className="text-neutral-500">{tour.county}</span>
                                  </div>
                              )}
                              {tour.town !== '' && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-blue-500"><GiModernCity size={23} /></span><span className="text-md">Town: </span></div> <span className="text-neutral-500">{tour.town}</span>
                                  </div>
                              )}
                          </div>

                    <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                        <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                     <span className="text-xl font-bold">Land Info!</span>
                                  </div>
                              </div>
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                    
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><MdOutlineCategory size={ 23} /></span> <span>Land category</span>
                                  </div> 
                                 <div>
                                      <span>{tour.category }</span>
                                </div>
                              </div>
                              
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                              
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><MdPhotoSizeSelectSmall size={ 23} /></span> <span>Land size</span>
                                  </div> 
                                 <div>
                                      <span>{tour.size }</span>
                                </div>
                              </div>

                             {/* <div className="py-1 w-full">
                            <hr />
                            </div>
                              
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><MdPhotoSizeSelectSmall size={ 23} /></span> <span>Covered Area</span>
                                  </div> 
                                 <div>
                                      <span>{tour.covered_area }</span>
                                </div>
                              </div> */}

                            <div className="py-1 w-full">
                            <hr />
                            </div>
                              
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><RiArticleFill size={ 23} /></span> <span>Land surveys</span>
                                  </div> 
                                 <div>
                                      <span>{tour.type }</span>
                                </div>
                              </div>
                              
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                              
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><PiSubtitles size={ 23} /></span> <span>Land title deed</span>
                                  </div> 
                                 <div>
                                      <span>{tour.titleDeed }</span>
                                </div>
                              </div>
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                             
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><FaMoneyBillTrendUp size={ 23} /></span> <span>Land deal</span>
                                  </div> 
                                 <div>
                                      <span>{tour.deal }</span>
                                </div>
                            </div>
                              
                        <div>           
                        </div>
                          </div> 
            

                     {/* <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                        <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                     <span className="text-xl font-bold">Amenities</span>
                                  </div>
                              </div>
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                    
                            { offers.length > 0 && (
                            <div>
                            {displayedOffers.map((offer, index) => (
                            <div key={index} className="flex flex-col gap-2 justify-start">
                                <span className="text-neutral-500 flex flex-row gap-3 justify-start">
                                <span className="text-neutral-700"><IoCheckmarkDoneCircleOutline size={23} /></span>
                                {offer}
                                <span className="text-neutral-400"><IoInformationCircleOutline size={23} /></span>
                                    </span>
                                <div className="pb-2 text-neutral-500">
                                <hr />
                                </div>
                            </div>
                            ))}
                            {!showAll && offers.length > 7 && (
                            <button onClick={handleShowMore} className="text-blue-500 mt-2">
                                Show More
                            </button>
                            )}
                        </div>
                        )}
                              
                        <div>           
                        </div>
                          </div>   */}
                          

                        {tour.overview !== "" && (
                              <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                                  <div className="flex w-full flex-row items-center justify-between">
                                      <div className="flex flex-row items-center gap-2">
                                          <span className="text-xl font-bold">Land overview</span>
                                      </div>
                                  </div>
                                  <div className="py-1 w-full">
                                      <hr />
                                  </div>
                        
                                  {tour.overview !== "" && (
                                    <div className="flex flex-row justify-between">
                                        <span className={`text-neutral-500 ${itExpanded ? '' : 'line-clamp-4'}`}>
                                            {tour.overview} {!itExpanded && (
                                            <button onClick={ToggleExpands} className="text-blue-600 ml-2">
                                                Read more
                                            </button>
                                            )}
                                        </span>
                                    </div>
                                )}
                                  <div>
                                  
                                  </div>
                              </div>
                          )}
                          
                  </div>

                      <div className="order-first-second order-first-second-one col-span-2" style={{ position: 'sticky', top: '10vh' }}>
                          <div className="border-neutral-300 pt-4 px-4 bg-white border-solid w-full rounded-lg h-auto border-[1px]" style={{ position: 'sticky', top: '10vh' }}>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="text-red-400"><GiTakeMyMoney size={23 } /></span><span>Price</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="text-red-400 line-through">Ksh. {tour.price}</span> <span></span>
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="text-orange-400"><GiCash size={23 } /></span><span>Offer Price</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>Ksh. {tour.offerPrice}</span> 
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                              </div>
                           <div className="flex flex-row mx-6 py-1 hover:cursor-pointer justify-center items-center border-[1px] border-solid border-green-500 rounded-lg gap-3">
                              <div className="flex flex-row gap-3 justify-center items-center">
                                 <span className="text-green-400"><FaWhatsapp size={24 } /></span>
                              </div>
                            </div>
                          <div className="px-4 py-3">
                          <hr />
                              </div>
                          <div className="flex flex-row mx-6 py-1 hover:cursor-pointer justify-center items-center border-[1px] border-solid border-blue-500 rounded-lg gap-3">
                              <div className="flex flex-row gap-3 justify-center items-center">
                                 <span className="text-blue-400"><FiPhoneCall size={24 } /></span> 
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                              </div>
                         <div className="flex flex-row mx-6 py-1 hover:cursor-pointer justify-center items-center border-[1px] bg-green-700 text-white border-solid border-neutral-400 rounded-lg gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="font-semibold text-md">Reserve Land</span> 
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div>

        <div className="flex flex-col px-4 justify-between items-center gap-1">
        
        <hr />

        <div className="flex flex-col justify-center item-center gap-3">
             {options.guests > 0 && (
        <>
         
        </>
      )}
        </div>
    </div>
             
        {showPay && <PayPalScriptProvider options={{ clientId: "ATNgosIlt76LLJdYbZjqNuhdI31gc3H_pV7mQa6h4CJ20Xz0F_O2zCDVlD_Xt91iHmftZ3cB4J2kiHS3" }}>
         {/* {showPay && <PayPalScriptProvider options={{ clientId: "AZ_ycPr5s3mAA-Xboaqc9ft8hHiaChcr42aZIauAYl3Ax0CDig8L3uc-V0P2Mgx70nQD4p7XKcTbCLBB" }}> */}
                              {/* <PaymentModal setShowPayModal={setShowPay} onPaymentComplete={handlePaymentComplete} totalPrice={totalPrice.toString()}/> */}
                              
                  <PaymentModal 
                        setShowPayModal={setShowPay} 
                        onPaymentComplete={handlePaymentComplete} 
                        totalPrice={selectedPaymentAmount.toString()} 
                    />
                          </PayPalScriptProvider>}
                    </div>
                      </div> 
                  </div>
              </div>
        </div>
    </Container>
  )
}

export default TourClient