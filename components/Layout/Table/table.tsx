import React, { useState } from "react";

interface TableProps {
  headers: string[]; // Array of header titles
  data: any[]; // Array of data objects
  searchable?: boolean; // Optional prop to enable search feature
  itemsPerPage?: number; // Optional prop to set items per page for pagination
  renderContent?: (item: any) => JSX.Element; // Optional function to render custom content for table rows
  tableName?: string;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  tableName,
  searchable = false,
  itemsPerPage = 10,
  renderContent,
}) => {
  console.log("data", data);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle search input change
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Perform the search on data based on the search term
  const filteredData = searchable
    ? data.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : data;
  console.log("filter", filteredData);

  // Calculate the pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  console.log("pagination", paginatedData);

  return (
    <div className=" container w-full  md:w-full relative overflow-x-auto shadow-md sm:rounded-lg bg-white rounded-md border border-gray-200 p-4 ">
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-800 spacing-2 tracking-wide">
            {tableName}
          </p>
        </div>
        {searchable && (
          <div className="md:w-[300px] w-full mb-4 ">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="relative m-0 inline-block w-[1%] min-w-[225px] flex-auto rounded border border-solid border-gray-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition duration-300 ease-in-out focus:border-primary-600 focus:text-gray-700 focus:shadow-te-primary focus:outline-none dark:text-gray-200 dark:placeholder:text-gray-200"
              placeholder="Search Product..."
            />
          </div>
        )}
      </div>
      <table className="w-full md:w-[1300px] text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white bg-blue-500 dark:bg-gray-700">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              }`}
            >
              {console.log("item", item)}
              {renderContent
                ? renderContent(item)
                : // Default rendering if renderContent is not provided
                  Object.values(item).map((value, idx) => (
                    <td key={idx} className="px-6 py-4">
                      {value}
                    </td>
                  ))}
            </tr>
          ))}
        </tbody>
      </table>
      {filteredData.length === 0 && (
        <p className="p-4 text-center">No matching data found.</p>
      )}
      {totalPages > 1 && (
        <div className="p-4">
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  className={`px-3 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Table;
