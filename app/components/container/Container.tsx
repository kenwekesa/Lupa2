'use client';

interface ContainerProps{
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
  return (
      <div className="max-w-[2520px] 2xl:px-40 xl:px-40 md:px-20 sm:px-2 px-4 max-auto">
          {children}
      </div>
  )
}

export default Container