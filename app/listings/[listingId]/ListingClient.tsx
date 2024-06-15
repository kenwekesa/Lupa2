'use client'

import PaymentModal from "@/app/components/Modals/PaymentModal";
import Container from "@/app/components/container/Container";
import ListingHead from "@/app/components/listing/ListingHead";
import ListingInfo from "@/app/components/listing/ListingInfo";
import ListingReservation from "@/app/components/listing/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import usePaymentModal from "@/app/hooks/usePaymentModal";
import { SafeUser, safeListing, safeReservation } from "@/app/types";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval, startOfDay } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import { FaPersonShelter } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineUpdate } from "react-icons/md";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import { LuBedDouble } from "react-icons/lu";
import { BsPersonCircle } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { MdOutlineBathroom } from "react-icons/md";


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: safeReservation[];
    listing: safeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {

    const loginModal = useLoginModal();
    const paymentModal = usePaymentModal();
    const router = useRouter();
    const [dispabledTarehe, setDisabledTareh]  =useState(null)

    const [options, setOptions] = useState(
        {
        guests: 0,
        rooms: 0}
    )

    const [openoptions, setOpenoptions] = useState(false)
    const numberOfGuestsRef = useRef<HTMLInputElement>(null); 

    const [numberOfDays, setNumberOfDays] = useState(0)

    const [error, setError] = useState('');

    // const disabledDates = useMemo(() => {
    //     let dates: Date[] = [];

    //     reservations.forEach((reservation) => {
    //         const range = eachDayOfInterval({
    //             start: new Date(reservation.startDate),
    //             end: new Date(reservation.endDate)
    //         });

    //         dates = [...dates, ...range]

    //         console.log("dates------",dates)
    //         setDisabledTareh(dates)
    //     })
    //     console.log("reservations count--",reservations.length)

    //     return dates;
    // }, [reservations])

    // Inside your useMemo callback
    




    //-----------------------------------------------------------------------------------------------
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
    
        // Filter reservations for the selected hotel
        const reservationsForSelectedHotel = reservations.filter(reservation => reservation.listingId === listing.id);
    
        reservationsForSelectedHotel.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            }); // Include the end date in the range
    
            dates = [...dates, ...range];
        });
    
        // Filter out dates that are fully booked
        const fullyBookedDates = dates.filter(date => {
            const reservationsOnDate = reservationsForSelectedHotel.filter(reservation =>
                date >= new Date(reservation.startDate) && date <= new Date(reservation.endDate)
            );
            const totalGuestsOnDate = reservationsOnDate.reduce((total, reservation) => total + reservation.numberOfGuests, 0);
    
            return totalGuestsOnDate >= listing.guestCount;
        });
    
        return fullyBookedDates;
    }, [reservations, listing]);
    
    
    //-----------------------------------------------------------------------------------------------

// Function to find the first non-disabled date from today

const toggleOptions = () => {
    setOpenoptions(!openoptions)
};


const handleOptions = (name: 'guests' | 'rooms', operations: any) => {
      
    const guestsDets = {
        ...options,
        [name]: operations === 'i' ? options[name] + 1 : options[name] - 1,
    }

    setTotalPrice((guestsDets.guests * listing.price)*numberOfDays)
   // setTotalPrice(numberOfDays * listing.price*options.guests + options.rooms*(listing.save ||0));


setOptions((prev) => {
    return {
        ...prev,
        [name]: operations === 'i' ? options[name] + 1 : options[name] - 1,
    };
});

};


