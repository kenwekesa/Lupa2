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
import Lago from "../navbar/Lago"
import Select from "../Inputs/Select"
import MultiSelect from "../Inputs/MultiSelect"
import Models from "./Models"
import Textarea from "../Inputs/Textarea"

enum STEPS {
    CATEGORY = 0,
    DESCRIPTION = 1,
    INFO = 2,
    INFOS = 3,
    IMAGES = 4,
    MORE_IMAGES = 5,
    DESCRIPTION2 = 6,
    DESCRIPTION1 = 7,
    DESCRIPTION3 = 8,
    HOST_IMAGE = 9,
    DESCRIPTION4 = 10,
    DESCRIPTION5 = 11,
    PRICE = 12
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
            title: '',
            category: '',
            bedcount: 1,
            bedroomCount: 1,
            ratings: 5,
            type: '',
            hostExperience: '',
            county: '',
            town: '',
            funActivities: [],
            meals: [],          
            bedroom: [],
            beds: [],
            bedPhotos: [],
            offers: '',
            hostPhoto: '',
            childrenCount: 1,
            offerPrice: 1,
            hostName: '',
            verified: '',
            joinDate: '',
            hostType: '',
            hostEmail: '',
            hostContact: '',
            distance: '',
            overView: '',
            guestCount: 1,
            roomCount: 1,
            bathRoomCount: 1,
            imageSrc: [],
            price: 1,
            hotelLink: '',
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathRoomCount = watch('bathRoomCount');
    const imageSrc = watch('imageSrc');
    const childrenCount = watch('childrenCount');
    const bedcount = watch('bedcount');
    const bedroomCount = watch('bedroomCount');
    const ratings = watch('ratings');
    const offers = watch('offers');
    const hostPhoto = watch('hostPhoto');
    const verified = watch('verified');
    const bedroom = watch('bedroom');
    const beds = watch('beds');
    const bedPhotos = watch('bedPhotos');
    const type = watch('type');
    const hostType = watch('hostType');
    const funActivities = watch('funActivities');
    const meals = watch('meals');


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

        axios.post('/api/stays', data)
            .then(() => {
                toast.success('Your stay has been created successfully!');
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
                title="Which of these best describe the stay?"
                subtitle="choose the stay category"
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

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[50vh] overflow-y-auto">
                <Heading
                    title="Provide key info about the stay?"
                    subtitle="Enter the following details!"
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
                <Textarea
                    id="overView"
                    label="Indepth overview of the stay"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Select
                    id="type"
                    label="stay type?"
                    options={[
                        { value: 'premium', label: 'Top premium' },
                        // { value: 'exclusive', label: 'Exclusive' },
                        { value: 'luxurious', label: 'Luxurious' },
                        // { value: 'prime', label: 'Prime unique' },
                        { value: 'comfortable', label: 'Comfortable' },
                    ]}
                    value={type}
                    onChange={(value) => setCustomValue('type', value)}
                    disabled={isLoading}
                    register={register}
                    style={{ height: '7vh', width: '100%' }}
                    error={errors}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[56vh] overflow-y-auto">
                <Heading
                    title="Provide more basics about your stay"
                    subtitle="Provide the details below?"
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
                <hr />
                <Counter
                    title="Children"
                    subtitle="How many children do you allow?"
                    value={childrenCount}
                    onChange={(value) => setCustomValue('childrenCount', value)}
                />

            </div>
        )
    }

    if (step === STEPS.INFOS) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[56vh] overflow-y-auto">
                <Heading
                    title="Provide additional basics about your stay"
                    subtitle="Provide the details below?"
                />
                <Counter
                    title="Beds"
                    subtitle="How beds to you have?"
                    value={bedcount}
                    onChange={(value) => setCustomValue('bedcount', value)}
                />
                <hr />
                <Counter
                    title="Beds"
                    subtitle="How many bed room do you have?"
                    value={bedroomCount}
                    onChange={(value) => setCustomValue('bedroomCount', value)}
                />
                <hr />
                <Counter
                    title="Rating"
                    subtitle="Initial stay ratings?"
                    value={ratings}
                    onChange={(value) => setCustomValue('ratings', value)}
                />

