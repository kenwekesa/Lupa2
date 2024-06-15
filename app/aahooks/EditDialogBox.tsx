import React, { ReactNode, useEffect, useState } from 'react';
import "./editdialog.css"
import { SafeUser, safeReservation, safeTour } from '../types';
import getUsers, { IUsersParams } from '../actions/getUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
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

    
  }


  const EditDialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose, data }) => {
    const [formData, setFormData] = useState(data);

    const [isLoading, setIsLoading] = useState(false);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent the default form submission behavior
      // console.log("UPDATE FORM DATA--->", formData);
      makeUpdate()
      // Add your logic to handle form submission (e.g., send data to backend, update state, etc.)
    };
  

    const makeUpdate = () => {
     
              axios.put(`/api/tours/${data?.id}`, {
                  from_flag:'update',
                 ...formData
              })
                  .then(async () => {
                      toast.success('Tour update successful!');
                      
                     // setDateRange(initialDateRange);
                      // redirect to /trips
                     
                      //router.push('/trips');
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
    <div className="dialog-overlay-edit h-auto" onClick={onClose}>
      <div className="dialog-edit" onClick={(e) => e.stopPropagation()}>
        <button className="close-button-edit" onClick={handleChildClick}>X</button>

  <div className="editFormContainer-edit">
    <form className="edit-tour-form-edit h-auto" onSubmit={handleSubmit}>
      <h2>Edit Tour</h2>
      <div className="form-groups-container-edit h-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">

      <div className="form-group-edit">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" 
        value={formData.title}
        onChange={handleChange}
        name="title" required />
        {/** Add error message container here if needed */}
      </div>
     
      <div className="form-group-edit">
        <label htmlFor="depStart">Departure Start Date:</label>
        <input type="text" id="depStart" 
        onChange={handleChange}
        value={formData.depStart || ''}
        name="depStart" required />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edit">
        <label htmlFor="depEnd">Departure End Date:</label>
        <input type="text" 
        id="depEnd" 
        value={formData?.depEnd || ''}
        name="depEnd" required
        onChange={handleChange} />
        {/** Add error message container here if needed */}
      </div>

     
      <div className="form-group-edit">
        <label htmlFor="tripStyle">Trip Style:</label>
        <input type="text" id="tripStyle" value={formData.tripStyle || ''} onChange={handleChange} name="tripStyle" />

        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edit">
        <label htmlFor="save">Save:</label>
        <input type="number" id="save" value={formData.save || 0} onChange={handleChange} name="save" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edit">
        <label htmlFor="room">Rooms:</label>
        <input type="number" id="room" 
        onChange={handleChange}
        value={formData.room || 0}  name="room" min="0" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edit">
        <label htmlFor="ourLink">Our Link:</label>
        <input type="url" id="ourLink" 
        onChange={handleChange}
        value={formData.ourLink || ''} name="ourLink" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edit">
        <label htmlFor="guestCount">Tourists Count:</label>
        <input type="number" id="guestCount" 
        onChange={handleChange}
        value={formData.guestCount}
        name="guestCount" min="0" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edit">
        <label htmlFor="price">Price ($):</label>
        <input type="number" id="price" 
        onChange={handleChange}
        value={formData.price} name="price" min="0" required />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edit">
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" 
        onChange={handleChange}
        value={formData.country || ''} name="country" required />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edit">
        <label htmlFor="continent">Continent:</label>
        <input type="text" id="continent" 
        onChange={handleChange}
        value={formData.continent  || ''} name="continent" required />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edit">
        <label htmlFor="locations">Locations (comma-separated):</label>
        <input type='text' id="locations" 
        onChange={handleChange}
        value={formData.locations || ''}name="locations"/>
        {/** Add error message container here if needed */}
        </div>
        <div className="form-group-edit">
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description"
        onChange={handleChange}
        value={formData.description}required></textarea>
        {/** Add error message container here if needed */}
        </div>
              


              



      <div className="form-group-edit">
        <label htmlFor="day1">First day:</label>
        <input type="text" id="day1" 
        onChange={handleChange}
        value={formData.day1  || ''} name="day1" />
        {/** Add error message container here if needed */}
    </div>

    <div className="form-group-edit">
        <label htmlFor="day2">Second day:</label>
        <input type="text" id="day2" 
        onChange={handleChange}
        value={formData.day2 || ''} name="day2" />
        {/** Add error message container here if needed */}
              </div>
      <div className="form-group-edit">
        <label htmlFor="Day3">Third day:</label>
        <input type="text" id="Day3" 
        onChange={handleChange}
        value={formData.Day3  || ''} name="Day3" />
        {/** Add error message container here if needed */}
              </div>
      
        <div className="form-group-edit">
        <label htmlFor="Day4">Forth Day:</label>
        <input type="text" id="Day4" 
        onChange={handleChange}
        value={formData.Day4  || ''} name="Day4" />
        {/** Add error message container here if needed */}
        </div>
              
      <div className="form-group-edit">
        <label htmlFor="Day5">Fifth Day:</label>
        <input type="text" id="Day5" 
        onChange={handleChange}
        value={formData.Day5  || ''} name="Day5" />
        {/** Add error message container here if needed */}
      </div>

              
    <div className="form-group-edit">
        <label htmlFor="Day6">Sixth Day:</label>
        <input type="text" id="Day6" 
        onChange={handleChange}
        value={formData.Day6  || ''} name="Day6" />
        {/** Add error message container here if needed */}
              </div>
              

      <div className="form-group-edit">
        <label htmlFor="Day7">Seventh Day:</label>
        <input type="text" id="Day7" 
        onChange={handleChange}
        value={formData.Day7  || ''} name="Day7" />
        {/** Add error message container here if needed */}
      </div>
              
      <div className="form-group-edit">
        <label htmlFor="Day8">Eigth Day:</label>
        <input type="text" id="Day8" 
        onChange={handleChange}
        value={formData.Day8  || ''} name="Day8" />
        {/** Add error message container here if needed */}
      </div>
              
      <div className="form-group-edit">
        <label htmlFor="Day9">Nineth Day:</label>
        <input type="text" id="Day9" 
        onChange={handleChange}
        value={formData.Day9 || ''} name="Day9" />
        {/** Add error message container here if needed */}
              </div>
              
      <div className="form-group-edit">
        <label htmlFor="Day10">10th Day:</label>
        <input type="text" id="Day10" 
        onChange={handleChange}
        value={formData.Day10 || ''} name="Day10" />
        {/** Add error message container here if needed */}
              </div>

      <div className="form-group-edit">
        <label htmlFor="Day11">11th Day:</label>
        <input type="text" id="Day11" 
        onChange={handleChange}
        value={formData.Day11 || ''} name="Day11" />
        {/** Add error message container here if needed */}
    </div>

    <div className="form-group-edit">
        <label htmlFor="Day12">12th Day:</label>
        <input type="text" id="Day12" 
        onChange={handleChange}
        value={formData.Day12  || ''} name="Day12" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edit">
        <label htmlFor="Day13">13th Day:</label>
        <input type="text" id="Day13" 
        onChange={handleChange}
        value={formData.Day13  || ''} name="Day13" />
        {/** Add error message container here if needed */}
        </div>
      
        <div className="form-group-edit">
        <label htmlFor="Day14">14th Day:</label>
        <input type="text" id="Day14" 
        onChange={handleChange}
        value={formData.Day14  || ''} name="Day14" />
        {/** Add error message container here if needed */}
        </div>
              
      <div className="form-group-edit">
        <label htmlFor="Week3">Week 3:</label>
        <input type="text" id="Week3" 
        onChange={handleChange}
        value={formData.Week3  || ''} name="Week3" />
        {/** Add error message container here if needed */}
      </div>

              
    <div className="form-group-edit">
        <label htmlFor="Week4">Week 4:</label>
        <input type="text" id="Week4" 
        onChange={handleChange}
        value={formData.Week4  || ''} name="Week4" />
        {/** Add error message container here if needed */}
      </div>
              

      <div className="form-group-edit">
        <label htmlFor="week5">Week 5:</label>
        <input type="text" id="week5" 
        onChange={handleChange}
        value={formData.week5 || ''} name="week5" />
        {/** Add error message container here if needed */}
              </div>
              
      <div className="form-group-edit">
        <label htmlFor="week6">Week 6:</label>
        <input type="text" id="week6" 
        onChange={handleChange}
        value={formData.week6  || ''} name="week6" />
        {/** Add error message container here if needed */}
              </div>
              
      <div className="form-group-edit">
        <label htmlFor="Week7">Week 7:</label>
        <input type="text" id="Week7" 
        onChange={handleChange}
        value={formData.Week7  || ''} name="Week7" />
        {/** Add error message container here if needed */}
      </div>

      </div>
      <div className="form-group-edit">
          <button type="submit">Save Changes</button>
      </div>
    </form>
        </div>
    </div>
    </div>
    
  )
}

export default EditDialogBox