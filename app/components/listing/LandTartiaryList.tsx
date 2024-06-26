'use client';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SafeUser, safeListing, safeReservation, safeCounty, safeProperty, safeLand } from "@/app/types";
import "./listing.css";

interface ListingCardProps {
  data: safeCounty[] | safeCounty;
  datas: safeLand[] | safeLand;
  reservation?: safeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const LandTartiaryList: React.FC<ListingCardProps> = ({
  data,
  datas,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser
}) => {
  const router = useRouter();

  // Ensure data and datas are arrays
  const dataArray = Array.isArray(data) ? data : [data];
  const datasArray = Array.isArray(datas) ? datas : [datas];

  // Create a map of county counts from safeListing
  const countyCountMap: { [key: string]: number } = datasArray.reduce((acc, listing) => {
    if (listing.county) {
      acc[listing.county] = (acc[listing.county] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  // Get the unique counties and limit to the first 20
  const uniqueCounties = Array.from(new Set(dataArray.map(county => county.county))).slice(0, 20);

  return (
    <>
      {uniqueCounties.map((county) => {
        if (county && countyCountMap[county]) {
          return (
            <div
              key={county}
              className="col-span-1 pb-3 rounded-xl cursor-pointer group"
            >
              <Link href={{ pathname: '/land.', query: { county: county }}} passHref>
                <div className="flex h-[auto] flex-col gap-2 w-full main-image-small-screen main-image-small-screen-x">
                  <div className="text-md px-2 pt-1 pb-2 font-semibold text-md truncate max-w-[20rem]">
                    <span className="text-neutral-700">{county}</span>
                  </div>
                  <div className="font-light px-2 flex items-center justify-between mt-[-12px] text-neutral-500">
                    <span className="text-neutral-500 text-sm text-start line-clamp-2">
                      {countyCountMap[county]} Percels of land
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-1"></div>
                </div>
              </Link>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default LandTartiaryList;