const findAvailableDate = () => {
    const today = new Date();
    let availableDate = today;
    while (disabledDates.some((disabledDate) => disabledDate.getTime() === availableDate.getTime())) {
      availableDate.setDate(availableDate.getDate() + 1); // Move to next day
    }
    return availableDate;
  };

  // Set initial date range on component mount
  useEffect(() => {
    const availableDate = findAvailableDate();
    setDateRange({
      startDate: availableDate,
      endDate: availableDate,
      key: 'selection',
    });
  }, [disabledDates]); // Update only when disabledDates change


    const [isLoading, setIsLoading] = useState(false);
    const [showPay, setShowPay] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dataa, setDataa] = useState('')
    const [paymentMade, setPaymentMade] = useState(false)
    const [amountPayable, setAmountPeyable] = useState(0)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    
    
    const handlePaymentComplete = async(data: any) => {
        // Handle the data passed from PaymentModal
        console.log('Payment completed with data:', data);
        setDataa(data)

        const merchantId = data?.Body?.stkCallback.MerchantRequestID
        if(merchantId)
            {
                const response = await axios.delete("/api/mpesa/callback", {
                    params: { transactionRef: JSON.stringify({merchantRequestId: merchantId})  }, 
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
            }
        makeReservation(data)

        
        // You can also update the state or trigger other actions
        // ...
      };
      const makeReservation = (data:any) =>
      {
        
       {
        setShowPay(false)
        console.log("Payment Data",dataa)
        axios.post(`/api/reservations`, {
            totalPrice,  //for totalPrice
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
            paymentDetails:data,
            guestDetails: options
        })
            .then(async () => {
                toast.success('Listing reserved!');

                setDateRange(initialDateRange);
                // redirect to /trips
                try {
                    const response = await axios.post('/api/mailing/', 
                  
                      {sender:'Info@devancatours.com',
                             recipient:'wanjooo.ken@gmail.com',
                             subject:"Devance Reservations",
                             user_name:currentUser?.name,
                             templateName: 'mail_template',
                             mail_body:`This is a sample test mail from Devance Application and these are the reservatio`

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
      }
    const onCreateReservation = useCallback((payAmount: number) => {

        setAmountPeyable(payAmount)
        if (!currentUser) {
            return loginModal.onOpen()
        }

       console.log("Reserve loading...", paymentModal.isOpen)
        try {
            
            setShowPay(true)
        } catch (error) {
            console.log(error)
        }
       setIsLoading(true);

  }, [
        totalPrice,
        dateRange,
        listing?.id,
        router,
        currentUser,
        loginModal,
        paymentModal
    ]);

    // Calucating the price. 
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            ) +1;

            setNumberOfDays(dayCount)
            console.log("Day range=====>", dateRange)
            console.log("Day count:====>", dayCount)

            if (dayCount && listing.price) {
                setTotalPrice((listing.price*options.guests)*dayCount);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price])

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === listing.category);
    }, [listing.category])
  return (
    <Container>
          <div className="max-w-sreen-lg mx-auto ">
              <div className="flex flex-col gap-6">
                  <ListingHead
                      title={listing.title}
                      imageSrc={listing.imageSrc}
                      locationValue={listing.locationValue}
                      id={listing.id}
                      currentUser={currentUser}
                  /> 
                  <div className="order-first-main-main grid grid-cols-1 gap-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 2xl:grid-cols-7 md:grid-10 mt-6">
                      <div className="order-first-s-main w-full col-span-4">
                          
                          <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        
                              {listing.city !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-orange-500"><CiLocationArrow1 size={23} /></span><span className="text-md">Location:</span></div> <span className="text-neutral-500">{listing.city}</span>
                                  </div>
                              )}

                          <div className="w-full py-4">
                           <hr />
                          </div>
                              {listing.bathRoomCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-blue-500"><MdOutlineBathroom size={23} /></span><span className="text-md">Bathrooms:</span></div> <span className="text-neutral-500">{listing.bathRoomCount}</span>
                                  </div>
                              )}
                          <div className="w-full py-4">
                           <hr />
                          </div>

                              {listing.guestCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-lime-600"><FaPeopleGroup size={23} /></span><span className="text-md">Guests:</span></div><span className="text-neutral-500">{listing.guestCount}</span>
                                  </div>
                              )}
                          <div className="w-full py-4">
                           <hr />
                         </div>

                              {listing.roomCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-neutral-600"><MdOutlineMeetingRoom size={23} /></span><span className="text-md">Rooms:</span></div><span className="text-neutral-500">{listing.roomCount}</span>
                                  </div>
                              )}
                          <div className="w-full py-4">
                           <hr />
                        </div>
                              
                              {listing.category !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-yellow-600"><MdOutlineTipsAndUpdates size={23} /></span><span className="text-md">Category:</span></div><span className="text-neutral-500">{listing.category}</span>
                                  </div>
                              )}
                          </div>
                        
                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-500">Over View</p>

                         <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        
                              {listing.description !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <span className="text-neutral-500">{listing.description}</span>
                                  </div>
                              )}
 
                        </div>

                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-500">Where you will sleep!</p>
                        

                        <div className="border-[1px] gap-4 grid grid-cols-4 border-solid py-6 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        
                          {listing.oneBedroom !== "" && (
                          <div className="border-[1px] where-you-sleep border-solid rounded-lg border-neutral-300 p-4 col-span-1">
                            <div className="flex flex-col p-2 items-start gap-2"> <span className="text-neutral-500"><LuBedDouble size={ 23 } /></span><span className="text-md">One Bedroom</span></div> <span className="text-neutral-500">{listing.oneBedroom} qeen bed</span>
                          </div>
                          )}
                              
                          {listing.twoBedroom !== "" && (
                          <div className="border-[1px] where-you-sleep border-solid rounded-lg border-neutral-300 p-4 col-span-1">
                            <div className="flex flex-col p-2 items-start gap-2"> <span className="text-neutral-500"><LuBedDouble size={23} /></span><span className="text-md">Two Bedroom</span></div> <span className="text-neutral-500">{listing.twoBedroom} qeen bed</span>
                                  </div>
                          )}
                            
                          {listing.threebedRoom !== "" && (
                          <div className="border-[1px] where-you-sleep border-solid rounded-lg border-neutral-300 p-4 col-span-1">
                            <div className="flex flex-col p-2 items-start gap-2"> <span className="text-neutral-600"><LuBedDouble size={23} /></span><span className="text-md">Three Bedroom</span></div><span className="text-neutral-500">{listing.threebedRoom} queen bed</span>
                          </div>
                          )}
                              
                           {listing.commonPlace !== "" && (
                            <div className="border-[1px] where-you-sleep border-solid rounded-lg border-neutral-300 p-4 col-span-1">
                                <div className="flex flex-col p-2 items-start gap-2"> 
                                <span className="text-neutral-600"><LuBedDouble size={23} /></span>
                                <span className="text-md">Common spaces</span>
                                </div>
                                <span className="text-neutral-500">{listing.commonPlace} sofa bed</span>
                            </div>
                            )}

                          </div>

                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-500">Host Info!</p>

                         <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        
                              {listing.hostName !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-orange-500"><BsPersonCircle size={23} /></span><span className="text-md">Host name:</span></div> <span className="text-neutral-500">{listing.hostName}</span>
                                  </div>
                              )}

                          <div className="w-full py-4">
                           <hr />
                          </div>

                              {listing.cohostName !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-blue-500"><GoPerson size={23} /></span><span className="text-md">Co-Host Name:</span></div> <span className="text-neutral-500">{listing.cohostName}</span>
                                  </div>
                              )}

                          <div className="w-full py-4">
                           <hr />
                          </div>

                              {listing.hostContact !== "" && (
                                  <div className="flex flex-row pb-3 justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-lime-600"><BsFileEarmarkPerson size={23} /></span><span className="text-md">Host Contact</span></div><span className="text-neutral-500">{listing.hostContact}</span>
                                  </div>
                              )}

                       {listing.hotelLink && listing.hotelLink.length > 0 && (
                        <div className="flex h-[66vh] flex-col gap-5 items-start py-4  w-full">
                        <iframe
                            src={listing?.hotelLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                            ></iframe>
                        </div>     
                        )}
                              
                        </div>

                      </div>
                      <div className="order-first h-[85vh] w-full mb-10 md:order-last col-span-3" style={{position: 'sticky', top: '10vh'}}>
                          <ListingReservation
                              price={listing.price}
                              totalPrice={totalPrice}
                              onChangeDate={(value) => setDateRange(value)}
                              dateRange={dateRange}
                              onSubmit={(payAmount:number)=>onCreateReservation(payAmount)}
                              disabled={isLoading}
                              disabledDates={disabledDates}
                              options ={options}
                              setOptions = {setOptions}
                              openoptions ={openoptions}
                              setOpenOptions = {setOpenoptions}
                              numberOfGuestsRef = {numberOfGuestsRef}
                              error = {error}
                              setError = {setError}
                              toggleOptions = {toggleOptions}
                              handleOptions={handleOptions}
                          />
                      </div>
                  </div>
              </div> 
              {showPay && <PayPalScriptProvider options={{ 
               // clientId: "AZ_ycPr5s3mAA-Xboaqc9ft8hHiaChcr42aZIauAYl3Ax0CDig8L3uc-V0P2Mgx70nQD4p7XKcTbCLBB" }}>
                  clientId: "ATNgosIlt76LLJdYbZjqNuhdI31gc3H_pV7mQa6h4CJ20Xz0F_O2zCDVlD_Xt91iHmftZ3cB4J2kiHS3"
              }}>
                  
                  <PaymentModal setShowPayModal={setShowPay} 
                  onPaymentComplete={handlePaymentComplete} 
                  totalPrice={totalPrice.toString()}
                  currentUser = {currentUser}
                  />
             </PayPalScriptProvider>}



          </div>  
    </Container>
  )
}

export default ListingClient