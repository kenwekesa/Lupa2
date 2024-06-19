'use client'

import useCountyModal from "@/app/hooks/useCountyModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../container/Heading"
import CategoryInput from "../Inputs/CategoryInput"
import { counties } from "../navbar/CountyCategories"
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
    PRICE = 1,
}

const CountyModal = () => {
    const countyModal = useCountyModal();
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
            county:'',
            category: '',
            imageSrc: '',
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathRoomCount = watch('bathRoomCount');
    const imageSrc = watch('imageSrc');
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

        axios.post('/api/county', data)
            .then(() => {
                toast.success('County has been created successfully!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                countyModal.onClose();
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
                title="Which of these best describe the county"
                subtitle="choose the stay category"
            />
            <div className="
            grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {counties.map((item) => (
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

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8 max-h-[50vh] overflow-y-auto">
                <Heading
                    title="Provide key info about the stay?"
                    subtitle="Enter the following details!"
                />
                <Input
                    id="county"
                    label="County"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <ImageUpload
                    value={imageSrc || ''}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    return (
        <Models
            title={<Lago />}
            isOpen={countyModal.isOpen}
            onClose={countyModal.onClose}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryLabel={secondaryActionLabel}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            body={bodyContent}
        />
    )
}

export default CountyModal