'use client'
import { useRouter } from "next/navigation"
import "./banner.css"

const Banner = () => {
    const router = useRouter();
  return (
    <div className="headBannerr flex flex-col justify-start items-start banner-btn">
      
      {/* <h2>LEE-YAN SMART PROPERTIES</h2>  */}
      <h1 className="banner-title" style={{ color: 'rgb(255, 187, 0)', fontWeight:'900' }}>LUPA TRAVELS</h1> 
      <h2 className="banner-title-one text-left" style={{ color: 'white', fontWeight:'500' }}>Visualize your booking adventure, <br/>
      We&apos;ll take care of the reservations.</h2> 
      {/* <div className="secondary-button secondary-btn-p py-2 cursor-pointer premium_btn" onClick={() => router.push("/offers")}>Premium deals</div>     */}
    </div>
  )
}

export default Banner