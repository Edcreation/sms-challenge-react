import { Groups } from './recepients.hooks';

export default function ListRecipients() {
  return (
    <div className='p-2'>

      <div className=" overflow-x-auto border shadow-lg  mb-20">
        <div className="pb-4 flex flex-row bg-white border-b-2 justify-between shadow-md p-3 items-center">
          <div className="text-xl font-semibold">Recipient Groups</div>
          <div className="flex flex-row items-center justify-center">
            <button className="p-1 px-2 mt-1 rounded-md mr-3 bg-slate-100 border"><i className="fa fa-filter" aria-hidden="true"></i></button>
            <div className=" mt-1">
              <div className=" flex items-center pl-3 border overflow-hidden bg-gray-50 rounded-md">
                <div className="px-2">
                  <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z-index"/>
                  </svg>
                </div>
                <input type="text" id="table-search" className="block p-2 text-sm text-gray-900  w-full  focus:outline-none" placeholder="Search for recipientss" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-h-[600px] overflow-y-scroll">
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
                        Description
                </th>
                <th scope="col" className="px-6 py-3">
                        Recipients
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
                name="Wedding Invitations"
                description="All recipients who get invited to the wedding"
                recipients="1202"
                createdAt="01/07/2023"
              />
              <TableRow
                index="1"
                name="Wedding Invitations"
                description="All recipients who get invited to the wedding"
                recipients="1202"
                createdAt="01/07/2023"
              />
              <TableRow
                index="1"
                name="Wedding Invitations"
                description="All recipients who get invited to the wedding"
                recipients="1202"
                createdAt="01/07/2023"
              />
              <TableRow
                index="1"
                name="Wedding Invitations"
                description="All recipients who get invited to the wedding"
                recipients="1202"
                createdAt="01/07/2023"
              />
              <TableRow
                index="1"
                name="Wedding Invitations"
                description="All recipients who get invited to the wedding"
                recipients="1202"
                createdAt="01/07/2023"
              />
              <TableRow
                index="1"
                name="Wedding Invitations"
                description="All recipients who get invited to the wedding"
                recipients="1202"
                createdAt="01/07/2023"
              />
              <TableRow
                index="1"
                name="Wedding Invitations"
                description="All recipients who get invited to the wedding"
                recipients="1202"
                createdAt="01/07/2023"
              />
              <TableRow
                index="1"
                name="Wedding Invitations"
                description="All recipients who get invited to the wedding"
                recipients="1202"
                createdAt="01/07/2023"
              />
              <TableRow
                index="1"
                name="Wedding Invitations"
                description="All recipients who get invited to the wedding"
                recipients="1202"
                createdAt="01/07/2023"
              />
              <TableRow
                index="1"
                name="Wedding Invitations"
                description="All recipients who get invited to the wedding"
                recipients="1202"
                createdAt="01/07/2023"
              />
            </tbody>
          </table>
        </div>
        <div className="p-5  w-full bottom-0 flex justify-center items-center">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ">Previous</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-white border border-gray-300 bg-regal-blue hover:bg-blue-100 hover:text-blue-700">3</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">4</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">5</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

    </div>
  );
}

function TableRow({ index, name, description, recipients, createdAt } : Groups) {
  return (
    <tr className="bg-white border-b  hover:bg-gray-50 ">
      <td className="px-6 py-4 text-black">
        {index}
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {name}
      </th>
      <td className="px-6 py-4 text-black">
        {description}
      </td>
      <td className="px-6 py-4 text-black">
        {recipients}
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