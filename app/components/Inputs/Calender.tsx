'use client'

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalenderProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[]
}
  
const Calender: React.FC<CalenderProps> = ({
    value,
    onChange, 
    disabledDates
}) => {
    console.log("Value prop in calender:", value);

  return (
      <DateRange
          rangeColors={["#07608c"]} 
          ranges={[value]}
          date={new Date()}
          onChange={onChange}
          direction="vertical"
          showDateDisplay={false}
          minDate={new Date()}
          disabledDates={disabledDates}
      />
  )
}

export default Calender

// Calendar.tsx

// 'use client'
// import React from 'react';
// import { Calendar } from "react-date-range";
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';

// interface CalendarProps {
//     selectedDates: Date[];
//     onChange: (dates: Date[]) => void;
//     disabledDates?: Date[];
// }

// const CalendarComponent: React.FC<CalendarProps> = ({
//     selectedDates,
//     onChange,
//     disabledDates
// }) => {
//     const handleSelect = (date: Date) => {
//         const updatedDates = [...selectedDates];
//         const index = updatedDates.findIndex(selectedDate => selectedDate.toDateString() === date.toDateString());

//         if (index >= 0) {
//             updatedDates.splice(index, 1);
//         } else {
//             updatedDates.push(date);
//         }

//         onChange(updatedDates);
//     };

//     const isDisabled = (date: Date) => {
//         return disabledDates?.some(disabledDate => disabledDate.toDateString() === date.toDateString());
//     };

//     const isSelected = (date: Date) => {
//         return selectedDates.some(selectedDate => selectedDate.toDateString() === date.toDateString());
//     };

//     return (
//         <Calendar
//             date={new Date()}
//             onChange={(date) => handleSelect(date as Date)}
//             color="#07608c"
//             minDate={new Date()}
//         />
//     );
// };

// export default CalendarComponent;





