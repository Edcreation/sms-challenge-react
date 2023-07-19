/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useRef, useState } from 'react';
import { message, useSendMessage } from './messages.hook';
import { Route, Routes } from 'react-router-dom';

export default function SendMessages() {
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
    <div className=" pb-20 ">
      <div className="flex w-full border-slate-300  p-2 mb-5 flex-wrap justify-between items-center">
        <p className="my-3 text-lg">Send Message</p>
        <div className="p-2 flex flex-wrap text-[12px] justify-between border  rounded items-end">
          <div className="">
            <label htmlFor="senderid" className=''>Default Sender ID</label>
            <input onChange={(e) => setDefaultId(e.target.value)} type="text" className='focus:outline-none md:m-2 m-1 p-2 border-b border-slate-600   bg-transparent' name="senderid" id="senderid" />
          </div>
          <div className="flex-col">
            <label htmlFor="apikey" className=''>Api Key</label>
            <div className=" flex flex-row items-center">
              <input ref={textRef} contentEditable={true} type="password" className='focus:outline-none border-b border-slate-600 md:m-2 m-1  bg-transparent' name="apikey" id="apikey" />
              <button onClick={handlePaste} className='p-2 bg-slate-300 border-l border-slate-300'><i className="fa fa-clipboard" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row md:justify-center">
        <Routes>
          <Route path='/' element={<Combination api={textRef.current?.value || ''} senderId={defaultId} />}></Route>
          <Route path='/one' element={<SendOne api={textRef.current?.value || ''} senderId={defaultId} />}></Route>
          <Route path='/many' element={<SendMany api={textRef.current?.value || ''} senderId={defaultId} />}></Route>
          <Route path='/file' element={<SendFromFile api={textRef.current?.value || ''} senderId={defaultId} />}></Route>
          <Route path='/group' element={<SendGroup api={textRef.current?.value || ''} senderId={defaultId} />}></Route>
          <Route path='/recipient' element={<SendRecipient api={textRef.current?.value || ''} senderId={defaultId} />}></Route>
        </Routes>
      </div>
    </div>
  );
}

function Combination({ api, senderId } : { api: string, senderId: string | null }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-content-center  gap-3 w-full">
      <SendOne api={api} senderId={senderId} />
      <SendMany api={api} senderId={senderId} />
      <SendFromFile api={api} senderId={senderId} />
      <SendGroup api={api} senderId={senderId} />
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
    <div className="p-5 border shadow-lg w-full max-w-[600px] max-h-[500px] bg-white">
      <div className="border-b pb-2 mb-2">Send Message</div>
      { error ? <div className="text-red-600 mx-1 mb-3 w-full">{error}</div> : '' }
      { success ? <div className="text-green-600 mx-1 mb-3 w-full">{success}</div> : '' }
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="senderId"> Sender Id </label>
            <input
              className="w-full border rounded bg-gray p-2 text-black focus:outline-none"
              type="text"
              name="senderId"
              id="senderId"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="recipients">
              Phone number
            </label>
            <input
              className="w-full border rounded bg-gray p-2 text-black focus:outline-none"
              type="text"
              name="recepients"
              id="recipients"
              placeholder='ex. (2507xxxxxxxx)'
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col md:gap-5 sm:flex-row">
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium text-black "
              htmlFor="message"
            >
            Message
            </label>
            <textarea
              className="w-full border rounded bg-gray  p-2 h-auto max-h-[200px] text-black focus:outline-none"
              name="message"
              id="message"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1  " type="submit" >
              Cancel
          </button>
          {loading ?
            <button className="flex justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
              Sending...
            </button> :
            <button className="flex transition-all justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
              Send
            </button>}
        </div>
      </form>
    </div>
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
    <div className="p-5 border shadow-lg w-full max-w-[600px] bg-white">
      <div className="border-b pb-2 mb-2">Send message to many</div>
      { error ? <div className="text-red-600 mx-1 mb-3 w-full">{error}</div> : '' }
      { success ? <div className="text-green-600 mx-1 mb-3 w-full">{success}</div> : '' }
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-5 sm:flex-col">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="senderId"> Sender Id </label>
            <input
              className="w-full border rounded bg-gray p-2 text-black focus:outline-none"
              type="text"
              name="senderId"
              id="senderId"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ex. John Doe"
            />
          </div>
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="recipients">
              Phone numbers
            </label>
            <textarea className="w-full border max-h-[100px] rounded bg-gray p-2  text-black focus:outline-none"
              name="recepients"
              id="recipients"
              placeholder='ex.2507xxxxxxxx, 2507xxxxxxxx'
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col md:gap-5 sm:flex-row">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="message" > Message </label>
            <textarea className="w-full border rounded bg-gray max-h-[200px] p-2 h-56 text-black focus:outline-none" name="message" id="message" />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1  " type="submit" >
              Cancel
          </button>
          {loading ?
            <button className="flex justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
              Sending...
            </button> :
            <button className="flex transition-all justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
              Send
            </button>}
        </div>
      </form>
    </div>
  );
}

