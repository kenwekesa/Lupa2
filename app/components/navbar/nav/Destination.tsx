
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

  return (
    <div className="relative">
          <div className="text-md font-semibold cursor-pointer hover:underline hover:cursor-pointer" onClick={() => { router.push("/") }}>Stays</div>
    </div>
  );
};

export default Destinations;