            </div>
        )
    }


    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add the first photo of your stay!"
                    subtitle="Show the clients the stay!"
                />
                <ImageUpload
                    value={imageSrc[0] || ''}
                    onChange={(value) => setCustomValue('imageSrc', [value])}
                />
            </div>
        );
    }

    if (step === STEPS.MORE_IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add more photos of your stay"
                    subtitle="Show the clients the stay!"
                />
                <ImageUpload
                    value={imageSrc.slice(1)}
                    onChange={(value) => setCustomValue('imageSrc', [...imageSrc, value])}
                />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION1) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Wher is the stay located?"
                    subtitle="Enter the details below!"
                />
                <Input
                    id="county"
                    label="County location"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="town"
                    label="Town location"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="hotelLink"
                    label="stay youtube link"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
            </div>
        )
    }


    if (step === STEPS.DESCRIPTION2) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[56vh] overflow-y-auto">
                <Heading
                    title="Privide more details of the stay?"
                    subtitle="Enter details above!"
                />
                <Input
                    id="distance"
                    label="Approximate the distance from the town"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <MultiSelect
                    id="offers"
                    label="What is included in the offer"
                    options={[
                        { value: 'Kitchen', label: 'Kitchen' },
                        { value: 'WiFi', label: 'WiFi' },
                        { value: 'Free parking space', label: 'Free parking space' },
                        { value: 'Pets allowed', label: 'Pets allowed' },
                        { value: 'Washer', label: 'Washer' },
                        { value: 'Dedicated workspace', label: 'Dedicated workspace' },
                        { value: 'Spacious working place', label: 'Spacious working place' },
                        { value: 'Bathin tab', label: 'Bathing tab' },
                        { value: 'Valley view', label: 'Valley view' },
                        { value: 'Hot water', label: 'Hot water' },
                        { value: 'Iron', label: 'Iron' },
                        { value: 'Bed linens', label: 'Bed linens' },
                        { value: 'Hangers', label: 'Hangers' },
                        { value: 'Refrigerator', label: 'Refrigerator' },
                        { value: 'Microwave', label: 'Microwave' },
                        { value: 'Oven', label: 'Oven' },
                        { value: 'Coffee maker', label: 'Coffee maker' },
                        { value: 'Gas store', label: 'Gas store' },
                        { value: 'Fire pit', label: 'Fire pit' },
                        { value: 'Outdoor furniture', label: 'Outdoor furniture' },
                        { value: 'Private patio or balcony', label: 'Private patio or balcony' },
                        { value: 'Outdoor dining area', label: 'Outdoor dining area' },
                        { value: 'Free parking on premises', label: 'Free parking on premises' },
                        { value: 'TV', label: 'TV' },
                        { value: 'Dryer', label: 'Dryer' },
                        { value: 'Air Conditioning', label: 'Air Conditioning' },
                        { value: 'Heating', label: 'Heating' },
                        { value: 'Swimming pool', label: 'Swimming pool' },
                        { value: 'Smart Lock', label: 'Smart Lock' },
                        { value: 'Self check-in', label: 'Self check-in' },
                        { value: 'Backyard', label: 'Backyard' },
                        { value: 'Smooking allowed', label: 'Smooking allowed' },
                    ]}
                    value={offers}
                    onChange={(value) => setCustomValue('offers', value)}
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <MultiSelect
                    id="funActivities"
                    label="What fun activities do you have at the facility?"
                    options={[
                        { value: 'Beach', label: 'Beach' },
                        { value: 'Diving', label: 'Diving' },
                        { value: 'Water park', label: 'Water park' },
                        { value: 'Gulf park', label: 'Gulf park' },
                        { value: 'Private beach area', label: 'Private beach area' },
                        { value: 'No fun activity', label: 'No fun activity' },
                    ]}
                    value={funActivities}
                    onChange={(value) => setCustomValue('funActivities', value)}
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <MultiSelect
                    id="meals"
                    label="What meals to you serve at the facility?"
                    options={[
                        { value: 'Kitchen facility', label: 'Kitchen facility' },
                        { value: 'Breakfast included', label: 'Breakfast included' },
                        { value: 'All inclusive', label: 'All inclusive' },
                        { value: 'Breakfast and lunch included', label: 'Breakfast and lunch included' },
                        { value: 'Breakfast and Supper included', label: 'Breakfast and Supper included' },
                        { value: 'No meals included', label: 'No meals included' },
                    ]}
                    value={meals}
                    onChange={(value) => setCustomValue('meals', value)}
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION3) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[56vh] overflow-y-auto">
                <Heading
                    title="How would you describe your bedrooms?"
                    subtitle="Info of bed and bedrooms!"
                />
                <MultiSelect
                    id="beds"
                    label="Types of beds in the stay"
                    options={[
                        { value: 'King bed', label: 'King bed' },
                        { value: 'Queen bed', label: 'Queen bed' },
                        { value: 'Double bed', label: 'Double bed' },
                        { value: 'Twin bed', label: 'Twin bed' },
                        { value: 'California King bed', label: 'California King bed' },
                    ]}
                    value={beds}
                    onChange={(value) => setCustomValue('beds', value)}
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <MultiSelect
                    id="bedroom"
                    label="Types of bedrooms in the stay"
                    options={[
                        { value: 'Standard Room', label: 'Standard Room' },
                        { value: 'One-Bedroom Suite', label: 'One-Bedroom Suite' },
                        { value: 'Two-Bedroom Suite', label: 'Two-Bedroom Suite' },
                        { value: 'Deluxe Room', label: 'Deluxe Room' },
                        { value: 'Family Room', label: 'Family Room' },
                        { value: 'Executive Room', label: 'Executive Room' },
                    ]}
                    value={bedroom}
                    onChange={(value) => setCustomValue('bedroom', value)}
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Heading
                    title=""
                    subtitle="Add the images of the bedroom!"
                />
                <ImageUpload
                value={bedPhotos.slice(0, 2)}
                onChange={(value) => {
                    if (bedPhotos.length < 2) {
                        setCustomValue('bedPhotos', [...bedPhotos.slice(0, 2), value]);
                    } else {
                        alert("You can only upload up to two images.");
                    }
                }}
            />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION4) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[50vh] overflow-y-auto">
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
                    id="hostEmail"
                    label="host Email"
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
                    id="joinDate"
                    label="When did the host join!"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Select
                    id="verified"
                    label="host verified?"
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                    ]}
                    value={verified}
                    onChange={(value) => setCustomValue('verified', value)}
                    disabled={isLoading}
                    register={register}
                    style={{ height: '7vh', width: '100%' }}
                    error={errors}
                />
                <hr />
                <hr />
                <Select
                    id="hostType"
                    label="host type?"
                    options={[
                        { value: 'Individual Hosts', label: 'Individual Hosts' },
                        { value: 'Family Hosts', label: 'Family Hosts' },
                        { value: 'Couple Hosts', label: 'Couple Hosts' },
                        { value: 'Property Managers', label: 'Property Managers' },
                        { value: 'Bed and Breakfast Hosts', label: 'Bed and Breakfast Hosts' },
                        { value: 'Vacation Rental Hosts', label: 'Vacation Rental Hosts' },
                        { value: 'Professional Co-Hosts', label: 'Professional Co-Hosts' },
                        { value: 'Professional Hosts', label: 'Professional Hosts' },
                        { value: 'Individual Hosts', label: 'Individual Hosts' },
                        { value: 'Family Hosts', label: 'Family Hosts' },
                    ]}
                    value={hostType}
                    onChange={(value) => setCustomValue('hostType', value)}
                    disabled={isLoading}
                    register={register}
                    style={{ height: '7vh', width: '100%' }}
                    error={errors}
                />
                <hr />
                <Textarea
                    id="hostExperience"
                    label="Incidate the host experience!"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.HOST_IMAGE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add the host image"
                    subtitle="Show the clients the host!"
                />
                <ImageUpload
                    value={hostPhoto || ''}
                    onChange={(value) => setCustomValue('hostPhoto', value)}
                />
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="What is the cost of the stay"
                    subtitle="charge per night?"
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
                    id="offerPrice"
                    label="Offer Price (Optional)"
                    type="number"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
            </div>
        )
    }

    return (
        <Models
            title={<Lago />}
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryLabel={secondaryActionLabel}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            body={bodyContent}
        />
    )
}

export default RentModal