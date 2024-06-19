'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    error: FieldErrors;
    style?: React.CSSProperties; // Making style attribute optional
    className?: string; // Making className attribute optional
}

const Textarea: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    register,
    required,
    style,
    className,
    error
}) => {
  return (
    <div className="w-full relative">
          {formatPrice && (
            <BiDollar
                size={24}
                className="text-neutral-700 absolute top-5 left-2"   
            />
          )} 
          <textarea
             id={id}
             disabled={disabled}
              {...register(id, { required })}
              placeholder=" "
             style={{ height: '20vh', ...style }} // Setting default height and allowing additional styles
             className={
                  `peer w-full p-2 pt-3 font-light bg-white border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${formatPrice ? 'pl-9' : 'pl-4'}
                  ${error[id] ? 'border-rose-500' : 'border-neutral-300'} ${error[id] ? 'focuse:border-rose-500' : 'focus:border-black'} ${className}`
             }
          />
          <label className={`
          absolute text-sm duration-150 transform -translate-y-3 top-4 z-10 origin-[0] ${formatPrice? 'left-9':'left-4'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${error[id] ? 'text-rose-500':'text-zinc-400'}`}>
              {label}
          </label>
    </div>
  )
}

export default Textarea;
