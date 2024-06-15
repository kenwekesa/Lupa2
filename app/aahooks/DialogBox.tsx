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

const DialogBox: React.FC<DialogBoxProps> = async ({ isOpen, onClose,
    data, users,
    searchParams,
}) => {
  



  const [userss, setUserss] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUserss(userss);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);


  // console.log("Total Price:", data.paymentDetails[0]?.totalPrice);
  // console.log("Amount Payed", data.paymentDetails[0]?.paymentDetails.purchase_units[0].amount.value)
  // console.log("all userss ---",users)
  const filterUsers = users.filter((user: { id: string; }) => data.tourists.includes(user.id));
  
  // console.log("filtered users--->", filterUsers)

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
                            <th>Contact</th>
                            <th>Number of Slots</th>
                            <th>Total Price</th>
                            <th>Amount Payed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterUsers.map((user: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; numberOfSlots: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                            <tr key={user.id}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.contact}</td>
                              <td className="number-column">{data.tourists.filter(x => x == user.id).length}</td>
                              {/* <td className="number-column">{data.paymentDetails[0]?.totalPrice}</td> */}
                              <td className="number-column">{data.price * data.tourists.filter(x => x == user.id).length}</td>
                              <td className="number-column">{data.paymentDetails[0]?.paymentDetails.purchase_units[0].amount.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
            </div>
          
        </div>
      </div>
   
  );
};

export default DialogBox;
