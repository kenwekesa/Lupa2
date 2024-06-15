'use client'

import useRentModal from "@/app/hooks/useRentModals"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../container/Heading"
import CategoryInput from "../Inputs/CategoryInput"
import { categories } from "../navbar/Categories"
import CountrySelect from "../Inputs/CountrySelect"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import Counter from "../Inputs/Counter"
import ImageUpload from "../Inputs/ImageUpload"
import Input from "../Inputs/Input"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
 
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3, 
    DESCRIPTION = 4,
    DESCRIPTION1 = 5,
    // DESCRIPTION2 = 6,
    DESCRIPTION3 = 6,
    DESCRIPTION4 = 7,
    DESCRIPTION5 = 8,
    PRICE = 9
}

const RentModal = () => {
    const rentModal = useRentModal();
    const router = useRouter()
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathRoomCount: 1,
            imageSrc: [],
            price: 1,
            city: '',
            save: 1,
            cohostName: '',
            hostContact: '',
            oneBedroom:  '',
            twoBedroom: '',
            threebedRoom: '',
            commonPlace: '',
            hostName: '',
            house: '',
            country: '',
            continent: '',
            hotel: '',
            hotelLink: '',
            startDate: '',
            endDate: '',
            distance: '',
            offers: '',
            overView: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathRoomCount = watch('bathRoomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../container/Map'), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }

        return 'Next'
    }, [step]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true)
        
        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing Created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            }).catch(() => {
                toast.error('Something went wrong');
            }).finally(() => {
                setIsLoading(false);
        })
    }

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    // the body of the modal

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describe your place?"
                subtitle="Pick a category"
            />
            <div className="
            grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
                <div key={item.label} className="col-span-1">
                    <CategoryInput
                        onClick={(category) => setCustomValue(
                            'category', category
                        )}
                        selected={category === item.label}
                        label={item.label}
                        icon={item.icon}
                    />
               </div> 
            ))} 
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathRoomCount}
                    onChange={(value) => setCustomValue('bathRoomCount', value)}
                />
                
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add 4 photos of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', [...imageSrc,value])}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="city"
                    label="City or town of location"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION1) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Choose one, enter house or hotel!"
                />
                <Input
                    id="house"
                    label="house(strictly small letters)"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="hotel"
                    label="hotel(strictly small letters)"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                 <hr />
                <Input
                    id="hotelLink"
                    label="Hotel or House Link"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
            </div>
        )
    }

    
    // if (step === STEPS.DESCRIPTION2) {
    //     bodyContent = (
    //         <div className="flex flex-col gap-8">
    //             <Heading
    //                 title="How would you describe your place?"
    //                 subtitle="Short and sweet works best!"
    //             />
    //             <Input
    //                 id="startDate"
    //                 label="Start Date when the facility is free"
    //                 disabled={isLoading}
    //                 register={register}
    //                 error={errors}
    //                 required
    //             />
    //             <hr />
    //             <Input
    //                 id="endDate"
    //                 label="End Date when the facility is free"
    //                 disabled={isLoading}
    //                 register={register}
    //                 error={errors}
    //                 required
    //             />
    //             <hr />
    //             <Input
    //                 id="distance"
    //                 label="Approximate the distance from the city"
    //                 disabled={isLoading}
    //                 register={register}
    //                 error={errors}
    //                 required
    //             />
    //         </div>
    //     )
    // }

    if (step === STEPS.DESCRIPTION3) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
              
                <Input
                    id="oneBedroom"
                    label="How many one bedrooms"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="twoBedroom"
                    label="How many two bedrooms"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="threebedRoom"
                    label="How many three bedrooms"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="commonPlace"
                    label="How many common places such as sofa bed"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
            </div>
        )
    }

     if (step === STEPS.DESCRIPTION4) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="hostName"
                    label="Host Name"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="cohostName"
                    label="Co-host Name"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="hostContact"
                    label="List of host contacts"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="offers"
                    label="What else does your place offer!"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
            </div>
        )
     }
    
     if (step === STEPS.DESCRIPTION5) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="country"
                    label="Host country(strictly small letters)"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="continent"
                    label="Host continent(strictly small letters)"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
               <hr />
                <Input
                    id="save"
                    label="Save"
                    type="number"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
            </div>
        )
    }

  return (
      <Modal
          title="Devanca Hotels and House Listing!"
          isOpen={rentModal.isOpen}
          onClose={rentModal.onClose}
          secondaryAction={step === STEPS.CATEGORY ? undefined: onBack}
          secondaryLabel={secondaryActionLabel}
          onSubmit={handleSubmit(onSubmit)}
          actionLabel={actionLabel}
          body={bodyContent}
      />
  )
}

export default RentModal