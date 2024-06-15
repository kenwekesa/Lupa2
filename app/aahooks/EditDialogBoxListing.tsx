import React, { ReactNode, useEffect, useState } from 'react';
import "./editdialogs.css"
import { SafeUser, safeListing, safeReservation, safeTour } from '../types';
import getUsers, { IUsersParams } from '../actions/getUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface DialogBoxProps {
    searchParams?: IUsersParams;
    data: safeListing;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    users?:any;
    
    currentUser?: SafeUser | null;
    isOpen: boolean;
    onClose: () => void;

    
  }


  const EditDialogBoxListing: React.FC<DialogBoxProps> = ({ isOpen, onClose, data }) => {
    const [formData, setFormData] = useState(data);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent the default form submission behavior
      console.log("UPDATE FORM DATA--->", formData);
      makeUpdate()
      // Add your logic to handle form submission (e.g., send data to backend, update state, etc.)
    };

    const makeUpdate = () => {
     
              axios.put(`/api/listings/${data?.id}`, 
                  // from_flag:'update',
                 formData
              )
                  .then(async () => {
                      toast.success('Hotel/House update successful!');
    
                     // setDateRange(initialDateRange);
                      // redirect to /trips
                     
                    router.push('/admin/profile');
                  }).catch(() => {
                      toast.error('Something went wrong')
                  }).finally(() => {
                      setIsLoading(false);
                      onClose()
                  })
          
       } 
        


    const handleChildClick = () => {
      onClose();
    };

      // console.log("Data to edi>>>>>>>t", data)


  return (
    <div className="dialog-overlay-edits" onClick={onClose}>
      <div className="dialog-edits" onClick={(e) => e.stopPropagation()}>
        <button className="close-button-edits" onClick={handleChildClick}>X</button>

        <div className="editFormContainer-edits">
    <form className="edit-tour-form-edits h-auto" onSubmit={handleSubmit}>
      <h2>Edit Hotel/House Listing</h2>
      <div className="form-groups-container-edits h-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">

      <div className="form-group-edits">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" 
        value={formData.title}
        onChange={handleChange}
        name="title"/>
        {/** Add error message container here if needed */}
      </div>
     
      <div className="form-group-edits">
        <label htmlFor="house">House:</label>
        <input type="text" id="house" 
        onChange={handleChange}
        value={formData.house || ''}
        name="house" />
        {/** Add error message container here if needed */}
       </div>
              
    <div className="form-group-edits">
        <label htmlFor="hotel">Hotel:</label>
        <input type="text" 
        id="hotel" 
        value={formData?.hotel || ''}
        name="hotel"
        onChange={handleChange} />
        {/** Add error message container here if needed */}
      </div>

              
     <div className="form-group-edits">
        <label htmlFor="oneBedroom">Number of 1 Bedrooms:</label>
        <input type="text" id="oneBedroom" 
        onChange={handleChange}
        value={formData.oneBedroom || ''}
        name="oneBedroom" />
        {/** Add error message container here if needed */}
      </div>

      <div className="form-group-edits">
        <label htmlFor="twoBedroom">Number of 2 Bedrooms:</label>
        <input type="text" id="twoBedroom" 
        onChange={handleChange}
        value={formData.twoBedroom || ''}
        name="twoBedroom" />
        {/** Add error message container here if needed */}
      </div>

      <div className="form-group-edits">
        <label htmlFor="threebedRoom">Number of 3 Bedrooms:</label>
        <input type="text" id="threebedRoom" 
        onChange={handleChange}
        value={formData.threebedRoom || ''}
        name="threebedRoom" />
        {/** Add error message container here if needed */}
      </div>

      <div className="form-group-edits">
        <label htmlFor="commonPlace">Number of CommonPlaces:</label>
        <input type="text" id="commonPlace" 
        onChange={handleChange}
        value={formData.commonPlace || ''}
        name="commonPlace" />
        {/** Add error message container here if needed */}
      </div>
     
      <div className="form-group-edits">
        <label htmlFor="hotelLink">YouTube Link:</label>
        <input type="text" id="hotelLink" value={formData.hotelLink || ''} onChange={handleChange} name="hotelLink" />

        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edits">
        <label htmlFor="price">Price Per Night ($):</label>
        <input type="number" id="price" value={formData.price || 0} onChange={handleChange} name="price" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edits">
        <label htmlFor="save">Save Per Night ($):</label>
        <input type="number" id="save" value={formData.save || 0} onChange={handleChange} name="save" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edits">
        <label htmlFor="roomCount">Rooms Count:</label>
        <input type="number" id="roomCount" 
        onChange={handleChange}
        value={formData.roomCount || 0}  name="roomCount" min="0" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edits">
        <label htmlFor="guestCount">Guests Count:</label>
        <input type="number" id="guestCount" 
        onChange={handleChange}
        value={formData.guestCount || 0}  name="guestCount" min="0" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edits">
        <label htmlFor="hostName">Host Name:</label>
        <input type="text" id="hostName" 
        onChange={handleChange}
        value={formData.hostName || ''} name="hostName" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edits">
        <label htmlFor="cohostName">Cohost Name:</label>
        <input type="text" id="cohostName" 
        onChange={handleChange}
        value={formData.cohostName || ''} name="cohostName"/>
        {/** Add error message container here if needed */}
              </div>
      <div className="form-group-edits">
        <label htmlFor="hostContact">Host Contact:</label>
        <input type="text" id="hostContact" 
        onChange={handleChange}
        value={formData.hostContact || ''} name="hostContact" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edits">
        <label htmlFor="overView">Overview:</label>
        <input type="text" id="overView" 
        onChange={handleChange}
        value={formData.overView  || ''} name="overView" />
        {/** Add error message container here if needed */}
      </div>
    
              
      </div>
      <div className="form-group-edits">
          <button type="submit">Save Changes</button>
      </div>
    </form>
        </div>
    </div>
    </div>
    
  )
}

export default EditDialogBoxListing