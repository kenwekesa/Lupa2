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
import { GiBed } from "react-icons/gi";
import { PiStarThin } from "react-icons/pi";
import { FaBedPulse } from "react-icons/fa6";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import Image from 'next/image';
import { GiStarGate } from "react-icons/gi";


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
        const combinedFullyBoookedDates = [...fullyBookedDates, ...listing.datesUnavailable]
        return combinedFullyBoookedDates;
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

// setTotalPrice((guestsDets.guests * listing.price)*numberOfDays)
    setTotalPrice((guestsDets.guests * (listing.price || 0)) * numberOfDays);
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


    const [showAll, setShowAll] = useState(false);
    const [showAllFun, setShowAllFun] = useState(false);
    const [showAllMeal, setShowAllMeal] = useState(false);
  
    const offers = listing.offers || [];
    const displayedOffers = showAll ? offers : offers.slice(0, 7);

    const handleShowMore = () => {
        setShowAll(true);
    };

    const funs = listing.funActivities || [];
    const displayedFuns = showAllFun ? funs : funs.slice(0, 7);

    const handleShowMoreFun = () => {
        setShowAllFun(true);
    };

    const meals = listing.meals || [];
    const displayedMeals = showAllMeal ? meals : meals.slice(0, 7);

    const handleShowMoreMeal = () => {
        setShowAllMeal(true);
    };
    
    // const OverviewComponent = ({ listing: any }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [itExpanded, setItExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const ToggleExpands = () => {
        setItExpanded(!itExpanded);
    };
    
    
    function handleUnavailableDates(): void { 
        
        console.log("date range from listingClient",dateRange)
        
        axios.put(`/api/stays/${listing?.id}`, {
            datesUnavailableFrom: dateRange.startDate,
            datesUnavailableTo: dateRange.endDate
        })
            .then(async () => {
                toast.success('Date(s) marked unavailable!');

               
                //router.push('/trips');
            }).catch(() => {
                toast.error('Something went wrong')
            }).finally(() => {
                
            })
    
      

  
       }

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
        const data2 =  {
            "Body": {
                "stkCallback": {
                    "MerchantRequestID": "12345-67890-12345",
                    "CheckoutRequestID": "abcdefghijklmnopqrstuvwxyz",
                    "ResultCode": 0,
                    "ResultDesc": "The service was accepted successfully",
                    "CallbackMetadata": {
                        "Item": [
                            {
                                "Name": "Amount",
                                "Value": 100
                            },
                            {
                                "Name": "MpesaReceiptNumber",
                                "Value": "ABCDEFGHIJ"
                            },
                            {
                                "Name": "Balance",
                                "Value": 0
                            },
                            {
                                "Name": "TransactionDate",
                                "Value": "2023-04-26 12:30:00"
                            },
                            {
                                "Name": "PhoneNumber",
                                "Value": "254712345678"
                            }
                        ]
                    }
                }
            }
        }
       {
        setShowPay(false)
        console.log("Payment Data",dataa)
        axios.post(`/api/reservations`, {
            totalPrice,  //for totalPrice
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
            paymentDetails:data2,
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
                      county={listing.county}
                      id={listing.id}
                      currentUser={currentUser}
                  /> 
                  <div className="order-first-main-main grid grid-cols-1 gap-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 2xl:grid-cols-7 md:grid-10 mt-6">
                      <div className="order-first-s-main w-full col-span-4">
                        <div className="flex justify-between items-center">
                              <div><span className="font-bold text-lg pb-2">{listing.title}, in</span> <span className="font-normal text-md text-neutral-500">{listing.county} </span>: <span className="font-normal text-md text-green-500">{listing.town }</span></div>
                        </div>
                          <div className="border-[1px] mt-[13px] border-solid flex items-center gap-[13px] py-4 px-1 border-neutral-300 h-auto w-full rounded-lg">
                              {listing.bedroomCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-orange-500"><GiBed size={23} /></span><span className="text-md">Bedrooms: </span></div> <span className="text-neutral-500">{listing.bedroomCount}</span>
                                  </div>
                              )}
                              {listing.bathRoomCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-blue-500"><MdOutlineBathroom size={23} /></span><span className="text-md">Bathrooms: </span></div> <span className="text-neutral-500">{listing.bathRoomCount}</span>
                                  </div>
                              )}
                              {listing.guestCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-lime-600"><FaPeopleGroup size={23} /></span><span className="text-md">Guests: </span></div><span className="text-neutral-500">{listing.guestCount}</span>
                                  </div>
                              )}
                              {listing.roomCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-neutral-600"><MdOutlineMeetingRoom size={23} /></span><span className="text-md">Rooms: </span></div><span className="text-neutral-500">{listing.roomCount}</span>
                                  </div>
                              )}                        
                              {listing.ratings !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-yellow-600"><PiStarThin size={23} /></span><span className="text-md">Rating: </span></div><span className="text-neutral-500">{listing.ratings}</span>
                                  </div>
                              )}
                          </div>

                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-800">What this place offers</p>

                         <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                         
                              {/* {listing.offers !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <span className="text-neutral-500"> <span className="text-green-500"><IoCheckmarkDoneCircleOutline size={23} /> </span>{listing.offers} <span className="text-blue-400"> <IoInformationCircleOutline size={23} /></span></span>
                                  </div>
                              )} */}


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
 
                          </div>

                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-800">Meals offered</p>

                         <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        { meals.length > 0 && (
                            <div>
                            {displayedMeals.map((offer, index) => (
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
                            <button onClick={handleShowMoreMeal} className="text-blue-500 mt-2">
                                Show More
                            </button>
                            )}
                        </div>
                        )}
 
                          </div>

                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-800">Fun activites</p>

                         <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        { funs.length > 0 && (
                            <div>
                            {displayedFuns.map((offer, index) => (
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
                            <button onClick={handleShowMoreFun} className="text-blue-500 mt-2">
                                Show More
                            </button>
                            )}
                        </div>
                        )}
 
                        </div>
                          
                         <p className="pt-6 pb-5 text-lg font-bold text-neutral-700">Available beds!</p>
                        
                        {listing.beds.length > 0 && (
                            <div className="border-[1px] gap-4 grid grid-cols-4 border-solid py-6 px-4 border-neutral-300 h-auto w-full rounded-lg">
                                {listing.beds.map((bed: any, index: any) => (
                                bed !== "" && (
                                    <div key={index} className="border-[1px] where-you-sleep border-solid rounded-lg border-neutral-300 p-4 col-span-1">
                                    <div className="flex flex-col p-2 items-start gap-2">
                                        <span className="text-neutral-500"><LuBedDouble size={23} /></span>
                                        <span className="text-md">{listing.beds[index]}</span>
                                    </div>
                                    </div>
                                )
                                ))}
                            </div>
                          )}
                          
                        

                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-700">Available bedrooms!</p>
                        
                        {listing.bedroom.length > 0 && (
                            <div className="border-[1px] gap-4 grid grid-cols-4 border-solid py-6 px-4 border-neutral-300 h-auto w-full rounded-lg">
                                {listing.bedroom.map((bed: any, index: any) => (
                                bed !== "" && (
                                    <div key={index} className="border-[1px] where-you-sleep border-solid rounded-lg border-neutral-300 p-4 col-span-1">
                                    <div className="flex flex-col p-2 items-start gap-2">
                                        <span className="text-neutral-500"><FaBedPulse size={23} /></span>
                                        <span className="text-md">{listing.bedroom[index]}</span>
                                    </div>
                                    </div>
                                )
                                ))}
                            </div>
                        )}

                      <p className="pt-6 pb-5 text-lg font-bold text-neutral-700">Where you will sleep!</p>
                        
                        {listing.bedPhotos.length > 0 && (
                            <div className="border-[1px] gap-4 grid grid-cols-4 border-solid py-3 px-2 border-neutral-300 h-auto w-full rounded-lg">
                                {listing.bedPhotos.map((bed: any, index: any) => (
                                bed !== "" && (
                                    <div key={index} className="border-[1px] where-you-sleep border-solid rounded-lg border-neutral-300 p-[1px] col-span-2">
                                    <div className="flex flex-col p-2 items-start gap-2">
                                        {index < listing.bedPhotos.length && (
                                        <Image 
                                            src={listing.bedPhotos[index]} 
                                            alt={`Bed ${index + 1}`} 
                                            width={200} // Adjust width as needed
                                            height={150} // Adjust height as needed
                                            className="rounded-lg h-[auto] w-[100%]"
                                        />
                                        )}
                                    </div>
                                    </div>
                                )
                                ))}
                            </div>
                        )}
        
                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-700">Over View</p>

                         <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        
                              {listing.overView !== "" && (
                                    <div className="flex flex-row justify-between">
                                        <span className={`text-neutral-500 ${isExpanded ? '' : 'line-clamp-4'}`}>
                                            {listing.overView} {!isExpanded && (
                                            <button onClick={toggleExpand} className="text-blue-600 ml-2">
                                                Read more
                                            </button>
                                            )}
                                        </span>
                                    </div>
                              )}
                            
                          </div>
                          
                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-700">Video Overview</p>

                        <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">

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

                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-700">Host Information!</p>

                         <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        
                              {listing.hostPhoto !== "" && (
                                  <div className="flex flex-row items-center justify-start gap-3">
                                      <div>
                                          <Image 
                                            src={listing.hostPhoto} 
                                            alt={`Host ${listing.hostName}`} 
                                            width={200} // Adjust width as needed
                                            height={250} // Adjust height as needed
                                            className="rounded-full h-[100px] w-[100px]"
                                          />
                                      </div>
                                      <div className="flex flex-col text-start items-start gap-2">
                                          <span className="text-neutral-700 text-lg font-bold">Hosted by {listing.hostName}</span>
                                          <span className="text-md text-neutral-500">Joined in {listing.joinDate}</span>
                                      </div>
                                  </div>
                              )}

                          <div className="w-full py-4">
                           <hr />
                          </div>
                              
                              <div className="mt-[13px] flex items-center gap-[13px] py-2 px-1 h-auto w-full">
                                  
                              {listing.verified !== '' && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-orange-500"><GiStarGate size={23} /></span><span className="text-md">Verfied: </span></div> <span className="text-neutral-500">{listing.verified}</span>
                                  </div>
                              )}
                              </div>
                              
                            <div className="w-full py-4">
                           <hr />
                            </div>

                              {listing.hostExperience !== "" && (
                                    <div className="flex flex-row justify-between">
                                        <span className={`text-neutral-500 ${itExpanded ? '' : 'line-clamp-4'}`}>
                                            {listing.hostExperience} {!itExpanded && (
                                            <button onClick={ToggleExpands} className="text-blue-600 ml-2">
                                                Read more
                                            </button>
                                            )}
                                        </span>
                                    </div>
                              )}

                          <div className="w-full py-4">
                           <hr />
                          </div>

                              {listing.hostType !== "" && (
                                  <div className="flex flex-row pb-3 justify-start gap-3">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-lime-600"><BsFileEarmarkPerson size={23} /></span><span className="text-md">Host Type</span></div><span className="text-neutral-500">{listing.hostType}</span>
                                  </div>
                              )}
                              
                        </div>

                      </div>
                      <div className="order-first h-[105vh] w-full mb-10 md:order-last col-span-3" style={{position: 'sticky', top: '10vh'}}>
                          <ListingReservation
                              price={listing.price}
                              totalPrice={totalPrice}
                              onChangeDate={(value) => setDateRange(value)}
                              dateRange={dateRange}
                              onSubmit={()=>makeReservation} //(payAmount:number)=>onCreateReservation(payAmount)}
                              disabled={isLoading}
                              disabledDates={disabledDates} 
                              options={options}
                              currentUser={currentUser}
                              setOptions = {setOptions}
                              openoptions ={openoptions}
                              setOpenOptions = {setOpenoptions}
                              numberOfGuestsRef = {numberOfGuestsRef}
                              error = {error}
                              setError = {setError}
                              toggleOptions = {toggleOptions}
                              handleUnavailableDates={handleUnavailableDates}
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