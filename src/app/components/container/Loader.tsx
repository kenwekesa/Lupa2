'use client'

import { PuffLoader } from "react-spinners";

const Loader = () => {
    return (
    <div>
        <div className="all-destinations-main-loader flex flex-col items-center justify-center text-lg font-bold">
        {/* <h1 className="color-h1-destinations-main-loader">Loa<span className="color-span-green">ding...</span></h1> */}
      </div>
        <div className="h-[60vh] flex flex-col justify-center items-center">
            <PuffLoader
                size={100}
                color="orange"
            />
            </div>
        </div>
    )
}

export default Loader;