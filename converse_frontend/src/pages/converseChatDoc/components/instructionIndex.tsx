export const InstructionModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-0">
        <div className="rounded-lg bg-gray-950 p-6 text-center shadow-lg">
          <h2 className="mb-4 text-sm font-bold">Instructions</h2>
          <p className="mb-4 text-xs">
            <ol className="mt-4 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
              <li className="block rounded px-3 py-2 text-white">
              On the navigation bar, you will find an option labeled "Upload Document."
              </li>
              <li className="block rounded px-3 py-2 text-white">
              Select this option and then choose a PDF file to upload.
              </li>
              <li className="block rounded px-3 py-2 text-white">
              After selecting the PDF file, click the "Upload" button.
              </li>
              <li className="block rounded px-3 py-2 text-white">
              Once the upload is successful, a message will be displayed. At this point, you can proceed to ask any questions about the document.</li>
            </ol>
          </p>
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-xs text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  