function SendGroup({ api, senderId } : { api: string, senderId: string | null }) {
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
    <div className="p-5 border shadow-lg w-full max-w-[600px] bg-white">
      <div className="border-b pb-2 mb-2">Send message to group</div>
      { error ? <div className="text-red-600 mx-1 mb-3 w-full">{error}</div> : '' }
      { success ? <div className="text-green-600 mx-1 mb-3 w-full">{success}</div> : '' }
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-5 sm:flex-col">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="senderId"> Sender Id </label>
            <input
              className="w-full border rounded bg-gray p-2 text-black focus:outline-none"
              type="text"
              name="senderId"
              id="senderId"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ex. John Doe"
            />
          </div>
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="recipients">
              Select Group
            </label>
            <select className="w-full border max-h-[100px] rounded bg-gray p-2  text-black focus:outline-none"
              name="recipients"
              id="recipients"
            >
              <option value="">Group One</option>
              <option value="">Group Two</option>
            </select>
          </div>
        </div>

        <div className="mb-5 flex flex-col md:gap-5 sm:flex-row">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="message" > Message </label>
            <textarea className="w-full border rounded bg-gray max-h-[200px] p-2 h-56 text-black focus:outline-none" name="message" id="message" />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1  " type="submit" >
              Cancel
          </button>
          {loading ?
            <button className="flex justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
              Sending...
            </button> :
            <button className="flex transition-all justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
              Send
            </button>}
        </div>
      </form>
    </div>
  );
}

function SendRecipient({ api, senderId } : { api: string, senderId: string | null }) {
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
    <div className="p-5 border shadow-lg w-full max-w-[600px] bg-white">
      <div className="border-b pb-2 mb-2">Send message to a Recipient</div>
      { error ? <div className="text-red-600 mx-1 mb-3 w-full">{error}</div> : '' }
      { success ? <div className="text-green-600 mx-1 mb-3 w-full">{success}</div> : '' }
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-5 sm:flex-col">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="senderId"> Sender Id </label>
            <input
              className="w-full border rounded bg-gray p-2 text-black focus:outline-none"
              type="text"
              name="senderId"
              id="senderId"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ex. John Doe"
            />
          </div>
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="recipients">
              Search Recipient
            </label>
            <div className="w-full bg-gray flex border flex-row rounded p-2">
              <div className="p-1">
                <i className="fa fa-search mr-3" aria-hidden="true"></i>
              </div>
              <input className="w-full  max-h-[100px] bg-transparent text-black focus:outline-none"
                id="recipients"
                type='search'
              />
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col md:gap-5 sm:flex-row">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="message" > Message </label>
            <textarea className="w-full border rounded bg-gray max-h-[200px] p-2 h-56 text-black focus:outline-none" name="message" id="message" />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1  " type="submit" >
              Cancel
          </button>
          {loading ?
            <button className="flex justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
              Sending...
            </button> :
            <button className="flex transition-all justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
              Send
            </button>}
        </div>
      </form>
    </div>
  );
}

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
    <div className="p-5 border shadow-lg w-full max-w-[600px] bg-white">
      <div className="border-b pb-2 mb-2">Send message from excel file</div>
      { error ? <div className="text-red-600 mx-1 mb-3 w-full">{error}</div> : '' }
      { success ? <div className="text-green-600 mx-1 mb-3 w-full">{success}</div> : '' }
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-5 sm:flex-col">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="senderId"> Sender Id </label>
            <input
              className="w-full border rounded bg-gray p-2 text-black focus:outline-none"
              type="text"
              name="senderId"
              id="senderId"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ex. John Doe"
            />
          </div>
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="recipients">
              Excel File
            </label>
            <input type="file" accept=".xlsx" onChange={handleFileChange} className="w-full focus:outline-none p-2 border" />
            {recepients.length !== 0 && <div className='w-full border max-h-[150px] bg-slate-200 mt-1 overflow-scroll'><MiniTable details={data} /></div> }
          </div>
        </div>

        <div className="mb-5 flex flex-col md:gap-5 sm:flex-row">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black " htmlFor="message" > Message </label>
            <textarea className="w-full border rounded bg-gray max-h-[200px] p-2 h-56 text-black focus:outline-none" name="message" id="message" />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1  " type="submit" >
              Cancel
          </button>
          {loading ?
            <button className="flex justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
              Sending...
            </button> :
            <button className="flex transition-all justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit" >
              Send
            </button>}
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

