import { Recepient } from './recepients.hooks';

export default function ListRecepients() {
  return (
    <div>

      <div className=" overflow-x-auto shadow-md">
        <div className="pb-4 flex flex-row justify-end bg-regal-blue p-3">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className=" mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z-index"/>
              </svg>
            </div>
            <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:outline-none" placeholder="Search for Recepients" />
          </div>
        </div>
        <div className="max-h-[450px] overflow-y-scroll">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                        No
                </th>
                <th scope="col" className="px-6 py-3">
                        Name
                </th>
                <th scope="col" className="px-6 py-3">
                        Phone
                </th>
                <th scope="col" className="px-6 py-3">
                        Group
                </th>
                <th scope="col" className="px-6 py-3">
                        Created At
                </th>
                <th scope="col" className="px-6 py-3">
                        Action
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                index="1"
                name="Mugisha Eddy"
                phone="0781732598"
                group="Edd ENvs"
                createdAt="01/07/20237"

              />
              <TableRow
                index="1"
                name="Mugisha Eddy"
                phone="0781732598"
                group="Edd ENvs"
                createdAt="01/07/20237"

              />

              <TableRow
                index="1"
                name="Mugisha Eddy"
                phone="0781732598"
                group="Edd ENvs"
                createdAt="01/07/20237"

              />
              <TableRow
                index="1"
                name="Mugisha Eddy"
                phone="0781732598"
                group="Edd ENvs"
                createdAt="01/07/20237"

              />
              <TableRow
                index="1"
                name="Mugisha Eddy"
                phone="0781732598"
                group="Edd ENvs"
                createdAt="01/07/20237"

              />
              <TableRow
                index="1"
                name="Mugisha Eddy"
                phone="0781732598"
                group="Edd ENvs"
                createdAt="01/07/20237"

              />
              <TableRow
                index="1"
                name="Mugisha Eddy"
                phone="0781732598"
                group="Edd ENvs"
                createdAt="01/07/20237"

              />
              <TableRow
                index="1"
                name="Mugisha Eddy"
                phone="0781732598"
                group="Edd ENvs"
                createdAt="01/07/20237"

              />
              <TableRow
                index="1"
                name="Mugisha Eddy"
                phone="0781732598"
                group="Edd ENvs"
                createdAt="01/07/20237"

              />

            </tbody>
          </table>
        </div>
        <div className="p-5 bg-regal-blue w-full bottom-0">
        </div>
      </div>

    </div>
  );
}

function TableRow({ index, name, phone, group, createdAt } : Recepient) {
  return (
    <tr className="bg-white border-b  hover:bg-gray-50 ">
      <td className="px-6 py-4 text-black">
        {index}
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {name}
      </th>
      <td className="px-6 py-4 text-black">
        {phone}
      </td>
      <td className="px-6 py-4 text-black">
        {group}
      </td>
      <td className="px-6 py-4 text-black">
        {createdAt}
      </td>
      <td className="px-6 py-4">
        <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
      </td>
    </tr>
  );
}