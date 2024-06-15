import { IconType } from 'react-icons/lib';

interface MenuItemProps {
  label: string;
  icon?: IconType; // New property for the React icon component
}

const CardDisplay: React.FC<MenuItemProps> = ({
  label,
  icon: IconComponent, // Rename imageSrc to icon and use the imported icon component
}) => {
  return (
    <div
      className="display-card text-center items-center"
      >
      <div className='p-3 bg-white rounded-full text-neutral-500'>
        {IconComponent && <IconComponent size={25} />} {/* Display icon if provided */}
          </div>
      <div className='text-black font-semibold text-sm'>
      {label}
     </div>
    </div>
  );
};

export default CardDisplay;