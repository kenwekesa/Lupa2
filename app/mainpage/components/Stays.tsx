import React from 'react';
import Image from "next/image";
import imageone from "../../../public/images/nairobi.jpg";
import imagetwo from "../../../public/images/diane.jpg";
import imagethree from "../../../public/images/flamingo.jpg";
import imagefour from "../../../public/images/kutus.jpg";
import imagefive from "../../../public/images/adventure.jpeg";
import Link from "next/link"

const Stay: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-5">
        <div className="flex justify-between w-[100%] space-x-5">    
        <div className="relative w-[33.3333%] h-[35vh]">
          <Link className='cursor-pointer' href={{ pathname: '/stay', query: { county: 'Nairobi' }}}> 
          <Image
            src={imageone}
            alt="Image 1"
            className="object-cover w-full h-[35vh] rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg shadow-lg"></div>
          <div className="absolute bottom-0 left-0 p-2 text-white">
            <h2 className="text-xl font-bold">Nairobi</h2>
          </div>
            </Link>
          </div>
        <div className="relative w-[33.3333%] h-[35vh]">
          <Link className='cursor-pointer' href={{ pathname: '/stay', query: { county: 'Mombasa' }}}>
          <Image
            src={imagetwo}
            alt="Image 2"
            className="object-cover w-full h-[35vh] rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg shadow-lg"></div>
          <div className="absolute bottom-0 left-0 p-2 text-white">
            <h2 className="text-xl font-bold">Mombasa</h2>
         </div>
         </Link>
        </div>
        <div className="relative w-[33.3333%] h-[35vh]">
        <Link className='cursor-pointer' href={{ pathname: '/stay', query: { county: 'Naivasha' }}}>
          <Image
            src={imagethree}
            alt="Image 3"
            className="object-cover w-full h-[35vh] rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg shadow-lg"></div>
          <div className="absolute bottom-0 left-0 p-2 text-white">
            <h2 className="text-xl font-bold">Naivasha</h2>
         </div>
         </Link>
        </div>
      </div>
      <div className="flex justify-between w-[100%] space-x-5">
        <div className="relative w-[50%] h-[40vh]">
         <Link className='cursor-pointer' href={{ pathname: '/stay', query: { county: 'Kisumu' }}}>
          <Image
            src={imagefour}
            alt="Image 4"
            className="object-cover w-full h-[40vh] rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg shadow-lg"></div>
          <div className="absolute bottom-0 left-0 p-2 text-white">
            <h2 className="text-xl font-bold">Kisumu</h2>
         </div>
         </Link>
        </div>
        <div className="relative w-[50%] h-[40vh]">
          <Link className='cursor-pointer' href={{ pathname: '/stay', query: { county: 'Kajiado' }}}>
          <Image
            src={imagefive}
            alt="Image 5"
            className="object-cover w-full h-[40vh] rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg shadow-lg"></div>
          <div className="absolute bottom-0 left-0 p-2 text-white">
            <h2 className="text-xl font-bold">Kajiado</h2>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Stay;
