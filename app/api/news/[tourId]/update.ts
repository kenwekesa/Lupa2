import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
  tourId?: string;
  
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {

  console.log("Update reached...")
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({
        message: "Unauthorised"
      }, {
        status: 401,
      }) // Return 401 for unauthorized access
  }

  const { tourId } = params;
  const updateData = await request.json(); // Assuming JSON data

 

  if (!tourId || typeof tourId !== "string") {
    throw new Error("Invalid tour ID"); // Throw error for invalid IDs
  }

  if (!updateData.hasOwnProperty("tourists")) {
    throw new Error("Missing 'tourists' field in update data"); // Ensure tourists field exists
  }

  const newTourists = updateData.tourists;

  // Validate newTourists array:
  if (!Array.isArray(newTourists)) {
    throw new Error("'tourists' field must be an array");
  }

  if (newTourists.length === 0) {
    throw new Error("'tourists' array cannot be empty");
  }

  // Check for valid user IDs:
  const areAllIdsValid = newTourists.every((userId) => typeof userId === "string");
  if (!areAllIdsValid) {
    throw new Error("'tourists' array must contain strings (user IDs)");
  }

  const tour = await prisma.tour.findUnique({ where: { id:tourId } });
  // Check for limit (replace with your desired limit):
  const MAX_TOURISTS = tour?.guestCount? tour.guestCount : 0 ; // Example limit, adjust as needed
  if (newTourists.length > MAX_TOURISTS) {
    throw new Error(`Maximum tourists reached: ${MAX_TOURISTS}`);
  }

 
  // Update tour with Prisma:
  try {
    const updatedTour = await prisma.tour.update({
      where: {
        id: tourId,
      },
      data: {
        tourists: {
          set: newTourists, // Use "set" for replacing the entire array
        },
      },
    });

    return NextResponse.json(updatedTour);
  } catch (error) {
    console.error("Error updating tour:", error);
    return NextResponse.json({
        message: "Internal Server error"
      }, {
        status: 500,
      }) 
      // Return 500 for unexpected errors
  }
}

