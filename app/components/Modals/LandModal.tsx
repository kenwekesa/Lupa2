'use client';

import useTourModal from "@/app/hooks/useTourModel";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../container/Heading";
import CategoryInput from "../Inputs/CategoryInput";
import { offers } from "../navbar/OfferCategories";
import { lands } from "../navbar/LandCategories";
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
import useOfferModal from "@/app/hooks/useOfferModal";
import Modals from "./Modals";
import Lago from "../navbar/Lago";
import Models from "./Models";
import Textarea from "../Inputs/Textarea";
import useLandModal from "@/app/hooks/useLandModal";

enum STEPS {
    CATEGORY = 0,
    IMAGES = 1,
    MORE_IMAGES = 2,
    DESCRIPTION = 3,
    DESCRIPTION1 = 4,
    DESCRIPTION2 = 5,
    PRICE = 6
}

const LandModal = () => {

    const offerModal = useOfferModal();
    const tourModal = useTourModal();
    const landModal = useLandModal();
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
            category: '',
            size: '',
            covered_area: '',
            titleDeed: '',
            overview: '',
            type: '',
            deal:'',
            town: '',
            county: '',
            price : '',
            offerPrice: '',
            imageSrc: [],
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathRoomCount = watch('bathRoomCount');
    const imageSrc = watch('imageSrc');
    const title = watch('title');
    const description = watch('description');
    const depStart = watch('depStart');
    const depEnd = watch('depEnd');
    const type = watch('type');
    const deal = watch('deal');
    const inclusion = watch('inclusion');
    const subtitle = watch('subtitle');
    const titleDeed = watch('titleDeed');

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
        
        axios.post('/api/lands', data)
            .then(() => {
                toast.success('Land Created Successfully!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                landModal.onClose();
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
                title="Which category does your offer fall in?"
                subtitle="Choose the correct category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {lands.map((item) => (
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
                    title="How would you best describe this offer?"
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
                <Textarea
                    id="overview"
                    label="Provide precise overview"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    className="p-0"
                />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION1) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[80vh]">
                <Heading
                    title="Provide more details on the offer?"
                    subtitle="Provide the details below!"
                />
                <Input
                    id="size"
                    label="Provide land size?"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Select
                    id="type"
                    label="offer type"
                    options={[
                        { value: 'Available', label: 'Surveyers availabe' },
                        { value: 'Not available', label: 'Surveyers not available' },
                        // { value: 'One-time deal', label: 'One-time deal' },
                        // { value: 'Limited time deal', label: 'Limited time deal' },
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
                    id="titleDeed"
                    label="title deed"
                    options={[
                        { value: 'Available', label: 'Title deed' },
                        { value: 'Not Available', label: 'No title deed' },
                    ]}
                    value={titleDeed}
                    onChange={(value) => setCustomValue('titleDeed', value)}
                    disabled={isLoading}
                    register={register}
                    style={{ height: '8vh', width: '100%' }}
                    error={errors}
                />
                <hr />
                <Select
                    id="deal"
                    label="land deals"
                    options={[
                        { value: 'premium', label: 'Premium' },
                        { value: 'exclusive', label: 'Exclusive' },
                        { value: 'prime', label: 'Prime' },
                    ]}
                    value={deal}
                    onChange={(value) => setCustomValue('deal', value)}
                    disabled={isLoading}
                    register={register}
                    style={{ height: '8vh', width: '100%' }}
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
                    id="offerPrice"
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
                    title="Add the first photo of your offer"
                    subtitle="Show the clients the offer!"
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
                    title="Add more photos of your offer"
                    subtitle="Show the clients the offer!"
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
            isOpen={landModal.isOpen}
            onClose={landModal.onClose}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryLabel={secondaryActionLabel}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            body={bodyContent}
        />
    );
};

export default LandModal;

