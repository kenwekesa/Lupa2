'use client'
import { useRouter } from "next/navigation"

const Banner = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center gap-5 banner-btn">
      <h2>THE</h2> 
      <h1>GRAND</h1> 
      <h2>TOUR DEALS</h2> 
      <div className="secondary-button secondary-btn-p cursor-pointer" onClick={() => router.push("/alldestinations")}>See all offers</div>    
    </div>
  )
}

export default Banner