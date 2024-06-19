'use client'
import { useRouter } from "next/navigation"
import "./banner.css"

const Banner = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col justify-start items-start gap-9 banner-btn">
      {/* <h2>LEE-YAN SMART PROPERTIES</h2>  */}
      <h1 className="banner-title">LUPA TRAVELS</h1> 
      <h2 className="banner-title-one">VISUALIZE YOUR BOOKING ADVENTURE; WE&apos;LL TAKE CARE OF THE RESERVATIONS</h2> 
      <div className="secondary-button secondary-btn-p py-2 cursor-pointer premium_btn" onClick={() => router.push("/offers")}>Premium deals</div>    
    </div>
  )
}

export default Banner