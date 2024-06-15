import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

const FooterBottom = () => {
  return (
    <div className="flex flex-row justify-between items-center text-white py-5">
      <div className="text-md footer-main-texts">
        &copy; 2014 - 2024 DevanceTours Inc.
      </div>
      <div className="flex flex-row gap-7 justify-end items-center">
        <Image src="/images/google.png" height="30" width="30"  alt=""  className="footer-main-images" />
        <Image src="/images/master.jpg" height="30" width="30"  alt=""  className="footer-main-images footer-main-images-one" />
        <Image src="/images/paypal.jpg" height="30" width="30"  alt=""  className="footer-main-images" />
        <Image src="/images/visa.jpg" height="30" width="30" alt="" className="footer-main-images" />
        <Link href="https://www.youtube.com/channel/UCjgluXJwl_3dipbVzCOEIDg" className="footer-main-images-one" target="_blank"><FaYoutube size={35} /></Link>
      </div>
    </div>
  );
};

export default FooterBottom;
