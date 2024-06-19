'use client'

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../container/Button";
import Lago from "../navbar/Lago";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose()
        }, 300)
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction])

    if (!isOpen) {
        return null;
    }

  return (
    <>
      <button onClick={handleClose} className="p-1 border-[1px] border-neutral-300 rounded-lg hover:opacity-70 transition fixed top-4 right-4 z-50">
        <IoMdClose size={18} />
      </button>
      <div className="items-center flex overflow-x-hidden justify-center overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none bg-white modal-main">
        <div className="relative w-full md:w-4/6 lg:w-[400px] xl:w-[400px]  my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* Content */}
          <div className={`translate border-[1px] border-solid border-neutral-300 rounded-lg duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none modal-main-content">
              {/* Header */}
              <div className="flex items-center px-6 py-3 rounded-t justify-center relative border-b-[0.001px]">
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              {/* Body */}
              <div className="relative px-6 py-3 flex-auto">
                {body}
              </div>
              {/* Footer */}
              <div className="flex flex-col gap-2 px-6 pb-3">
                <div className="flex flex-col gap-4 w-full">
                  <div className="modal-main-button flex flex-row justify-between gap-4">
                    {secondaryAction && secondaryLabel && (
                      <p className="text-neutral-800 flex items-center w-full justify-center hover:bg-neutral-100 border-[1px] border-solid border-neutral-300 rounded-lg px-5 py-[6px] text-sm hover:shadow-md cursor-pointer" onClick={handleSecondaryAction}>Submit</p>
                    )}
                    <p className="text-neutral-800 flex items-center w-full justify-center hover:bg-neutral-100 border-[1px] border-solid border-neutral-300 rounded-lg px-5 py-[6px] text-sm hover:shadow-md cursor-pointer" onClick={handleSubmit}>Submit</p>
                  </div>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;
