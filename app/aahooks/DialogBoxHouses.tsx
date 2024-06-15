import React, { ReactNode, useEffect, useState } from 'react';
import "./Dialog.css"
import { SafeUser, safeReservation, safeTour } from '../types';
import getUsers, { IUsersParams } from '../actions/getUsers';

interface DialogBoxProps {
  searchParams?: IUsersParams;
  data: safeTour;
  reservation?: safeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  users?:any;
  currentUser?: SafeUser | null;
  isOpen: boolean;
  houses:safeReservation;
  onClose: () => void;
  children?: ReactNode;
  
}

interface UserData {
    id: string;
    name: string | null;
    contact: string | null;
    country: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    hashedPassword: string | null;
    createdAt: Date;
    updatedAt: Date;
    favoriteIds: string[];
    userType: string | null;

  }

const DialogBoxHouses: React.FC<DialogBoxProps> = async ({ isOpen, onClose,
    data, users, houses,
    searchParams,
}) => {
  

 

  const [userss, setUserss] = useState<UserData[]>([]);

  const filteredReservations = houses.filter((house: { listingId: string; }) => house.listingId === data.id);


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       setUserss(userss);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };
  
  //   fetchUsers();
  // }, []);


  // console.log("Total Price:", data.paymentDetails[0]?.totalPrice);
  // console.log("Amount Payed", data.paymentDetails[0]?.paymentDetails.purchase_units[0].amount.value)
  // console.log("all userss ---",users)
  //const filterUsers = users.filter((user: { id: string; }) => data.tourists.includes(user.id));
  
  console.log("filtered reservationss--->", filteredReservations)
  console.log("data--->", data)
  console.log("Users", users)


  const handleChildClick =  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClose();
  };
  

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleChildClick}>X</button>
        <div>
          {/* Mapping through the users array to display names and emails */}
          
      
              {/* <p>Name: {user.name}</p>
              <p>Email: {user.email}</p> */}

                  <table className="user-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            
                            <th>No. of guests</th>
                            <th>Total Price</th>
                            <th>Amount Payed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredReservations.map((reservation: any) => (
                            <tr key={reservation.id}>
                              <td>{reservation.user.name}</td>
                              <td>{reservation.user.email}</td>
                              <td>{reservation.user.country}</td>
                              <td>
                                {/* {reservation.startDate} */}
                                {new Date(reservation.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                              <td>
                                {/* {reservation.endDate} */}
                              {new Date(reservation.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="number-column">{reservation.numberOfGuests}</td>
                              <td className="number-column">{reservation.totalPrice}</td>
                              <td className="number-column">{reservation.paymentDetails.purchase_units[0].amount.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
            </div>
          
        </div>
      </div>
   
  );
};

export default DialogBoxHouses;
