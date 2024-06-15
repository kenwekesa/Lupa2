import React from 'react';

interface DeleteButtonProps {
  onDelete?: () => void;
  children: React.ReactNode;
}

function DeleteButton({ onDelete, children }: DeleteButtonProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <button onClick={handleDelete}>
      {children}
    </button>
  );
}

export default DeleteButton;


