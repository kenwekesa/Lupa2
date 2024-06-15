'use client'

import { useState } from "react"
import UserMenu from "../UserMenu"
import Destinations from "./Destination"
import Hotels from "./Hotels"
import House from "./House"
import Tours from "./Tours"
import Ways from "./Ways"

interface UserMenuProps {
  handleMenuToggle: () => void;
}

const Nav:React.FC<UserMenuProps> = ({ handleMenuToggle }) => {

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const handleMenuToggle = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  return (
    <div className="nav-main-nav flex flex-col sm:flex-row sm:mx-8 sm:gap-8 justify-between sm:items-start items-center">
      <div className="nav-main-nav-divs"><Destinations handleMenuToggle={handleMenuToggle} /></div>
      <div className="nav-main-nav-divs"><Hotels handleMenuToggle={handleMenuToggle} /></div>
      <div className="nav-main-nav-divs"><Ways handleMenuToggle={handleMenuToggle} /></div>
      <div className="nav-main-nav-divs"><House handleMenuToggle={handleMenuToggle} /></div>
      <div className="nav-main-nav-divs"><Tours handleMenuToggle={handleMenuToggle}/></div> 
    </div>
  )
}

export default Nav;
