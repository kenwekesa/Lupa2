'use client'

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyStates: React.FC<EmptyStateProps> = ({
    title = "There are no current tour entries",
    subtitle = "Try other tour entries from other continents or countries",
    showReset
}) => {
    const router = useRouter()
    return (
    <div> <div className="all-destinations-main-loader flex flex-col items-center justify-center text-lg font-bold">
        {/* <h1 className="color-h1-destinations-main-loader">Loa<span className="color-span-green">ding...</span></h1> */}
      </div>
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">

          <Heading
              center
              title={title}
              subtitle={subtitle}
          />

          <div className="w-48 mt-4">
              {showReset && (
                  <Button
                      outline
                      label="Remove all filters"
                      onClick={() => router.push('/')}
                  />
              )}
          </div>
          
            </div>
    </div>
  )
}

export default EmptyStates