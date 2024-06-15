import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";
import Link from "next/link";

const FooterTop = () => {
  return (
    <div className="text-white flex flex-row justify-center items-center gap-9 pb-5 pt-10">
      <Link href="https://www.tiktok.com/@devancatours?_t=8jXrWnRR1Jl&_r=1" target="_blank"><FaTiktok size={27} /></Link>
      <Link href="https://www.facebook.com/devancatourz?_rdc=2&_rdr" target="_blank"><FaFacebookF size={27} /></Link>
      <Link href="https://youtube.com/@Devanca?si=oHeK27xdfw3hzpu_" target="_blank"><FaYoutube size={27} /></Link>
      <Link href="https://www.instagram.com/devancatours?utm_source=qr&igsh=MTQ2ZXozeTExOXQxcQ==" target="_blank"><AiFillInstagram size={27} /></Link>
      <Link href="https://chat.whatsapp.com/FaQxPk0LG9KAA7L8w4JA6E" target="_blank"><IoLogoWhatsapp size={27} /></Link>
      <Link href="https://twitter.com/DevancaTours" target="_blank"><FaXTwitter size={27} /></Link>
    </div>
  );
};

export default FooterTop;
