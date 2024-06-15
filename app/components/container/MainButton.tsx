'use client'

import { IconType } from "react-icons";

interface ButtonProps{
    label: string;
    onClick: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}
const MainButton: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
  return (
      <button
          onClick={onClick}
          disabled={disabled}
          className={`btn-main outline-main-btn relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition items-center ${small ? 'py-1' : 'py-2'} ${small ? 'text-sm' : 'text-md'} ${small ? 'font-light' : 'font-semibold'}`}>
          {Icon && (
              <Icon
                size={24}
                className="absolute left-4 top-3"
              />
          )}
          {label}
      </button>
  )
}

export default MainButton