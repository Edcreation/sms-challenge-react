/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import { Route, Routes } from 'react-router-dom';

export default function Create() {
  return (
    <div className='flex flex-wrap justify-center max-w-[1440px]'>
      <Routes>
        <Route path="/group" element={<CreateGroup />}></Route>
        <Route path="/recipients" element={<CreateRecipient />}></Route>
        <Route path="/file" element={<CreateFromFile />}></Route>
      </Routes>
    </div>
  );
}


export function CreateGroup() {
  return (
    <div className="rounded-sm border w-full bg-slate-100-stroke bg-white shadow-lg ">
      <div className="border-b border-stroke py-4 px-7 ">
        <h3 className="font-medium text-black ">
             Create Recipient Group
        </h3>
      </div>
      {/* <div className="text-red-600 px-10 py-2">{'error'}</div> */}
      <div className="p-7">
        <form >
          <div className="mb-5 flex flex-col gap-5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black "
                htmlFor="name"
              >
                  Name
              </label>
              <input
                className="w-full border bg-slate-100 rounded bg-gray p-2 pl-11.5 pr-4.5 text-black focus:outline-none"
                type="text"
                name="name"
                id="name"
              />
            </div>
          </div>

          <div className="mb-5 flex flex-col md:gap-5 sm:flex-row">
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black "
                htmlFor="description"
              >
                  Description
              </label>
              <textarea
                className="w-full border bg-slate-100 rounded bg-gray max-h-[200px] p-2 h-56 text-black focus:outline-none"
                name="description"
                id="description"
              />
            </div>
          </div>


          <div className="flex justify-end gap-4">
            <button
              className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1  "
              type="submit"
            >
               Cancel
            </button>
            <button className="flex justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit">
                      Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CreateRecipient() {
  return (
    <div className="p-5 border shadow-lg w-full max-w-[600px] bg-white">
      <div className="border-b pb-2 mb-2">Create Recipient</div>
      {/* { error ? <div className="text-red-600 mx-1 mb-3 w-full">{error}</div> : '' } */}
      {/* { success ? <div className="text-green-600 mx-1 mb-3 w-full">{success}</div> : '' } */}
      <form>
        <div className="mb-5 flex flex-col gap-5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="name"> Name </label>
            <input
              className="w-full border bg-slate-100 rounded bg-gray p-2 pl-11.5 pr-4.5 text-black focus:outline-none"
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="phonenumber">
                Phone number <span className='text-red-600 font-semibold text-[10px]'>ex. (2507xxxxxxxx)</span>
            </label>
            <input
              className="w-full border bg-slate-100 rounded bg-gray p-2 pl-11.5 pr-4.5 text-black focus:outline-none"
              type="text"
              name="phonenumber"
              id="phonenumber"
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col md:gap-5 sm:flex-row">
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium text-black "
              htmlFor="description"
            >
              Recipient Group (Optional)
            </label>
            <select
              className="w-full border bg-slate-100 rounded bg-gray  p-2 text-black focus:outline-none"
              name="description"
              id="description"
            >
              <option value="">Group One</option>
              <option value="">Group One</option>
              <option value="">Group One</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1  " type="submit" >
                Cancel
          </button>
          <button className="flex transition-all justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
                Create
          </button>
        </div>
      </form>
    </div>
  );
}

function CreateFromFile() {
  const [recepients, setRecipients] = useState([]);
  const [data, setData] = useState([]);
  const handleFileChange = async(event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const XLSX = await import('xlsx');
        readExcelFile(file, XLSX);
      } catch (error) {
        console.error('Error loading xlsx library:', error);
      }
    }
  };

  const readExcelFile = (file: File, XLSX: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      processExcelData(data, XLSX);
    };
    reader.readAsBinaryString(file);
  };

  const processExcelData = (data: any, XLSX: any) => {
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const recipientsColumnData = jsonData
      .map((row: any) => row[recipientsColumnIndex])
      .filter((recipient: any) => recipient !== undefined && recipient !== null)
      .map((recipient: any) => recipient.toString());
    const displayData = jsonData
      .map((row: any) => ({
        phone: row[1],
        name: row[0],
      }))
      .filter(
        (row: any) =>
          row.name !== undefined &&
          row.name !== null &&
          row.phone !== undefined &&
          row.phone !== null
      );
    setData(displayData);
    setRecipients(recipientsColumnData);
  };
  const recipientsColumnIndex = 1;

  return (
    <div className="p-5 border shadow-lg w-full max-w-[600px] bg-white">
      <div className="border-b pb-2 mb-2">Create Recipients from excel file</div>
      {/* { error ? <div className="text-red-600 mx-1 mb-3 w-full">{error}</div> : '' }
      { success ? <div className="text-green-600 mx-1 mb-3 w-full">{success}</div> : '' } */}
      <form >
        <div className="mb-5 flex flex-col gap-5 sm:flex-col">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="recipients">
                Excel File
            </label>
            <input type="file" accept=".xlsx" onChange={handleFileChange} className="w-full focus:outline-none p-2 border" />
            {recepients.length !== 0 && <div className='w-full border bg-slate-100 max-h-[150px]  mt-1 overflow-scroll'><MiniTable details={data} /></div> }
          </div>
        </div>

        <div className="mb-5 flex flex-col md:gap-5 sm:flex-row">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="message" > Message </label>
            <textarea className="w-full border bg-slate-100 rounded bg-gray max-h-[200px] p-2 h-56 text-black focus:outline-none" name="message" id="message" />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1  " type="submit" >
                Cancel
          </button>
          <button className="flex transition-all justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
                Create
          </button>
        </div>
      </form>
    </div>
  );
}

function Row({ data } : { data: { name: string, phone: string } } ) {
  return (
    <tr className="bg-white border-b ">
      <th scope="row" className="p-2 font-medium text-gray-900 whitespace-nowrap ">
        {data.name}
      </th>
      <td className="px-6 py-4">
        {data.phone}
      </td>
    </tr>
  );
}

function MiniTable({ details } : { details: { name: string, phone: string }[] }) {
  return (
    <table className="w-full text-sm text-left text-gray-500 ">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
        <tr className='bg-regal-blue text-white'>
          <th scope="col" className="px-6 py-3">
                  Name
          </th>
          <th scope="col" className="px-6 py-3">
                  Phone
          </th>
        </tr>
      </thead>
      <tbody>
        { details.map((m, index) => <Row key={index} data={m} />) }
      </tbody>
    </table>
  );
}