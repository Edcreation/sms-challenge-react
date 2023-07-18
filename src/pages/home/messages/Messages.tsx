/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useRef, useState } from 'react';
import { message, useSendMessage } from './messages.hook';

export default function SendMessages() {
  const [active, setActive] = useState<0 | 1 | 2 | 3 | 4>(0);
  const textRef = useRef<HTMLInputElement>(null);
  const [defaultId, setDefaultId] = useState<string | null>(null);
  const handlePaste = async() => {
    try {
      const pastedText = await navigator.clipboard.readText();
      if (pastedText && textRef.current) {
        textRef.current.value = pastedText;
      }
    } catch (error) {
      console.error('Failed to read clipboard data:', error);
    }
  };
  return (
    <div className="p-2 pt-0">
      <div className="flex w-full max-w-[800px] flex-wrap justify-between items-center p-2">
        <p className="my-3 text-lg">Send Message</p>
        <div className=" flex flex-wrap text-[12px] justify-between border border-slate-300 bg-slate-200 p-1 rounded items-end">
          <div className="">
            <label htmlFor="senderid" className=''>Default Sender ID</label>
            <input onChange={(e) => setDefaultId(e.target.value)} type="text" className='focus:outline-none md:m-2 m-1 p-2 border-b border-slate-600  bg-transparent' name="senderid" id="senderid" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="apikey" className=''>Api Key</label>
            <div className="border border-slate-300 flex flex-row items-center">
              <input ref={textRef} contentEditable={true} type="password" className='focus:outline-none border-b border-slate-200 md:m-2 m-1  bg-transparent' name="apikey" id="apikey" />
              <button onClick={handlePaste} className='p-2 bg-slate-300 border-l border-slate-300'><i className="fa fa-clipboard" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[800px] flex flex-col md:flex-row md:justify-center">
        <div className="p-2 border-r w-full grid grid-cols-3 md:flex md:flex-col md:w-1/5">
          <button onClick={() => setActive(0)} className={`${active === 0 ? ' md:translate-x-1 bg-blue-600' : 'bg-regal-blue'} p-1 cursor-pointer border hover:translate-x-1 hover:bg-blue-400 transition-all py-2 w-11/12 mb-1  text-white rounded-md shadow-md text-sm`}>Send message</button>
          <button onClick={() => setActive(1)} className={`${active === 1 ? ' md:translate-x-1 bg-blue-600' : 'bg-regal-blue'} p-1 cursor-pointer border hover:translate-x-1 hover:bg-blue-400 transition-all py-2 w-11/12 mb-1  text-white rounded-md shadow-md text-sm`}>Send many</button>
          {/* <button onClick={() => setActive(2)} className={`${active === 2 ? ' md:translate-x-1 bg-blue-600' : 'bg-regal-blue'} p-1 cursor-pointer border hover:translate-x-1 hover:bg-blue-400 transition-all py-2 w-11/12 mb-1  text-white rounded-md shadow-md text-sm`}>Send to a group</button>
          <button onClick={() => setActive(3)} className={`${active === 3 ? ' md:translate-x-1 bg-blue-600' : 'bg-regal-blue'} p-1 cursor-pointer border hover:translate-x-1 hover:bg-blue-400 transition-all py-2 w-11/12 mb-1  text-white rounded-md shadow-md text-sm`}>Send to registered</button> */}
          <button onClick={() => setActive(4)} className={`${active === 4 ? ' md:translate-x-1 bg-blue-600' : 'bg-regal-blue'} p-1 cursor-pointer border hover:translate-x-1 hover:bg-blue-400 transition-all py-2 w-11/12 mb-1  text-white rounded-md shadow-md text-sm`}>Send from excel file</button>
        </div>
        <div className="w-full  md:w-4/5 p-2 flex justify-start items-center">
          {active === 0 && <SendOne api={textRef.current?.value || ''} senderId={defaultId} /> }
          {active === 1 && <SendMany api={textRef.current?.value || ''} senderId={defaultId} /> }
          {/* {active === 2 && <SendGroup /> }
          {active === 3 && <SendSearched /> } */}
          {active === 4 && <SendFromFile api={textRef.current?.value || ''} senderId={defaultId} /> }
        </div>
      </div>
    </div>
  );
}

