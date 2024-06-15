// 'use client'

// import { Range } from "react-date-range";
// import Calender from "../Inputs/Calender";
// import Button from "../container/Button";
// import React from "react";

// interface ListingReservationProps {
//     price: number;
//     dateRange: Range;
//     totalPrice: number;
//     onChangeDate: (value: Range) => void;
//     onSubmit: (payAmount: number) => void;
//     disabled?: boolean;
//     disabledDates: Date[]
//     options:{ guests: number; rooms: number };
//     setOptions : React.Dispatch<React.SetStateAction<any>>
//     setError : React.Dispatch<React.SetStateAction<any>>
//     openoptions:boolean;
//     error:string
//     setOpenOptions:React.Dispatch<React.SetStateAction<any>>
//     numberOfGuestsRef:any;
//     handleOptions: (name: 'guests' | 'rooms', operations: any) => void; // Define the handleOptions prop type
//     toggleOptions: () => void; // Define the toggleOptions prop type
// }

// const ListingReservation: React.FC<ListingReservationProps> = ({
//     price, 
//     dateRange,
//     totalPrice,
//     onChangeDate,
//     onSubmit,
//     disabled,
//     disabledDates,
//     error,
//     setError,
//     options,
//     setOptions,
//     openoptions,
//     setOpenOptions,
//     numberOfGuestsRef,
//     handleOptions,
//     toggleOptions
// }) => {

    

//     console.log("Date Range", dateRange)
//     return (
//       <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
//             <div className="flex flex-row items-center gap-1 p-4">
//                 <div className="text-2xpl font-semibold">
//                  $ {price}
//                 </div>
//                 <div className="font-light text-neutral-600">
//                     night
//                 </div>
//             </div> 
//             <hr />
//             <Calender
//                 value={dateRange}
//                 disabledDates={disabledDates}
//                 onChange={(value) => onChangeDate(value.selection)}
//             />

// <div className="flex flex-col px-4 justify-between item-center gap-1">
//         {error && <div className="text-red-400 text-sm pt-1">{error}</div>}
//         <div className="flex flex-row items-center mt-2">
//             <label htmlFor="guests" className="text-right mr-4 text-gray-700">
//                 Guests:
//             </label>
//             <input
//                 id="guests"
//                 type="text"
//                 value={`${options.guests} Guests ${options.rooms} Rooms`}
//                 className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 onClick={toggleOptions}
//             />
//         {openoptions && (
//             <div className="listing-rooms-main-id bg-white p-5 md:p-7 shadow-md" ref={numberOfGuestsRef}>
//                 <div className="flex flex-col gap-3">
//                     <div className="flex flex-col gap-3">
//                         <span className="text-lg">Rooms</span>
//                         <div className="flex gap-3 items-center">
//                             <button
//                                 className="border rounded-full py-1 px-3 focus:outline-none"
//                                 onClick={() => handleOptions("rooms", "d")}
//                                 disabled={options.rooms <= 0}
//                             >
//                                 -
//                             </button>
//                             <span className="text-xl">{options.rooms}</span>
//                             <button
//                                 className="border rounded-full py-1 px-3 focus:outline-none"
//                                 onClick={() => handleOptions("rooms", "i")}
//                             >
//                                 +
//                             </button>
//                         </div>
//                     </div>

//                     <div className="flex flex-col gap-3">
//                         <span className="text-lg">Guests</span>
//                         <div className="flex gap-3 items-center">
//                             <button
//                                 className="border rounded-full py-1 px-3 focus:outline-none"
//                                 onClick={() => handleOptions("guests", "d")}
//                                 disabled={options.guests <= 1}
//                             >
//                                 -
//                             </button>
//                             <span className="text-xl">{options.guests}</span>
//                             <button
//                                 className="border rounded-full py-1 px-3 focus:outline-none"
//                                 onClick={() => handleOptions("guests", "i")}
//                             >
//                                 +
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )}
//         </div>


//         <hr />

//         <div className="flex flex-col justify-center item-center gap-3">
          
//             <button
//                 className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
//                 onClick={()=>onSubmit(totalPrice)}
//             >
//                 Pay Full Amount ($ {totalPrice})
//             </button>
//             {totalPrice > 100 &&
//             <button
//                 className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
//                 onClick={()=>onSubmit(100)}
//             >
//                 Partial Pay($100)
//             </button>
// }
//         </div>
//     </div>
//             <hr />
         
