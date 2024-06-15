'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Logo = () => {

    const router  = useRouter()
    return (
    <div className="flex items-center cursor-pointer gap-2">
     <div className="logo-image-background">
          <Image
          onClick={() => router.push('/')}
          alt="logo"
          className="cursor-pointer rounded-full logo-image-background-image"
          height="30"
          width="30"
          src="/images/logo.jpeg"
        />
        </div>
        <div className="text-2xl font-bold">
          {/* <h2 className="main-color-black">Devan<span className="main-color">ceTours</span></h2>      */}
          <div className="items-center">
            <Link href="/"><h2>Devanca<span className="text-sm">Tours</span></h2></Link>
          </div>
         
       </div>
    </div>
  )
}

export default Logo