function SendOne({ api, senderId } : { api: string, senderId: string | null }) {
  const { loading, SendMessage, error, success } = useSendMessage();
  const [id, setId] = useState(senderId || '');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const formValues: { [name: string]: string } = {};
    for (const [name, value] of data.entries()) {
      formValues[name] = value as string;
    }
    SendMessage({
      senderId: formValues.senderId,
      message: formValues.message,
      recepients: [formValues.recepients],
      apiKey: api
    } as message);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full overflow-hidden shadow-lg bg-white border flex flex-col items-center" >
      { error ? <div className="bg-red-600 text-white max-w-[200px] absolute p-2 rounded-b-md slide-in-top">{error}</div> : '' }
      { success ? <div className="bg-green-600 text-white max-w-[200px] absolute p-2 rounded-b-md slide-in-top">{success}</div> : '' }
      <div className="p-2 w-full flex flex-col justify-center items-center">
        <label htmlFor="senderId" className="text-sm w-11/12 text-start">Sender ID</label>
        <input value={id} onChange={(e) => setId(e.target.value)} name='senderId' type="text" className="w-11/12 focus:outline-none p-2 border" required={true} />
      </div>
      <div className="p-2 w-full flex flex-col justify-center items-center">
        <label htmlFor="recipients" className="text-sm w-11/12 text-start">Phone Number <span className="text-[12px] text-red-600">(2507xxxxxxxx)</span> </label>
        <input name='recepients' type="text" className="w-11/12 focus:outline-none p-2 border" required={true} />
      </div>
      <div className="p-2 w-full flex flex-col justify-center items-center">
        <label htmlFor="message" className="text-sm w-11/12 text-start">Message</label>
        <textarea name='message' className="w-11/12 focus:outline-none p-2 h-44 border" required={true} />
      </div>
      <div className="p-2 w-full flex flex-col justify-center items-center">
        {loading ?
          <button className="w-11/12 focus:outline-none bg-regal-blue p-1 text-white border rounded-sm overflow-hidden shadow-sm">Loading...</button> :
          <button className="w-11/12 focus:outline-none bg-regal-blue p-1 text-white border rounded-sm overflow-hidden shadow-sm">SEND</button>
        }
      </div>
    </form>
  );
}

function SendMany({ api, senderId } : { api: string, senderId: string | null }) {
  const { loading, SendMessage, error, success } = useSendMessage();
  const [id, setId] = useState(senderId || '');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const formValues: { [name: string]: string } = {};
    for (const [name, value] of data.entries()) {
      formValues[name] = value as string;
    }
    SendMessage({
      senderId: formValues.senderId,
      message: formValues.message,
      recepients: [formValues.recepients],
      apiKey: api
    } as message);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full overflow-hidden shadow-lg bg-white border flex flex-col items-center" >
      { error ? <div className="bg-red-600 text-white max-w-[200px] absolute p-2 rounded-b-md slide-in-top">{error}</div> : '' }
      { success ? <div className="bg-green-600 text-white max-w-[200px] absolute p-2 rounded-b-md slide-in-top">{success}</div> : '' }
      <div className="p-2 w-full flex flex-col justify-center items-center">
        <label htmlFor="senderId" className="text-sm w-11/12 text-start">Sender ID</label>
        <input value={id} onChange={(e) => setId(e.target.value)} name='senderId' type="text" className="w-11/12 focus:outline-none p-2 border" required={true} />
      </div>
      <div className="p-2 w-full flex flex-col justify-center items-center">
        <label htmlFor="" className="text-sm w-11/12 text-start">Phone Numbers <span className="text-[12px] text-red-600">(Separate each number with ",")</span> </label>
        <textarea name='recepients' className="w-11/12 focus:outline-none p-2 border max-h-[100px]" required={true} />
      </div>
      <div className="p-2 w-full flex flex-col justify-center items-center">
        <label htmlFor="message" className="text-sm w-11/12 text-start">Message</label>
        <textarea name='message' className="w-11/12 focus:outline-none p-2 h-44 border" required={true} />
      </div>
      <div className="p-2 w-full flex flex-col justify-center items-center">
        {loading ?
          <button className="w-11/12 focus:outline-none bg-regal-blue p-1 text-white border rounded-sm overflow-hidden shadow-sm">Loading...</button> :
          <button className="w-11/12 focus:outline-none bg-regal-blue p-1 text-white border rounded-sm overflow-hidden shadow-sm">SEND</button>
        }
      </div>
    </form>
  );
}


