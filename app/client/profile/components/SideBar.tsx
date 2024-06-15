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
          <div className="w-full text-center items-center py-5">
          <FaCircleUser className="text-neutral-500" size={ 29 } /> 
          </div>
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
         <Link href="/client/profile"><FaRegUser className="text-neutral-500" size={26} /> </Link>
          <Link href="/client/profile" className="sidebar-image">Personal Info</Link>
          </div>
          <hr />
           <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/client/mybookedtours"><LiaSwatchbookSolid className="text-neutral-500" size={26} /></Link>
          <Link href="/client/mybookedtours" className="sidebar-image">My Booked Tours</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/client/mybookedhotels"><IoBookmarks className="text-neutral-500" size={26} /></Link>
          <Link href="/client/mybookedhotels" className="sidebar-image">My Booked Hotels</Link>
           </div>
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/client/mybookedhouses"><FaRegAddressBook className="text-neutral-500" size={26} /></Link>
          <Link href="/client/mybookedhouses" className="sidebar-image">My Booked Houses</Link>
          </div>
    </div>
  )
}

export default ProfilePage