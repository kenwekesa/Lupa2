'use client';

interface ContainerProps{
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
  return (
      <div className="container-children max-auto">
          {children}
      </div>
  )
}

export default Container