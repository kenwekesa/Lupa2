'use client'

import useTourModal from "@/app/hooks/useTourModel";
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../container/Heading"
import CategoryInput from "../Inputs/CategoryInput"
import { news } from "../navbar/NewCategories";
import CountrySelect from "../Inputs/CountrySelect"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import Counter from "../Inputs/Counter"
import ImageUpload from "../Inputs/ImageUpload"
import Input from "../Inputs/Input"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import useBlogModal from "@/app/hooks/useBlogModel";
import Modals from "./Modals";

enum STEPS {
    CATEGORY = 0,
    IMAGES = 1, 
    DESCRIPTION = 2,
    DESCRIPTION1 = 3,
    DESCRIPTION2 = 4,
    DESCRIPTION3 = 5,
    PRICE = 6
}

const BlogModal = () => {

    const blogModal = useBlogModal();
    const tourModal  = useTourModal()
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
            imageSrc: [],
            title: '',
            hotelLink: '',
            description: '', // not done
            subtitle: '',
            descriptionone: '',
            subtitleone: '',
            descriptiontwo: '',
            subtitletwo: '',
            descriptionthree: '',
            subtitlethree: '',
            descriptionfour: '',
            subtitlefour: '',
            descriptionfive: '',
            subtitlefive: '',
            descriptionsix: '', // not done

        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathRoomCount = watch('bathRoomCount');
    const imageSrc = watch('imageSrc'); // done
    const title = watch('title'); //done
    const description = watch('description'); //done
    const depStart = watch('depStart');
    const depEnd = watch('depEnd');

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
        
        axios.post('/api/blogs', data)
            .then(() => {
                toast.success('blog Created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                blogModal.onClose();
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
                title="Which of these best describe your venture?"
                subtitle="Pick a category"
            />
            <div className="
            grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {news.map((item) => (
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
                    style={{ height: '10vh', width: '100%' }}
                    className="p-0"
                />
                <hr />
                <Input
                    id="hotelLink"
                    label="Youtube link"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
            </div>
        )
    }

     if (step === STEPS.DESCRIPTION1) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="subtitle"
                    label="Subtitle"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="descriptionone"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    style={{ height: '10vh', width: '100%' }}
                    className="p-0"
                />
                <hr />
                <Input
                    id="subtitleone"
                    label="Subtitle"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="descriptiontwo"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    style={{ height: '10vh', width: '100%' }}
                    className="p-0"
                />
            </div>
        )
     }

     if (step === STEPS.DESCRIPTION2) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="subtitletwo"
                    label="Subtitle"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="descriptionthree"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    style={{ height: '10vh', width: '100%' }}
                    className="p-0"
                />
                <hr />
                <Input
                    id="subtitlethree"
                    label="Subtitle"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="descriptionfour"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    style={{ height: '10vh', width: '100%' }}
                    className="p-0"
                />
            </div>
        )
     }

    if (step === STEPS.DESCRIPTION3) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="subtitlefour"
                    label="Subtitle"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="descriptionfive"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    style={{ height: '10vh', width: '100%' }}
                    className="p-0"
                />
                <hr />
                <Input
                    id="subtitlefive"
                    label="Subtitle"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
                <hr />
                <Input
                    id="descriptionsix"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    style={{ height: '10vh', width: '100%' }}
                    className="p-0"
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
                {/* <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                /> */}
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', [...imageSrc,value])}
                />
            </div>
        )
    }


  return (
      <Modal
          title="Devanca Tours!"
          isOpen={blogModal.isOpen}
          onClose={blogModal.onClose}
          secondaryAction={step === STEPS.CATEGORY ? undefined: onBack}
          secondaryLabel={secondaryActionLabel}
          onSubmit={handleSubmit(onSubmit)}
          actionLabel={actionLabel}
          body={bodyContent}
      />
  )
}

export default BlogModal