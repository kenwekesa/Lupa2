'use client';

import { FiAlertCircle } from 'react-icons/fi'; // Import the desired icon from react-icons
import { IconType } from 'react-icons/lib';

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon?: IconType; // New property for the React icon component
}

const MainItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  icon: IconComponent, // Rename imageSrc to icon and use the imported icon component
}) => {
  return (
    <div
      onClick={onClick}
      className="px-2 py-3 cursor-pointer flex flex-row justify-between items-center gap-4 hover:underline transition font-semibold"
    >
      {label}
      {IconComponent && <IconComponent size={25} className="mr-2" />} {/* Display icon if provided */}
    </div>
  );
};

export default MainItem;
