'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    id: string;
    label: string;
    options: Option[];
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    error: FieldErrors;
    style?: React.CSSProperties;
    className?: string;
    value: string[];
    onChange: (value: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    id,
    label,
    options,
    disabled,
    register,
    required,
    style,
    className,
    error,
    value,
    onChange
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value: optionValue } = e.target;
    const newValue = checked
      ? [...value, optionValue]
      : value.filter(v => v !== optionValue);
    onChange(newValue);
  };

  return (
    <div className="w-full relative">
        <div className="mb-2">
            <label className="text-sm text-gray-600">{label}</label>
        </div>
        {options.map((option) => (
            <div key={option.value} className="flex items-center mb-2">
                <input
                    id={`${id}-${option.value}`}
                    type="checkbox"
                    value={option.value}
                    checked={value.includes(option.value)}
                    disabled={disabled}
                    {...register(id, { required })}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor={`${id}-${option.value}`} className="ml-2 block text-sm text-gray-700">
                    {option.label}
                </label>
            </div>
        ))}
        {/* {error[id] && <span className="text-rose-500 text-sm">{error[id].message}</span>} */}
    </div>
  );
}

export default MultiSelect;
