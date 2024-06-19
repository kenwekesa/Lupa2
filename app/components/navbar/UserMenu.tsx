import { AiOutlineMenu } from "react-icons/ai";
import Avater from "../container/Avater";
import { useCallback, useState, useRef, useEffect } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useTourModal from "@/app/hooks/useTourModel";
import useRentModal from "@/app/hooks/useRentModals";
import { useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { GrBlog } from "react-icons/gr";
import { MdOutlineAdminPanelSettings, MdOutlineHotel, MdOutlineHouseboat } from "react-icons/md";
import { GiKangaroo } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
import { MdOutlineLocalOffer } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaHouseCircleCheck } from "react-icons/fa6";
import { GiSpookyHouse } from "react-icons/gi";
import { FaPenClip } from "react-icons/fa6";
import { GiIsland } from "react-icons/gi";
import { BsPen } from "react-icons/bs";
import { TbToolsKitchen3 } from "react-icons/tb";
import { BiBuildingHouse } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import useBlogModal from "@/app/hooks/useBlogModel";
import useNewsModal from "@/app/hooks/useNewsModel";
import useOfferModal from "@/app/hooks/useOfferModal";
import useLandModal from "@/app/hooks/useLandModal";
import usePropertyModal from "@/app/hooks/usePropertyModal";
import { MdOutlineAccountBalance } from "react-icons/md";
import useCountyModal from "@/app/hooks/useCountyModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
  handleMenuToggle: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, handleMenuToggle }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const tourModal = useTourModal();
  const blogModal = useBlogModal();
  const countyModal = useCountyModal();
  const propertyModal = usePropertyModal();
  const offerModel = useOfferModal();
  const newsModal = useNewsModal();
  const landModal = useLandModal();
  const signUpModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { onOpen, onClose } = useBlogModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleMenuItemClick = useCallback(() => {
    if (window.innerWidth <= 1024) {
      handleMenuToggle(); // Close the entire menu for small screens
    }
    closeMenu(); // Close the menu when a link is clicked
  }, [handleMenuToggle, closeMenu]);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "https://www.devancatour.com/" });
      await router.push("/");
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <div
          className={`p-4 md:py-1 md:px-2 border-[1.5px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition ${
            isOpen ? "" : ""
          }`}
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avater src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute nav-small-menu rounded-xl border-[1.5px] border-neutral-300 shadow-md bg-white text-black overflow-hidden right-0 top-11 text-sm user-menu-width">
          <div className="flex flex-col px-2 w-full cursor-pointer">
            {currentUser ? (
              <>
                {currentUser.userType === "host" ? (
                  <div>
                    <div>
                      <div className="flex flex-row items-center">
                        <CiUser className="nav-icons-items" size={23} />{" "}
                        <MenuItem
                          onClick={() => {
                            router.push("/host/profile");
                            handleMenuItemClick();
                          }}
                          label="My profile"
                        />
                      </div>
                      <div className="flex flex-row items-center">
                        <IoIosHeartEmpty className="nav-icons-items" size={23} />{" "}
                        <MenuItem
                          onClick={() => {
                            router.push("/favorites");
                            handleMenuItemClick();
                          }}
                          label="My favorites"
                        />
                      </div>
                      <div className="flex flex-row items-center">
                        <MdOutlineHotel className="nav-icons-items" size={23} />
                        <MenuItem
                          onClick={() => {
                            rentModal.onOpen();
                            handleMenuItemClick();
                          }}
                          label="Add hotel/house"
                        />
                      </div>
                      <hr />
                      <div className="flex flex-row items-center">
                        <CiLogin className="nav-icons-items" size={23} />
                        <MenuItem onClick={handleLogout} label="Logout" />
                      </div>
                    </div>
                  </div>
                ) : currentUser.userType === "operator" ? (
                  <div>
                    <div className="flex flex-row items-center">
                      <CiUser className="nav-icons-items" size={23} />{" "}
                      <MenuItem
                        onClick={() => {
                          router.push("/operator/profile");
                          handleMenuItemClick();
                        }}
                        label="My profile"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <IoIosHeartEmpty className="nav-icons-items" size={23} />{" "}
                      <MenuItem
                        onClick={() => {
                          router.push("/favorites");
                          handleMenuItemClick();
                        }}
                        label="My favorites"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <GiKangaroo className="nav-icons-items" size={23} />
                      <MenuItem
                        onClick={() => {
                          tourModal.onOpen();
                          handleMenuItemClick();
                        }}
                        label="Add tour"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <MdOutlineHotel className="nav-icons-items" size={23} />
                      <MenuItem
                        onClick={() => {
                          rentModal.onOpen();
                          handleMenuItemClick();
                        }}
                        label="Add hotel/house"
                      />
                    </div>
                    <hr />
                    <div className="flex flex-row items-center">
                      <CiLogin className="nav-icons-items" size={23} />
                      <MenuItem onClick={handleLogout} label="Logout" />
                    </div>
                  </div>
                ) : currentUser.userType === "admin" ? (
                  <div>
                    <div className="flex flex-row items-center">
                      <CiUser className="nav-icons-items" size={23} />{" "}
                      <MenuItem
                        onClick={() => {
                          router.push("/admin/profile");
                          handleMenuItemClick();
                        }}
                        label="My profile"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <RiAdminLine className="nav-icons-items" size={23} />{" "}
                      <MenuItem
                        onClick={() => {
                          signUpModal.onOpen("admin");
                          handleMenuItemClick();
                        }}
                        label="Create an admin"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <MdOutlineRealEstateAgent className="nav-icons-items" size={23} />{" "}
                      <MenuItem
                        onClick={() => {
                          signUpModal.onOpen("operator");
                          handleMenuItemClick();
                        }}
                        label="Create an agent"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <TbToolsKitchen3 className="nav-icons-items" size={23} />
                      <MenuItem
                        onClick={() => {
                          rentModal.onOpen();
                          handleMenuItemClick();
                        }}
                        label="Create new stay"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <BsPen className="nav-icons-items" size={23} />{" "}
                          <MenuItem onClick={() => {
                              blogModal.onOpen();
                              handleMenuItemClick();
                          }} label="Create new blog" />
                    </div>
                    <div className="flex flex-row items-center">
                      <GiSpookyHouse className="nav-icons-items" size={23} />
                      <MenuItem
                        onClick={() => {
                          propertyModal.onOpen();
                          handleMenuItemClick();
                        }}
                        label="Create new property"
                      />
                    </div>
                     <div className="flex flex-row items-center">
                      <GiIsland className="nav-icons-items" size={23} />
                      <MenuItem
                        onClick={() => {
                          landModal.onOpen();
                          handleMenuItemClick();
                        }}
                        label="Create new landsale"
                      />
                      </div>  
                      <div className="flex flex-row items-center">
                      <MdOutlineAccountBalance className="nav-icons-items" size={23} />
                      <MenuItem
                        onClick={() => {
                          countyModal.onOpen();
                          handleMenuItemClick();
                        }}
                        label="Create new county"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <MdOutlineLocalOffer className="nav-icons-items" size={23} />
                      <MenuItem
                        onClick={() => {
                          offerModel.onOpen();
                          handleMenuItemClick();
                        }}
                        label="Create new offer"
                      />
                    </div>
                    <hr />
                    <div className="flex flex-row items-center">
                      <CiLogin className="nav-icons-items" size={23} />
                      <MenuItem onClick={handleLogout} label="Logout" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-row items-center">
                      <CiUser className="nav-icons-items" size={23} />{" "}
                      <MenuItem
                        onClick={() => {
                          router.push("/client/profile");
                          handleMenuItemClick();
                        }}
                        label="My profile"
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <IoIosHeartEmpty className="nav-icons-items" size={23} />{" "}
                      <MenuItem
                        onClick={() => {
                          router.push("/favorites");
                          handleMenuItemClick();
                        }}
                        label="My favorites"
                      />
                    </div>
                    <hr />
                    <div className="flex flex-row items-center">
                      <CiLogin className="nav-icons-items" size={23} />
                      <MenuItem onClick={handleLogout} label="Logout" />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="flex flex-row items-center">
                  <CiLogin className="nav-icons-items" size={23} />
                  <MenuItem
                    onClick={() => {
                      loginModal.onOpen();
                      handleMenuItemClick();
                    }}
                    label="Login"
                  />
                </div>
                <div className="flex flex-row items-center">
                  <CiUser className="nav-icons-items" size={23} />
                  <MenuItem
                    onClick={() => {
                      registerModal.onOpen("client");
                      handleMenuItemClick();
                    }}
                    label="Sign up"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;


