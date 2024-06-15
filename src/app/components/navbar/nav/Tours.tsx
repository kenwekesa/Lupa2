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

const Tours: React.FC<DestinationsItemProp> = ({ onClick, label, handleMenuToggle }) => {
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
          <div className="text-sm">Upcoming tours</div>
          <SlArrowDown className="nav-icons-items" size={12} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute nav-small-tour rounded-xl shadow-md bg-white text-black overflow-hidden right-0 top-11 text-sm user-menu-width">
          <div className="flex px-6 flex-col w-full cursor-pointer">
            <>
              <MenuItem onClick={() => {
                router.push("/upcomingtours");
                handleMenuItemClick();
              }} label="Upcoming tours" />
              <MenuItem
                onClick={() => {
                  router.push("/trendingtours");
                  handleMenuItemClick();
                }}
                label="Trending tours"
              />
              <MenuItem
                onClick={() => {
                  router.push("/populartours");
                  handleMenuItemClick();
                }}
                label="Popular tours"
              />
              <MenuItem
                onClick={() => {
                  router.push("/premiumtours");
                  handleMenuItemClick();
                }}
                label="Premium tours"
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;
