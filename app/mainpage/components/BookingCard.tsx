import { IconType } from 'react-icons/lib';
import { FaAddressBook } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";


interface MenuItemProps {
  label?: string;
  icon?: IconType; // New property for the React icon component
}

const BookingCard: React.FC<MenuItemProps> = ({
  label,
  icon: IconComponent, // Rename imageSrc to icon and use the imported icon component
}) => {
  return (
    <div className='booking-card booking-card-mj grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 items-center text-center w-full h-[38vh] md:h-[45vh] lg:h-[38vh] xl:h-[38vh] 2xl:h-[38vh] max-2xl:h-[38vh] rounded-xl justify-between'>
    <div
      className="text-center flex p-6 flex-col gap-3 items-center aspect-square w-full"
      >
     <div className='bg-white p-3 rounded-full text-neutral-500'>
          <FaAddressBook size={25} />
    </div>
     <div className='text-neutral-800 booking-card-text text-sm font-light text-justify'>
      Embark on a journey of discovery with DevancaTours! Fuel your wanderlust as you peruse our thrilling range of adventure cruises and captivating road trips, transforming your dream voyage into an exhilarating reality. Your adventure awaits  let&lsquo;s make it unforgettable together!
     </div>
      </div>
         
      <div
      className="booking-card-one text-center p-6 flex flex-col gap-3 items-center aspect-square w-full"
      >
     <div className='bg-white p-3 rounded-full text-neutral-500'>
        <FaOpencart size={25} />
      </div>
     <div className='text-neutral-800 booking-card-text text-sm font-light text-justify'>
      Elevate your escape with DevancaTours&lsquo; handpicked selection of opulent five-star hotels in iconic destinations worldwide. Immerse yourself in luxury and comfort, ensuring your getaway is not just a trip but a lavish experience. Trust our experts to curate the perfect accommodation, tailored to your desires.
     </div>
      </div>

      <div
      className="booking-card-two text-center p-6 flex booking-card-text-last flex-col gap-3 items-center aspect-square w-full relative"
      >
     <div className='bg-white p-3 rounded-full text-neutral-500'>
        <MdOutlineSupportAgent size={25} />
    </div>
     <div className='text-neutral-800 text-sm booking-card-text font-light text-justify'>
      Effortlessly secure your dream holiday with DevancaTours! Seamlessly book online or over the phone, entrusting us with every detail for a stress-free experience. Anticipate an unforgettable journey, where your every need is met and your travel aspirations are brought to life.
     </div>
      </div>
     </div> 
  );
};

export default BookingCard;