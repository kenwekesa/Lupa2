'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import "./navbar.css"
import logo from "../../../public/images/logo.jpeg"

const Lago = () => {

    const router  = useRouter()
    return (
    <div className="flex items-center cursor-pointer gap-2">
     <div className="logo-image-background">
          <Image
          onClick={() => router.push('/')}
          alt="logo"
          className="cursor-pointer rounded-full logo-image-background-image"
          height="34"
          width="34"
          src={logo}
        />
        </div>
        <div className="text-md text-neutral-800 font-semibold">
          <div className="items-center">
            <Link href="/">
              <p>
                Lee-yan smart properties
              </p>
            </Link>
          </div>
       </div>
    </div>
  )
}

export default Lago