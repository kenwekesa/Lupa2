import { FaCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { IoBookmarks } from "react-icons/io5";
import { FaRegAddressBook } from "react-icons/fa6";
import { ImAddressBook } from "react-icons/im";
import { PiAddressBookFill } from "react-icons/pi";
import { LiaAddressBookSolid } from "react-icons/lia";
import { PiBookmarksSimpleBold } from "react-icons/pi";
import { PiBookOpenTextBold } from "react-icons/pi";
import { PiBookOpenTextFill } from "react-icons/pi";
import Link from "next/link";
import "./sidebar.css";

// Define the interface for the Home component props


// Home component is defined as an asynchronous function
const ProfilePage = async () => {
  // Fetch listings and current user asynchronousl
  return (
      <div className="border-[2px] sidebar-image-main rounded-xl px-5">
          <div className="w-full flex justify-center text-center items-center py-5">
          <FaCircleUser className="text-neutral-500" size={ 50 } /> 
          </div>
          <div className="py-3">
          <hr />
          </div>
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
         <Link href="/client/profile"><FaRegUser className="text-neutral-500" size={26} /> </Link>
          <Link href="/client/profile" className="sidebar-image">My personal details</Link>
          </div>
          <div className="py-3">
          <hr />
          </div>
           <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/client/reservations"><LiaSwatchbookSolid className="text-neutral-500" size={26} /></Link>
          <Link href="/client/reservations" className="sidebar-image">my reservations</Link>
          </div>
          <div className="py-3">
          <hr />
          </div>
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/client/property-purchases"><IoBookmarks className="text-neutral-500" size={26} /></Link>
          <Link href="/client/property-purchases" className="sidebar-image">My property purchases</Link>
          </div>
          <div className="py-3">
          <hr />
          </div>
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/client/property-rentals"><FaRegAddressBook className="text-neutral-500" size={26} /></Link>
          <Link href="/client/property-rentals" className="sidebar-image">My property rentals</Link>
          </div>
          <div className="py-3">
          <hr />
          </div>
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/client/land-purchases"><FaRegAddressBook className="text-neutral-500" size={26} /></Link>
          <Link href="/client/land-purchases" className="sidebar-image">My land purchases</Link>
          </div>
    </div>
  )
}

export default ProfilePage