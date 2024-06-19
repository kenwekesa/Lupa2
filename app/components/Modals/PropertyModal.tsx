'use client';

import useTourModal from "@/app/hooks/useTourModel";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../container/Heading";
import CategoryInput from "../Inputs/CategoryInput";
import { properties } from "../navbar/PropertyCategories";
import CountrySelect from "../Inputs/CountrySelect";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import MultiSelect from "../Inputs/MultiSelect"; // Import the MultiSelect component
import Select from "../Inputs/Select"; // Import the MultiSelect component
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import usePropertyModal from "@/app/hooks/usePropertyModal";
import Modals from "./Modals";
import Lago from "../navbar/Lago";
import Models from "./Models";
import Textarea from "../Inputs/Textarea";

enum STEPS {
    CATEGORY = 0,
    IMAGES = 1,
    INFO = 2,
    MORE_IMAGES = 3,
    DESCRIPTION = 4,
    DESCRIPTION1 = 5,
    DESCRIPTION2 = 6,
    PRICE = 7
}

const PropertyModal = () => {

    const propertyModal = usePropertyModal();
    const tourModal  = useTourModal();
    const router = useRouter();
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
            roomCount: 1,
            bathRoomCount: 1,
            bedRoomCount: 1,
            toiletCount: 1,
            county: '',
            category: '',
            town: '',
            deal: '',
            size: '',
            imageSrc: [],
            availability: '',
            type: '',
            parking_space: '',
            price: 1,
            offerPrice: 1,
            amenities: [],
            overview: '',
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathRoomCount = watch('bathRoomCount');
    const imageSrc = watch('imageSrc');
    const bedRoomCount = watch('bedRoomCount');
    const title = watch('title');
    const toiletCount = watch('toiletCount');
    const description = watch('description');
    const depStart = watch('depStart');
    const depEnd = watch('depEnd');
    const type = watch('type');
    const inclusion = watch('inclusion');
    const subtitle = watch('subtitle');
    const amenities = watch('amenities');
    const availability = watch('availability');
    const deal = watch('deal');

    const Map = useMemo(() => dynamic(() => import('../container/Map'), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        if (step !== STEPS.PRICE) {
            setStep((value) => value + 1);
        }
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return isLoading ? 'Submitting...' : 'Create';
        }

        return 'Next';
    }, [step, isLoading]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);
        
        axios.post('/api/property', data)
            .then(() => {
                toast.success('Property Created Successfully!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                propertyModal.onClose();
            }).catch(() => {
                toast.error('Something went wrong');
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which category does the property falls in?"
                subtitle="Choose the correct category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {properties.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[65vh] overflow-y-auto">
                <Heading
                    title="How would you best describe this Property?"
                    subtitle="Provide the following details!"
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
                    id="county"
                    label="County"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="town"
                    label="Town"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Select
                    id="type"
                    label="property type"
                    options={[
                        { value: 'sale', label: 'Property sale' },
                        { value: 'rental', label: 'Property rental' },
                    ]}
                    value={type}
                    onChange={(value) => setCustomValue('type', value)}
                    disabled={isLoading}
                    register={register}
                    style={{ height: '8vh', width: '100%' }}
                    error={errors}
                />
                <hr />
                <Select
                    id="deal"
                    label="property deal"
                    options={[
                        { value: 'premium', label: 'Premium' },
                        { value: 'affordable', label: 'Affordable' },
                        { value: 'trending', label: 'Exclusive' },
                    ]}
                    value={deal}
                    onChange={(value) => setCustomValue('deal', value)}
                    disabled={isLoading}
                    register={register}
                    style={{ height: '8vh', width: '100%' }}
                    error={errors}
                />
                <hr />
                <MultiSelect
                    id="amenities"
                    label="What are the amenities included"
                    options={[
                        { value: 'Ample parking', label: 'Ample parking' },
                        { value: 'Well manicured garden', label: 'Well manicured garden' },
                        { value: 'Kids play area', label: 'Kids play area' },
                        { value: 'Pantry', label: 'Pantry' },
                        { value: 'Laundary area', label: 'Laundary area' },
                        { value: '24/7 Security', label: '24/7 Security' },
                        { value: 'CCTv', label: 'CCTv' },
                        { value: 'Swimming Pool', label: 'Swimming Pool' },
                        { value: 'Fitness Center', label: 'Fitness Center' },
                        { value: 'Playground', label: 'Playground' },
                        { value: 'Clubhouse', label: 'Clubhouse' },
                        { value: 'High-Speed Internet', label: 'High-Speed Internet' },
                        { value: 'Pet-Friendly Facilities', label: 'Pet-Friendly Facilities' },
                        { value: 'Walking Trails', label: 'Walking Trails' },
                        { value: 'Balcony/Patio', label: 'Balcony/Patio' },
                        { value: 'Storage Units', label: 'Storage Units' },
                        { value: 'Rooftop Deck', label: 'Rooftop Deck' },
                        { value: 'Smart Home Features', label: 'Smart Home Features' },
                    ]}
                    value={amenities}
                    onChange={(value) => setCustomValue('amenities', value)}
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[65vh] overflow-y-auto">
                <Heading
                    title="Provide more basics about the property"
                    subtitle="Provide the details below?"
                />
                <Counter
                    title="bed Rooms"
                    subtitle="Number of bed rooms?"
                    value={bedRoomCount}
                    onChange={(value) => setCustomValue('bedRoomCount', value)}
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
                    title="Washrooms"
                    subtitle="How many washrooms do you have?"
                    value={toiletCount}
                    onChange={(value) => setCustomValue('toiletCount', value)}
                />

            </div>
        )
    }

    if (step === STEPS.DESCRIPTION1) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[65vh] overflow-y-auto">
                <Heading
                    title="Provide more details on the offer?"
                    subtitle="Provide the details below!"
                />
                <Input
                    id="size"
                    label="What is the size of the property?"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Select
                    id="availability"
                    label="property availability"
                    options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                        // { value: 'One-time deal', label: 'One-time deal' },
                        // { value: 'Limited time deal', label: 'Limited time deal' },
                    ]}
                    value={availability}
                    onChange={(value) => setCustomValue('availability', value)}
                    disabled={isLoading}
                    register={register}
                    style={{ height: '8vh', width: '100%' }}
                    error={errors}
                />
                <hr />
                <Input
                    id="parking_space"
                    label="Indicate the parking space?"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Textarea
                    id="overview"
                    label="Provide overview?"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION2) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How much does this offer cost?"
                    subtitle="Provide the offer prices!"
                />
                <Input
                    id="price"
                    label="Initial price"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="offerprice"
                    label="Offer price"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    // style={{ height: '10vh', width: '100%' }}
                    className="p-0"
                />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add the first photo of the property"
                    subtitle="Show the clients the property!"
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
                    title="Add more photos of the property"
                    subtitle="Show the clients the property!"
                /> 
                <ImageUpload
                    value={imageSrc.slice(1)}
                    onChange={(value) => setCustomValue('imageSrc', [...imageSrc, value])}
                />
            </div>
        );
    }

    return (
        <Models
            title={<Lago />}
            isOpen={propertyModal.isOpen}
            onClose={propertyModal.onClose}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryLabel={secondaryActionLabel}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            body={bodyContent}
        />
    );
};

export default PropertyModal;

