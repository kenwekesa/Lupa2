import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "../MenuItem";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import useRentModal from "@/app/hooks/useRentModals";
import { SlArrowDown } from "react-icons/sl";

interface DestinationsItemProp {
  onClick?: () => void;
  label?: string;
  handleMenuToggle: () => void;
}

const Hotels: React.FC<DestinationsItemProp> = ({ onClick, label, handleMenuToggle }) => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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
    if (menuRef.current && !((menuRef.current as HTMLElement).contains(event.target as Node))) {
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
          <div className="text-sm">Hotels</div>
          <SlArrowDown className="nav-icons-items" size={12} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute nav-small-hotel rounded-xl shadow-md bg-white text-black overflow-hidden right-0 top-11 text-sm user-menu-width">
          <div className="flex flex-col px-6 w-full cursor-pointer">
            <>
              <MenuItem onClick={() => {
                router.push("/hotels");
                handleMenuItemClick();
              }} label="Hotels" />
              <MenuItem
                onClick={() => {
                  router.push("/africanhotels");
                  handleMenuItemClick();
                }}
                label="African"
              />
              <MenuItem
                onClick={() => {
                  router.push("/europeanhotels");
                  handleMenuItemClick();
                }}
                label="European"
              />
              <MenuItem
                onClick={() => {
                  router.push("/americanhotels");
                  handleMenuItemClick();
                }}
                label="The Americas"
              />
              <MenuItem
                onClick={() => {
                  router.push("/asianhotels");
                  handleMenuItemClick();
                }}
                label="Asian"
              />
              {/* <MenuItem
                onClick={() => router.push("/middleasthotels")}
                label="Middle East"
              /> */}
              <MenuItem
                onClick={() => {
                  router.push("/australianhotels");
                  handleMenuItemClick();
                }}
                label="Australian"
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