//             <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
//                 <div>
//                     Total
//                 </div>
//                 <div>
//                     $ {totalPrice}
//                 </div>
//             </div>
//       </div>
//   )
// }

// export default ListingReservation


// 'use client'

// import { Range } from "react-date-range";
// import Calender from "../Inputs/Calender";
// import Button from "../container/Button";
// import React, { useState } from "react";

// interface ListingReservationProps {
//     price: number;
//     dateRange: Range;
//     totalPrice: number;
//     onChangeDate: (value: Range) => void;
//     onSubmit: (payAmount: number) => void;
//     disabled?: boolean;
//     disabledDates: Date[]
//     options: { guests: number; rooms: number };
//     setOptions: React.Dispatch<React.SetStateAction<any>>
//     setError: React.Dispatch<React.SetStateAction<any>>
//     openoptions: boolean;
//     error: string
//     setOpenOptions: React.Dispatch<React.SetStateAction<any>>
//     numberOfGuestsRef: any;
//     handleOptions: (name: 'guests' | 'rooms', operations: any) => void; // Define the handleOptions prop type
//     toggleOptions: () => void; // Define the toggleOptions prop type
// }

// const ListingReservation: React.FC<ListingReservationProps> = ({
//     price,
//     dateRange,
//     totalPrice,
//     onChangeDate,
//     onSubmit,
//     disabled,
//     disabledDates,
//     error,
//     setError,
//     options,
//     setOptions,
//     openoptions,
//     setOpenOptions,
//     numberOfGuestsRef,
//     handleOptions,
//     toggleOptions
// }) => {

//     const [guestsEntered, setGuestsEntered] = useState(false);
//     const [partialPay, setPartialPay] = useState(false);

//     console.log("Date Range", dateRange)
//     return (
//         <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
//             <div className="flex flex-row items-center gap-1 p-4">
//                 <div className="text-2xpl font-semibold">
//                     $ {price}
//                 </div>
//                 <div className="font-light text-neutral-600">
//                     night
//                 </div>
//             </div>
//             <hr />
//             <Calender
//                 value={dateRange}
//                 disabledDates={disabledDates}
//                 onChange={(value) => onChangeDate(value.selection)}
//             />

