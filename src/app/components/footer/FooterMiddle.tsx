import  { useRouter } from "next/navigation"
import useRegisterModal from "@/app/hooks/useRegisterModal";

const FooterMiddle = () => {
  const router = useRouter();
  const signUpModal = useRegisterModal()

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4
     text-sm text-white w-full py-5 gap-6 md:text-md">
          <div onClick={() => router.push("/terms")} className=" hover:underline cursor-pointer">Terms & Conditions</div>
          <div onClick={() => router.push("/policy")} className=" hover:underline cursor-pointer">Privacy Policy</div> 
          <div onClick={() => router.push("/about")} className=" hover:underline cursor-pointer">About</div> 
          <div onClick={() => router.push("/populartours")} className=" hover:underline cursor-pointer">Popular Tours</div> 
          <div onClick={() => router.push("/upcomingtours")} className=" hover:underline cursor-pointer">Upcoming Tours</div> 
          <div onClick={() => router.push("/discoveryjourney")} className=" hover:underline cursor-pointer">Discovery Journeys</div>
          <div onClick={() => signUpModal.onOpen('host')} className=" hover:underline cursor-pointer">Host Sign Up</div> 
          <div onClick={() => signUpModal.onOpen('operator')} className=" hover:underline cursor-pointer">Operators Sign Up</div> 
          <div onClick={() => router.push("/staycation")} className=" hover:underline cursor-pointer">Staycation</div> 
          <div onClick={() => router.push("/couplevacay")} className=" hover:underline cursor-pointer">Couple Vacay</div>
          <div onClick={() => router.push("/news")} className=" hover:underline cursor-pointer">News</div>
          <div onClick={() => router.push("/regionaljourney")} className=" hover:underline cursor-pointer">Regional Jouneys</div> 
          <div onClick={() => router.push("/oceancruise")} className=" hover:underline cursor-pointer">Ocean Cruises</div> 
          <div onClick={() => router.push("/countryroads")} className=" hover:underline cursor-pointer">Country Roads</div> 
          <div onClick={() => router.push("/gallery")} className=" hover:underline cursor-pointer">Gallery</div>
          <div onClick={() => router.push("/trendingtours")} className=" hover:underline cursor-pointer">Trending Tours</div>
          <div onClick={() => router.push("/contact")} className=" hover:underline cursor-pointer">Contact Us</div> 
          <div onClick={() => router.push("/premiumtours")} className=" hover:underline cursor-pointer">Premium Tours</div> 
          <div onClick={() => router.push("/destinations")} className=" hover:underline cursor-pointer">Destinations</div> 
          <div onClick={() => router.push("/blogs")} className=" hover:underline cursor-pointer">Blogs</div>
    </div>
  )
}

export default FooterMiddle