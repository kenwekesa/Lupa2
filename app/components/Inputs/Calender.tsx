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