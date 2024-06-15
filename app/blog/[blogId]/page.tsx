// Import statements with consistent paths
import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservation";
import getTourById from "@/app/actions/getTourById";
import getTours, { IToursParams } from "@/app/actions/getTours";
import EmptyState from "@/app/components/container/EmptyState";
import Container from "@/app/components/container/Container";
import TourCard from "@/app/components/listing/TourCard";
import Link from "next/link";
import TourCardSecondary from "@/app/components/listing/TourCardSecondary";
import getNewsById from "@/app/actions/getNewsById";
import { IBlogParams } from "@/app/aagetMethods/getBlogs";
import Image from "next/image";

// Define the interface for the TourPage component props
interface IParams {
  blogId?: string;
  tourParams: IBlogParams;
}

// TourPage component is defined as an asynchronous function
const TourPage = async ({ params }: { params: IParams }) => {
  const tour = await getNewsById(params);
  // const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const tours = await getTours(params.tourParams);
  const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);

  // Check if there is no tour, display EmptyState component
  if (!tour) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* Header section */}
      <div className="european-hotel european-hotel-tour flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white">
          {tour.title}
          <span className="color-span-green"></span>
        </h1>
      </div>

      <Container>
        <div className="flex flex-col pt-9 gap-2 w-full h-auto mb-2 blog-screen">
          <div className="flex flex-row items-start gap-1">
                    <div className="font-bold text-lg pb-3 text-green-500">
                        {tour?.title}
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-normal pb-3 text-neutral-600 text-justify leading-relaxed">
                        {tour?.description}
                    </div>
                </div>
                <div className="aspect-square sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full blog-images-main relative overflow-hidden rounded-xl">
                    {tour?.imageSrc[0] ? (
                        <Image
                            fill
                            alt="Listing"
                            src={tour?.imageSrc[0]}
                            className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
                        />
                    ) : tour?.hotelLink !== "" ? (
                        <iframe
                            src={tour?.hotelLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh]"
                        ></iframe>
                    ) : null}
                </div>
          {tour?.subtitle && tour?.subtitle.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitle}
              </div>
            </div>
          )}
          {tour?.descriptionone && tour?.descriptionone.length > 0 &&  (
            <div className="flex flex-row items-center gap-1">
              <div className="font-normal pb-3  text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptionone}
              </div>
            </div>
          )}
          {tour?.imageSrc[1] && tour?.imageSrc[1].length > 0 && (
            <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
              <Image
                fill
                alt="Listing"
                src={tour?.imageSrc[1] || ""} // Handle null data or imageSrc
                className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
              />
            </div>
          )}

          {tour?.subtitleone && tour?.subtitleone.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitleone}
              </div>
            </div>
          )}

          {tour?.descriptiontwo && tour?.descriptiontwo.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className=" pb-3 text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptiontwo}
              </div>
            </div>
          )}

          {tour?.imageSrc[2] && tour?.imageSrc[2].length > 0 && (
            <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
              <Image
                fill
                alt="Listing"
                src={tour?.imageSrc[2] || ""} // Handle null data or imageSrc
                className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
              />
            </div>
          )}

          {tour?.subtitletwo && tour?.subtitletwo.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitletwo}
              </div>
            </div>
          )}
          {tour?.descriptionthree && tour?.descriptionthree.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="pb-3 text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptionthree}
              </div>
            </div>
          )}
          {tour?.imageSrc[3] && tour?.imageSrc[3].length > 0 && (
            <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
              <Image
                fill
                alt="Listing"
                src={tour?.imageSrc[3] || ""} // Handle null data or imageSrc
                className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
              />
            </div>
          )}
        
          {tour?.subtitlethree && tour?.subtitlethree.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitlethree}
              </div>
            </div>
          )}
          
          {tour?.descriptionfour && tour?.descriptionfour.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="pb-3 text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptionfour}
              </div>
            </div>
          )}
        
          {tour?.imageSrc[4] && tour?.imageSrc[4].length > 0 && (
          <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={tour?.imageSrc[4] || ""} // Handle null data or imageSrc
                      className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
                  />
              </div>
          )}

          {tour?.subtitlefour && tour?.subtitlefour.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitlefour}
              </div>
            </div>
          )}
          {tour?.descriptionfive && tour?.descriptionfive.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="pb-3 text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptionfive}
              </div>
            </div>
          )}

          {tour?.imageSrc[5] && tour?.imageSrc[5].length > 0 && (
            <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
              <Image
                fill
                alt="Listing"
                src={tour?.imageSrc[5] || ""} // Handle null data or imageSrc
                className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
              />
            </div>
          )}
          
          {tour?.subtitlefive && tour?.subtitlefive.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitlefive}
              </div>
            </div>
          )}
        
          {tour?.descriptionsix && tour?.descriptionsix.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="pb-3 text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptionsix}
              </div>
            </div>
          )}
          
          {tour?.imageSrc[6] && tour?.imageSrc[6].length > 0 && (
            <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
              <Image
                fill
                alt="Listing"
                src={tour?.imageSrc[6] || ""} // Handle null data or imageSrc
                className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
              />
            </div>
          )}
              <div className="font-semibold text-md mb-2 truncate text-green-500">
                 <span>{tour.title}</span>
              </div>
                <div className="text-green-600 py-3">
                    <hr />
                </div>
            </div>
      </Container>

      {/* Classic Adventure Tours section */}
      {filteredTours && filteredTours.length > 0 && (
        <Container>
          <div className="flex flex-col gap-1 pt-5">
            <h1 className="main-header-black w-full text-center">
             OUR PREMIUM <span className="main-header-gradient">TOURS</span>
            </h1>
            <p className="text-neutral-500 text-sm w-full text-center">
              You viewed the magical {tour.title} tour - continue your luxury adventure with these premium recommendations for similar exotic journeys handpicked just for you.
            </p>
          </div>
          <div className="grid-cols-page-s pt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {/* Map through the tours array and render TourCard components */}
            {filteredTours.map((tour: any) => (
              <TourCardSecondary
                currentUser={currentUser ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
                key={tour.id}
                data={tour}
              />
            ))}
          </div>
          <div className="w-full text-center pt-8">
            <Link
              className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md"
              href="/hotels"
            >
              View our premium tours
            </Link>
          </div>
        </Container>
      )}
        
    </div>
  );
};

export default TourPage;
