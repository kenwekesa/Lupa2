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
import { GiKangaroo } from "react-icons/gi";
import { BiHotel } from "react-icons/bi";
import { GiTreehouse } from "react-icons/gi";
import Link from "next/link";
import "./sidebar.css";

// Define the interface for the Home component props


// Home component is defined as an asynchronous function
const ProfilePage = async () => {
  // Fetch listings and current user asynchronousl
  return (
      <div className="border-[2px] sidebar-image-main rounded-xl px-5">
          <div className="w-full text-center items-center py-5"> 
          <FaCircleUser className="text-neutral-500" size={29} />
          </div>
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/admin/profile"><FaRegUser className="text-neutral-500" size={26} /></Link>
          <Link href="/admin/profile" className="sidebar-image">Personal Info</Link>
          </div>
         <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center"> 
          <Link href="/admin/mytours"><GiKangaroo className="text-neutral-500" size={26} /></Link>
          <Link href="/admin/mytours" className="sidebar-image">My Tours</Link>
         </div>
           <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/admin/myhotels"><BiHotel className="text-neutral-500" size={26} /> </Link>
          <Link href="/admin/myhotels" className="sidebar-image">My Hotels</Link>
          </div>
           <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/admin/myhouselistings"><GiTreehouse className="text-neutral-500" size={26} /></Link>
          <Link href="/admin/myhouselistings" className="sidebar-image">My House Listings</Link>
          </div>
          <hr />
           <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/admin/mybookedtours"><LiaSwatchbookSolid className="text-neutral-500" size={26} /></Link>
          <Link href="/admin/mybookedtours" className="sidebar-image">My Booked Tours</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/admin/mybookedhotels"><IoBookmarks className="text-neutral-500" size={26} /></Link>
          <Link href="/admin/mybookedhotels" className="sidebar-image">My Booked Hotels</Link>
         </div>
        <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/admin/mybookedhouses"><PiBookmarksSimpleBold className="text-neutral-500" size={26} /></Link>
          <Link href="/admin/mybookedhouses" className="sidebar-image">My Booked Houses</Link>
          </div>
         <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center"> 
          <Link href="/admin/allbookedtours"><FaSwatchbook className="text-neutral-500" size={26} /></Link>
          <Link href="/admin/allbookedtours" className="sidebar-image">All Booked Tours</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/admin/allbookedhotels"><PiBookOpenTextFill className="text-neutral-500" size={26} /></Link>
          <Link href="/admin/allbookedhotels" className="sidebar-image">All Booked Hotels</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center"> 
          <Link href="/admin/allbookedhouses"><PiBookOpenTextBold className="text-neutral-500" size={26} /></Link>
          <Link href="/admin/allbookedhouses" className="sidebar-image">All Booked Houses</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/admin/hosts"><LiaAddressBookSolid className="text-neutral-500" size={26} /></Link>
          <Link href="/admin/hosts" className="sidebar-image">Hotel Hosts</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center"> 
           <Link href="/admin/operators"><PiAddressBookFill className="text-neutral-500" size={26} /></Link>
            <Link href="/admin/operators" className="sidebar-image">Tour Operators</Link> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <Link href="/admin/clients"><ImAddressBook className="text-neutral-500" size={26} /> </Link> 
          <Link href="/admin/clients" className="sidebar-image">Clients</Link> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
           <Link href="/admin/administrators"><FaRegAddressBook className="text-neutral-500" size={26} /></Link>
            <Link href="/admin/administrators" className="sidebar-image">Administrators</Link>
          </div>
    </div>
  )
}

export default ProfilePage