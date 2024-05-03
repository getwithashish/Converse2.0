export const InstructionModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-0">
      <div className="rounded-lg bg-gray-950 p-6 text-center shadow-lg">
        <h2 className="mb-4 text-sm font-bold">Instructions</h2>
        <p className="mb-4 text-xs">
          <ol className="mt-4 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
            <li className="block rounded px-3 py-2 text-white">
              Ask questions related to the database connected to Converse
              DataSage.
            </li>
            <li className="block rounded px-3 py-2 text-white">
              Currently, Converse DataSage is linked to a database concerning
              cars.
            </li>
            <li className="block rounded px-3 py-2 text-white">
              The database contains the following tables:
              <ol>
                <li>
                  Car Brand - Includes brand names and their respective
                  countries.
                </li>
                <li>
                  Car Models - Lists model names along with their corresponding
                  brand names.
                </li>
                <li>Customer - Records customer names and their countries.</li>
                <li>
                  Sales - Provides details such as customer names, car models,
                  selling prices, and sale dates.
                </li>
              </ol>
            </li>
            <li className="block rounded px-3 py-2 text-white">
              Once a query related to the database data is given, the AI can
              provide corresponding answers.
            </li>
            <li className="block rounded px-3 py-2 text-white">
              <ol>
                Example queries:
                <li>What are the different car models?</li>
                <li>How many car brands are there?</li>
              </ol>
            </li>
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
