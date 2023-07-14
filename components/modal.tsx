import React from "react";

export const Modal = ({
  isOpen,
  setOpen,
  error,
}: {
  isOpen: boolean;
  setOpen: (close: boolean) => void;
  error: string;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-opacity-50 bg-gray-900">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {error ? (
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-red-800 w-16 h-16"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.955 2.117h-.114C9.732 1.535 6.941.5 4.356.5c-1.4 0-1.592.526-1.879 1.316l-2.355 7A2 2 0 0 0 2 11.5h3.956L4.4 16a1.779 1.779 0 0 0 3.332 1.061 24.8 24.8 0 0 1 4.226-5.36l-.003-9.584ZM15 11h2a1 1 0 0 0 1-1V2a2 2 0 1 0-4 0v8a1 1 0 0 0 1 1Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Whoops! Something went wrong. Please try again later.
                </h3>
              </div>
            ) : (
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-16 h-16"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Your subscription has been confirmed. Welcome aboard!
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