//             <div className="flex flex-col px-4 justify-between item-center gap-1">
//                 {error && <div className="text-red-400 text-sm pt-1">{error}</div>}
//                 {!guestsEntered && (
//                     <div className="text-gray-700 mt-2">Please enter the number of guests to book</div>
//                 )}
//                 <div className="flex flex-row items-center mt-2">
//                     <label htmlFor="guests" className="text-right mr-4 text-gray-700">
//                         Guests:
//                     </label>
//                     <input
//                         id="guests"
//                         type="text"
//                         value={`${options.guests} Guests ${options.rooms} Rooms`}
//                         className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         onClick={toggleOptions}
//                         readOnly
//                     />
//                 </div>
//                 {openoptions && (
//                     <div className="listing-rooms-main-id bg-white p-5 md:p-7 shadow-md" ref={numberOfGuestsRef}>
//                         <div className="flex flex-col gap-3">
//                             <div className="flex flex-col gap-3">
//                                 <span className="text-lg">Rooms</span>
//                                 <div className="flex gap-3 items-center">
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("rooms", "d")}
//                                         disabled={options.rooms <= 0}
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-xl">{options.rooms}</span>
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("rooms", "i")}
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="flex flex-col gap-3">
//                                 <span className="text-lg">Guests</span>
//                                 <div className="flex gap-3 items-center">
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("guests", "d")}
//                                         disabled={options.guests <= 1}
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-xl">{options.guests}</span>
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => {
//                                             handleOptions("guests", "i");
//                                             setGuestsEntered(true);
//                                         }}
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {guestsEntered && (
//                 <>
//                     <hr />

//                     <div className="flex flex-col justify-center item-center gap-3">
//                         <button
//                             className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
//                             onClick={() => onSubmit(totalPrice)}
//                         >
//                             Pay Full Amount ($ {totalPrice})
//                         </button>
//                         {totalPrice > 100 &&
//                             <button
//                                 className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
//                                 onClick={() => {
//                                     setPartialPay(true);
//                                 }}
//                             >
//                                 Partial Pay($100)
//                             </button>
//                         }
//                     </div>
//                 </>
//             )}

//             <hr />

//             <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
//                 <div>
//                     Total
//                 </div>
//                 <div>
//                     $ {totalPrice}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ListingReservation;


// 'use client'

// import { Range } from "react-date-range";
// import Calender from "../Inputs/Calender";
// import Button from "../container/Button";
// import React, { useState } from "react";

// interface ListingReservationProps {
//     price: number;
//     dateRange: Range;
//     totalPrice: number;
//     onChangeDate: (value: Range) => void;
//     onSubmit: (payAmount: number) => void;
//     disabled?: boolean;
//     disabledDates: Date[]
//     options: { guests: number; rooms: number };
//     setOptions: React.Dispatch<React.SetStateAction<any>>
//     setError: React.Dispatch<React.SetStateAction<any>>
//     openoptions: boolean;
//     error: string
//     setOpenOptions: React.Dispatch<React.SetStateAction<any>>
//     numberOfGuestsRef: any;
//     handleOptions: (name: 'guests' | 'rooms', operations: any) => void; // Define the handleOptions prop type
//     toggleOptions: () => void; // Define the toggleOptions prop type
// }

// const ListingReservation: React.FC<ListingReservationProps> = ({
//     price,
//     dateRange,
//     totalPrice,
//     onChangeDate,
//     onSubmit,
//     disabled,
//     disabledDates,
//     error,
//     setError,
//     options,
//     setOptions,
//     openoptions,
//     setOpenOptions,
//     numberOfGuestsRef,
//     handleOptions,
//     toggleOptions
// }) => {

//     const [guestsEntered, setGuestsEntered] = useState(false);
//     const [partialPay, setPartialPay] = useState(false);
//     const partialAmount = 100; // Define the partial amount

//     return (
//         <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
//             <div className="flex flex-row items-center gap-1 p-4">
//                 <div className="text-2xpl font-semibold">
//                     $ {price}
//                 </div>
//                 <div className="font-light text-neutral-600">
//                     night
//                 </div>
//             </div>
//             <hr />
//             <Calender
//                 value={dateRange}
//                 disabledDates={disabledDates}
//                 onChange={(value) => onChangeDate(value.selection)}
//             />

//             <div className="flex flex-col px-4 justify-between item-center gap-1">
//                 {error && <div className="text-red-400 text-sm pt-1">{error}</div>}
//                 {!guestsEntered && (
//                     <div className="text-gray-700 mt-2">Please enter the number of guests to book</div>
//                 )}
//                 <div className="flex flex-row items-center mt-2">
//                     <label htmlFor="guests" className="text-right mr-4 text-gray-700">
//                         Guests:
//                     </label>
//                     <input
//                         id="guests"
//                         type="text"
//                         value={`${options.guests} Guests ${options.rooms} Rooms`}
//                         className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         onClick={toggleOptions}
//                         readOnly
//                     />
//                 </div>
//                 {openoptions && (
//                     <div className="listing-rooms-main-id bg-white p-5 md:p-7 shadow-md" ref={numberOfGuestsRef}>
//                         <div className="flex flex-col gap-3">
//                             <div className="flex flex-col gap-3">
//                                 <span className="text-lg">Rooms</span>
//                                 <div className="flex gap-3 items-center">
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("rooms", "d")}
//                                         disabled={options.rooms <= 0}
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-xl">{options.rooms}</span>
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("rooms", "i")}
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="flex flex-col gap-3">
//                                 <span className="text-lg">Guests</span>
//                                 <div className="flex gap-3 items-center">
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("guests", "d")}
//                                         disabled={options.guests <= 1}
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-xl">{options.guests}</span>
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => {
//                                             handleOptions("guests", "i");
//                                             setGuestsEntered(true);
//                                         }}
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {guestsEntered && (
//                 <>
//                     <hr />

//                     <div className="flex flex-col justify-center item-center gap-3">
//                         <button
//                             className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
//                             onClick={() => onSubmit(totalPrice)}
//                         >
//                             Pay Full Amount ($ {totalPrice})
//                         </button>
//                         {totalPrice > partialAmount && // Render the partial payment button conditionally
//                             <button
//                                 className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
//                                 onClick={() => {
//                                     onSubmit(partialAmount); // Call onSubmit with partialAmount
//                                     setPartialPay(true);
//                                 }}
//                             >
//                                 Partial Pay($ {partialAmount})
//                             </button>
//                         }
//                     </div>
//                 </>
//             )}

//             <hr />

//             <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
//                 <div>
//                     Total
//                 </div>
//                 <div>
//                     $ {totalPrice}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ListingReservation;

'use client'

import { Range } from "react-date-range";
import Calender from "../Inputs/Calender";
import Button from "../container/Button";
import React, { useState } from "react";

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: (payAmount: number) => void;
    disabled?: boolean;
    disabledDates: Date[]
    options: { guests: number; rooms: number };
    setOptions: React.Dispatch<React.SetStateAction<any>>
    setError: React.Dispatch<React.SetStateAction<any>>
    openoptions: boolean;
    error: string
    setOpenOptions: React.Dispatch<React.SetStateAction<any>>
    numberOfGuestsRef: any;
    handleOptions: (name: 'guests' | 'rooms', operations: any) => void; // Define the handleOptions prop type
    toggleOptions: () => void; // Define the toggleOptions prop type
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
    error,
    setError,
    options,
    setOptions,
    openoptions,
    setOpenOptions,
    numberOfGuestsRef,
    handleOptions,
    toggleOptions
}) => {

    const [guestsEntered, setGuestsEntered] = useState(false);
    const [partialPay, setPartialPay] = useState(false);
    const partialAmount = 100; // Define the partial amount

    const handlePartialPay = () => {
        setPartialPay(true);
        onSubmit(partialAmount); // Call onSubmit with partialAmount
    }

    const handleFullPay = () => {
        setPartialPay(false);
        onSubmit(totalPrice); // Call onSubmit with totalPrice
    }

    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xpl font-semibold">
                    $ {price}
                </div>
                <div className="font-light text-neutral-600">
                    night
                </div>
            </div>
            <hr />
            <Calender
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />

            <div className="flex flex-col px-4 justify-between item-center gap-1">
                {error && <div className="text-red-400 text-sm pt-1">{error}</div>}
                {!guestsEntered && (
                    <div className="text-gray-700 mt-2">Please enter the number of guests to book</div>
                )}
                <div className="flex flex-row items-center mt-2">
                    <label htmlFor="guests" className="text-right mr-4 text-gray-700">
                        Guests:
                    </label>
                    <input
                        id="guests"
                        type="text"
                        value={`${options.guests} Guests ${options.rooms} Rooms`}
                        className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onClick={toggleOptions}
                        readOnly
                    />
                </div>
                {openoptions && (
                    <div className="listing-rooms-main-id bg-white p-5 md:p-7 shadow-md" ref={numberOfGuestsRef}>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3">
                                <span className="text-lg">Rooms</span>
                                <div className="flex gap-3 items-center">
                                    <button
                                        className="border rounded-full py-1 px-3 focus:outline-none"
                                        onClick={() => handleOptions("rooms", "d")}
                                        disabled={options.rooms <= 0}
                                    >
                                        -
                                    </button>
                                    <span className="text-xl">{options.rooms}</span>
                                    <button
                                        className="border rounded-full py-1 px-3 focus:outline-none"
                                        onClick={() => handleOptions("rooms", "i")}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <span className="text-lg">Guests</span>
                                <div className="flex gap-3 items-center">
                                    <button
                                        className="border rounded-full py-1 px-3 focus:outline-none"
                                        onClick={() => handleOptions("guests", "d")}
                                        disabled={options.guests <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="text-xl">{options.guests}</span>
                                    <button
                                        className="border rounded-full py-1 px-3 focus:outline-none"
                                        onClick={() => {
                                            handleOptions("guests", "i");
                                            setGuestsEntered(true);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {guestsEntered && (
                <>
                    <div className="py-2">
                      <hr />
                    </div>

                    <div className="flex flex-col justify-center item-center gap-3">
                        <button
                            className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
                            onClick={handleFullPay} // Call handleFullPay on full payment button click
                        >
                            Pay Full Amount ($ {totalPrice})
                        </button>
                        {totalPrice > partialAmount && !partialPay && (
                            <button
                                className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
                                onClick={handlePartialPay} // Call handlePartialPay on partial payment button click
                            >
                                Partial Pay($ {partialAmount})
                            </button>
                        )}
                    </div>
                </>
            )}

            <hr />

            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>
                    Total
                </div>
                <div>
                    $ {totalPrice}
                </div>
            </div>
        </div>
    )
}

export default ListingReservation;

