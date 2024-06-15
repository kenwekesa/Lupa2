// import { AiOutlineMenu } from "react-icons/ai";
// import MenuItem from "../MenuItem";
// import { useRouter } from "next/navigation";
// import { useState, useRef, useEffect, useCallback } from "react";
// import useRentModal from "@/app/hooks/useRentModals";
// import { SlArrowDown } from "react-icons/sl";

// interface DestinationsItemProp {
//   onClick?: () => void;
//   label?: string;
// }

// const Destinations: React.FC<DestinationsItemProp> = ({ onClick, label }) => {
//   const router = useRouter();
//   const rentModal = useRentModal();
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);

//   const toggleOpen = useCallback(() => {
//     setIsOpen((value) => !value);
//   }, []);

//   const handleClickOutside = useCallback(
//   (event: MouseEvent) => {
//     if (menuRef.current && !((menuRef.current as HTMLElement).contains(event.target as Node))) {
//       setIsOpen(false);
//     }
//   },
//   [menuRef]
// );

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [handleClickOutside]);

//   return (
//     <div className="relative" onClick={onClick}>
//       <div className="flex flex-row items-center gap-3">
//         <div
//           ref={menuRef}
//           className={`p-4 md:py-1 text-sm hover:underline md:px-2 flex flex-row items-center gap-2 cursor-pointer transition ${
//             isOpen ? "" : ""
//           }`}
//           onClick={toggleOpen}
//         >
//           <div className="text-sm">Destinations</div>
//           <SlArrowDown className="nav-icons-items" size={12} />
//         </div>
//       </div>
//       {isOpen && (
//         <div className="absolute nav-small-dest rounded-xl shadow-md bg-white text-black overflow-hidden right-0 top-11 text-sm user-menu-width">
//           <div className="flex flex-col px-6 font-normal w-full cursor-pointer">
//             <>
//               <MenuItem onClick={() => router.push("/destinations")} label="Destinations" />
//               <MenuItem
//                 onClick={() => router.push("/africandestinations")}
//                 label="African"
//               />
//               <MenuItem
//                 onClick={() => router.push("/europeandestinations")}
//                 label="European"
//               />
//               <MenuItem
//                 onClick={() => router.push("/americandestinations")}
//                 label="The Americas"
//               />
//               <MenuItem
//                 onClick={() => router.push("/asiandestinations")}
//                 label="Asian"
//               />
//               <MenuItem
//                 onClick={() => router.push("/australiandestinations")}
//                 label="Australian"
//               />
//             </>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Destinations;

import React, { useState, useRef, useEffect, useCallback } from "react";
import MenuItem from "../MenuItem";
import { useRouter } from "next/navigation";
import { SlArrowDown } from "react-icons/sl";
import useRentModal from "@/app/hooks/useRentModals";

interface DestinationsItemProp {
  onClick?: () => void;
  label?: string;
  handleMenuToggle: () => void;
}

const Destinations: React.FC<DestinationsItemProp> = ({ onClick, label, handleMenuToggle }) => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleMenuItemClick = useCallback(() => {
    if (window.innerWidth <= 1024) {
      handleMenuToggle(); // Close the entire menu for small screens
    }
  }, [handleMenuToggle]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [menuRef]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative" onClick={onClick}>
      <div className="flex flex-row items-center gap-3">
        <div
          ref={menuRef}
          className={`p-4 md:py-1 text-sm hover:underline md:px-2 flex flex-row items-center gap-2 cursor-pointer transition ${
            isOpen ? "" : ""
          }`}
          onClick={toggleOpen}
        >
          <div className="text-sm">Destinations</div>
          <SlArrowDown className="nav-icons-items" size={12} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute nav-small-dest rounded-xl shadow-md bg-white text-black overflow-hidden right-0 top-11 text-sm user-menu-width">
          <div className="flex flex-col px-6 font-normal w-full cursor-pointer">
            <>
              <MenuItem onClick={() => { router.push("/destinations"); handleMenuItemClick(); }} label="Destinations" />
              <MenuItem onClick={() => { router.push("/africandestinations"); handleMenuItemClick(); }} label="African" />
              <MenuItem onClick={() => { router.push("/europeandestinations"); handleMenuItemClick(); }} label="European" />
              <MenuItem onClick={() => { router.push("/americandestinations"); handleMenuItemClick(); }} label="The Americas" />
              <MenuItem onClick={() => { router.push("/asiandestinations"); handleMenuItemClick(); }} label="Asian" />
              <MenuItem onClick={() => { router.push("/australiandestinations"); handleMenuItemClick(); }} label="Australian" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;

