import { XCircle } from "lucide-react";
import React from "react";

type Props = {
  showModal: boolean;
  children: React.ReactNode;
  closeModal: () => void;
  title: string;
};

const Modal = ({ showModal, children, closeModal, title }: Props) => {
  return (
    showModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white capitalize">
                {title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