// function SendGroup() {
//   return (
//     <div className="w-full shadow-lg bg-white border flex flex-col items-center">
//       <div className="p-2 w-full flex flex-col justify-center items-center">
//         <label htmlFor="" className="text-sm w-11/12 text-start">Sender ID</label>
//         <input type="text" className="w-11/12 focus:outline-none p-2 border" />
//       </div>
//       <div className="p-2 w-full flex flex-col justify-center items-center">
//         <label htmlFor="" className="text-sm w-11/12 text-start">Select Group</label>
//         <select className="w-11/12 focus:outline-none p-2 border">
//           <option className="py-3 text-white bg-regal-blue">Main</option>
//           <option className="p-3 text-white bg-regal-blue">Main</option>
//         </select>
//       </div>
//       <div className="p-2 w-full flex flex-col justify-center items-center">
//         <label htmlFor="" className="text-sm w-11/12 text-start">Message</label>
//         <textarea className="w-11/12 max-h-[180px] focus:outline-none p-2 h-44 border" />
//       </div>
//       <div className="p-2 w-full flex flex-col justify-center items-center">
//         <button className="w-11/12 focus:outline-none bg-regal-blue p-1 text-white border rounded-sm overflow-hidden shadow-sm">SEND</button>
//       </div>
//     </div>
//   );
// }

// function SendSearched() {
//   return (
//     <div className="w-full shadow-lg bg-white border flex flex-col items-center">
//       <div className="p-2 w-full flex flex-col justify-center items-center">
//         <label htmlFor="" className="text-sm w-11/12 text-start">Sender ID</label>
//         <input type="text" className="w-11/12 focus:outline-none p-2 border" />
//       </div>
//       <div className="p-2 w-full flex flex-col justify-center items-center">
//         <label htmlFor="" className="text-sm w-11/12 text-start">Search Recepient</label>
//         <input type="search" className="w-11/12 focus:outline-none p-2 border" />
//       </div>
//       <div className="p-2 w-full flex flex-col justify-center items-center">
//         <label htmlFor="" className="text-sm w-11/12 text-start">Message</label>
//         <textarea className="w-11/12 max-h-[180px] focus:outline-none p-2 h-44 border" />
//       </div>
//       <div className="p-2 w-full flex flex-col justify-center items-center">
//         <button className="w-11/12 focus:outline-none bg-regal-blue p-1 text-white border rounded-sm overflow-hidden shadow-sm">SEND</button>
//       </div>
//     </div>
//   );
// }

function SendFromFile({ api, senderId } : { api: string, senderId: string | null }) {
  const [recepients, setRecipients] = useState([]);
  const [data, setData] = useState([]);
  const { loading, SendMessage, error, success } = useSendMessage();
  const [id, setId] = useState(senderId || '');
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
  const handleSubmit = (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const formValues: { [name: string]: string } = {};
    for (const [name, value] of data.entries()) {
      formValues[name] = value as string;
    }
    SendMessage({
      senderId: formValues.senderId,
      message: formValues.message,
      recepients: recepients,
      apiKey: api
    } as message);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full shadow-lg bg-white border flex flex-col items-center">
      { error ? <div className="bg-red-600 text-white max-w-[200px] absolute p-2 rounded-b-md slide-in-top">{error}</div> : '' }
      { success ? <div className="bg-green-600 text-white max-w-[200px] absolute p-2 rounded-b-md slide-in-top">{success}</div> : '' }
      <div className="p-2 w-full flex flex-col justify-center items-center">
        <label htmlFor="senderId" className="text-sm w-11/12 text-start">Sender ID</label>
        <input value={id} onChange={(e) => setId(e.target.value)} name='senderId' type="text" className="w-11/12 focus:outline-none p-2 border" required={true} />
      </div>
      <div className="p-2 w-full flex flex-col justify-center items-center">
        <label htmlFor="" className="text-sm w-11/12 text-start">Upload Excel File</label>
        <input type="file" accept=".xlsx" onChange={handleFileChange} className="w-11/12 focus:outline-none p-2 border" />
        {recepients.length !== 0 && <div className='w-11/12 border max-h-[80px] bg-slate-200 mt-1 overflow-scroll'><MiniTable details={data} /></div> }
      </div>
      <div className="p-2 w-full flex flex-col justify-center items-center">
        <label htmlFor="" className="text-sm w-11/12 text-start">Message</label>
        <textarea name='message' className="w-11/12 max-h-[180px] focus:outline-none p-2 h-44 border" />
      </div>
      <div className="p-2 w-full flex flex-col justify-center items-center">
        {loading ?
          <button className="w-11/12 focus:outline-none bg-regal-blue p-1 text-white border rounded-sm overflow-hidden shadow-sm">Loading...</button> :
          <button className="w-11/12 focus:outline-none bg-regal-blue p-1 text-white border rounded-sm overflow-hidden shadow-sm">SEND</button>
        }
      </div>
    </form>
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
        <tr>
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

