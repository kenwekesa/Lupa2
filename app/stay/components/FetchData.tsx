'use client'

import getCurrentUser from "@/app/actions/getCurrentUsers";
import getTours, { IToursParams } from "@/app/actions/getTours";


export const fetchAllData = async (tourParams: IToursParams) => {
  try {
    const toursData = await getTours(tourParams);
    const user = await getCurrentUser();
    return { toursData, user };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Optionally, you can handle the error here or let it propagate
  }
};