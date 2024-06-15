import { images } from "@/utils/constants"
import Image from "next/image"

const Slider = () => {
  return (
    <div className="w-full flex justify-center items-center gap-4 transition-transform ease-in-out duration-150 rounded-2xl">
    {images.map((pic, idx) => (
        <div className="block w-full h-[75vh] object-over transition-all duration-500 ease-in-out" key={idx}>
            <Image
                src={pic.src}
                alt=""
                width={400}
                height={400}
                className="w-full h-full object-cover"
            />
        </div>
    ))}
    </div>
  )
}

export default Slider