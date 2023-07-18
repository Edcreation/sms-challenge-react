import Message_image from '../../../assets/sent.png';
import Recipient_image from '../../../assets/recepient.png';
import sent_image from '../../../assets/message balance.png';
import { SetStateAction, useState } from 'react';
import { environment, useCreateEnvironment, useGetEnvironments } from './dashboard.hooks';
import copy from 'clipboard-copy';

export default function Dashboard() {
  return (
    <div className='overflow-y-scroll pt-5 pb-10'>
      <UpperBoxes />
      <EnvironmentHolder />
    </div>
  );
}

function UpperBoxes() {
  return (
    <div className="w-full border-b pb-5 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-3 justify-between items-center">
      <div className="w-full flex flex-col items-center justify-center border rounded-md cursor-pointer bg-white">
        <div className="p-2 flex flex-row items-center justify-center w-full">
          <img src={Message_image} alt="message icon" className="w-10 mr-4"></img>
          <p className="text-lg font-bold">450</p>
        </div>
        <p className="text-sm text-slate-400 pb-4">Message balance</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center border rounded-md cursor-pointer bg-white">
        <div className="p-2 flex flex-row items-center justify-center w-full">
          <img src={sent_image} alt="message icon" className="w-10 mr-4"></img>
          <p className="text-xl font-bold">12,310</p>
        </div>
        <p className="text-sm text-slate-400 pb-4">Sent Messages</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center border rounded-md cursor-pointer bg-white">
        <div className="p-2 flex flex-row items-center justify-center w-full">
          <img src={Recipient_image} alt="message icon" className="w-10 mr-4"></img>
          <p className="text-xl font-bold">2,310</p>
        </div>
        <p className="text-sm text-slate-400 pb-4">Recipients</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center border rounded-md cursor-pointer bg-white">
        <div className="p-2 flex flex-row items-center justify-center w-full">
          <img src={Recipient_image} alt="message icon" className="w-10 mr-4"></img>
          <p className="text-xl font-bold">210</p>
        </div>
        <p className="text-sm text-slate-400 pb-4">Recipient Groups</p>
      </div>
    </div>
  );
}

function EnvironmentHolder() {
  const [open , setOpen] = useState(false);
  const { loading, error, envs } = useGetEnvironments();
  return (
    <div className="w-full   mt-5 p-2">
      <div className="p-2 font-semibold flex flex-row justify-between items-center">
        <div className="text-lg">Environments</div>
        <button onClick={() => setOpen((prev) => !prev)} className="p-2 px-5 bg-regal-blue text-white rounded-md border">Create New</button>
        {open && <CreateEnv action={setOpen} />}
      </div>
      <div className="max-h-[340px] py-4 flex flex-col overflow-y-scroll">
        { loading ? <p>Loading...</p> : error ? <p>{error}</p> : envs.length === 0 ? <p>No environments created.</p> :
          envs.map((env) => <Environment secret={env.secret} name={env.name} description={env.description} environment={env.environment} />)
        }
      </div>
    </div>
  );
}

function CreateEnv({ action } : { action: React.Dispatch<SetStateAction<boolean>> }) {
  const { loading, error, CreateEnvironment } = useCreateEnvironment();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const formValues: { [name: string]: string } = {};
    for (const [name, value] of data.entries()) {
      formValues[name] = value as string;
    }
    CreateEnvironment({
      name: formValues.name,
      environment: formValues.environment,
      description: formValues.description
    } as environment);
  };
  return (
    <div style={{ transition: '.6s' }} className="absolute w-full flex justify-center items-start pt-36 h-screen top-0 left-0 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-11/12 md:w-2/5 scale-in-tr h-56">
        <div className="flex p-1 flex-row justify-end"><button onClick={() => action(false)} className='rounded-md text-2xl'><i className="fa fa-window-close" aria-hidden="true"></i></button></div>
        <div className="w-full shadow-lg bg-white border flex flex-col items-center">
          <h1 className='py-2'>Create new Environment</h1>
          <p className='text-red-600 text-[12px] h-5'>{error}</p>
          <div className="p-2 w-full flex flex-col justify-center items-center">
            <label htmlFor="name" className="text-sm w-11/12 text-start">Name</label>
            <input name='name' type="text" className="w-11/12 focus:outline-none p-2 border" />
          </div>
          <div className="p-2 w-full flex flex-col justify-center items-center">
            <label htmlFor="environment" className="text-sm w-11/12 text-start">Environment</label>
            <input name='environment' type="text" className="w-11/12 focus:outline-none p-2 border" />
          </div>
          <div className="p-2 w-full flex flex-col justify-center items-center">
            <label htmlFor="description" className="text-sm w-11/12 text-start">Description</label>
            <textarea name='description' className="w-11/12 focus:outline-none p-2 h-44 border max-h-[100px]" />
          </div>
          <div className="p-2 w-full flex flex-col justify-center items-center">
            {loading ?
              <button className="w-11/12 focus:outline-none bg-regal-blue p-1 text-white border rounded-sm overflow-hidden shadow-sm">Loading...</button>
              :
              <button className="w-11/12 focus:outline-none bg-regal-blue p-1 text-white border rounded-sm overflow-hidden shadow-sm">Create</button>
            }
          </div>
        </div>
      </form>
    </div>
  );
}

function Environment({ name, description, environment, secret }: environment) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    copy(secret).then(() => {
      setCopied(true);
      setInterval(() => {
        setCopied(false);
      }, 2000);
    });
  };
  return (
    <div className="w-full  bg-white flex flex-wrap justify-between rounded-md shadow-md border p-1 mb-4">
      <div className="p-1">
        <div className="flex flex-wrap items-center font-bold">{name} <div className={`ml-2 p-1 px-2 text-[13px] rounded-md ${environment === 'prod' ? 'bg-green-500' : 'bg-orange-400'}`}>{environment}</div></div>
        <div className="text-[13px] my-2 max-h-[200px] overflow-x-scroll text-slate-400 max-w-[200px]">{description}</div>
      </div>
      <div className="p-1 text-sm flex justify-end">
        <div style={{ transition: '.9s' }} className="min-w-[150px]">
          <div className="text-[12px]  my-1">API Secret</div>
          <div className="flex flex-row p-1 justify-between bg-slate-300 rounded-md items-center">
            {show ?
              <p className="text-sm italic border-b border-slate-400 overflow-x-scroll max-w-[130px]">{secret}</p> :
              <p className="text-sm overflow-x-scroll max-w-[130px]">xxxxxxxxxxxxxxx</p>}
            <button onClick={handleCopy} className={`${copied ? 'scale-125 bg-green-400 -translate-y-1' : ''} transition-all rounded flex justify-center items-center m-1 p-1`}><i className='fa  fa-files-o ' aria-hidden="true"></i></button>
            <button onClick={() => setShow((prev) => !prev)} className="p-1 ">
              {show ?
                <i className="fa fa-eye-slash" aria-hidden="true"></i> :
                <i className="fa fa-eye" aria-hidden="true"></i>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
