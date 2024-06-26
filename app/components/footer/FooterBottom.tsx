import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";

const FooterBottom = () => {
  return (
    <div className="flex flex-row justify-between items-center text-black py-5">
      <div className="text-md footer-main-texts">
        All rights reserved Lee-Yan Smart Properties &copy;2024
      </div>
      <div className="flex flex-row gap-7 text-neutral-600 justify-end items-center">
        <Link href="https://chat.whatsapp.com/FaQxPk0LG9KAA7L8w4JA6E" target="_blank"><IoLogoWhatsapp size={27} /></Link>
        <Link href="https://www.instagram.com/devancatours?utm_source=qr&igsh=MTQ2ZXozeTExOXQxcQ==" target="_blank"><AiFillInstagram size={27} /></Link>
        <Link href="https://www.tiktok.com/@devancatours?_t=8jXrWnRR1Jl&_r=1" target="_blank"><FaTiktok size={27} /></Link>
        <Link href="https://www.facebook.com/devancatourz?_rdc=2&_rdr" target="_blank"><FaFacebookF size={27} /></Link>
        <Link href="https://youtube.com/@Devanca?si=oHeK27xdfw3hzpu_" target="_blank"><FaYoutube size={27} /></Link>
        {/* <Link href="https://www.instagram.com/devancatours?utm_source=qr&igsh=MTQ2ZXozeTExOXQxcQ==" target="_blank"><AiFillInstagram size={27} /></Link>
        <Link href="https://chat.whatsapp.com/FaQxPk0LG9KAA7L8w4JA6E" target="_blank"><IoLogoWhatsapp size={27} /></Link>
        <Link href="https://twitter.com/DevancaTours" target="_blank"><FaXTwitter size={27} /></Link> */}
      </div>
    </div>
  );
};

export default FooterBottom;
