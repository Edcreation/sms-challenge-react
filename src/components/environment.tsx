import { useState, useEffect } from 'react';
import { environment, useCreateEnvironment, useGetEnvironments } from '../pages/home/dashboard/dashboard.hooks';
import copy from 'clipboard-copy';
import { Link, Route, Routes } from 'react-router-dom';

export default function MainEnvironment() {
  return (
    <div>
      <Routes>
        <Route path='/create' element={<CreateEnv />}></Route>
        <Route path='/' element={<EnvironmentHolder />}></Route>
      </Routes>
    </div>
  );
}


export function EnvironmentHolder() {
  const { loading, error, envs } = useGetEnvironments();
  const [data, setData] = useState<environment[]>([]);
  useEffect(() => {
    envs ? setData(envs) : '';
  }, [envs]);

  return (
    <div className="w-full mt-5 md:p-2">
      <div className='p-2'>

        <div className=" overflow-x-auto border shadow-lg  mb-20">
          <div className="pb-4 flex flex-row bg-white border-b-2 justify-between shadow-md p-3 items-center">
            <div className="text-xl font-semibold">Environments</div>
            <div className="flex flex-row items-center justify-center">
              <Link to="/home/settings/environment/create" className="p-1 px-2 mt-1 rounded-md mr-3 bg-slate-100 border"><i className="fa fa-plus" aria-hidden="true"></i></Link>
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
                  <th scope="col" className="px-6 py-3 cursor-pointer">
                  Name
                  </th>
                  <th scope="col" className="px-6 py-3 cursor-pointer">
                  Description
                  </th>
                  <th scope="col" className="px-6 py-3 cursor-pointer">
                  Environment
                  </th>
                  <th scope="col" className="px-6 py-3">
                  API
                  </th>
                </tr>
              </thead>
              { loading ? <tbody className='w-full flex p-5 justify-center text-center text-regal-blue'><td className='w-full'><i className="fa fa-spinner fa-spin" aria-hidden="true"></i></td></tbody> : error ? <p>{error}</p> : envs.length === 0 ? <p>No environments created.</p> :
                data.map((env, index) => <tbody key={index}>
                  <Environment index={index} secret={env.secret} name={env.name} description={env.description} environment={env.environment} />
                </tbody>
                )
              }
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
    </div>
  );
}

export function CreateEnv() {
  const { loading, error, CreateEnvironment, success } = useCreateEnvironment();
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
  success ? (document.getElementById('frm') as HTMLFormElement )?.reset() : '';
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-lg ">
      <div className="border-b border-stroke py-4 px-7 ">
        <h3 className="font-medium text-black ">
           Create new API Key
        </h3>
      </div>
      <div className="text-red-600 px-10 py-2">{error}</div>
      <div className="p-7">
        <form onSubmit={handleSubmit}>
          <div className="mb-5 flex flex-col gap-5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black "
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full border rounded bg-gray p-2 pl-11.5 pr-4.5 text-black focus:outline-none"
                type="text"
                name="name"
                id="name"
                placeholder="ex. John Doe"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black "
                htmlFor="phonenumber"
              >
                Environment
              </label>
              <select
                className="w-full border rounded bg-gray p-2 pl-11.5 pr-4.5 text-black focus:outline-none"
                name="name"
                id="name"
              >
                <option value="dev">Development</option>
                <option value="prod">Production</option>
              </select>
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
                className="w-full border rounded bg-gray max-h-[200px] p-2 h-56 text-black focus:outline-none"
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
            {loading ?
              <button className="flex justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit">
                    Loading..
              </button> :
              <button className="flex justify-center rounded bg-blue-600 py-2 px-6 font-medium text-white hover:shadow-lg" type="submit">
                    Create
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export function Environment({ name, description, environment, secret, index }: environment) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    copy(secret).then(() => {
      setCopied(true);
      setInterval(() => {
        setCopied(false);
      }, 400);
    });
  };
  return (
    <tr className="bg-white border-b  hover:bg-gray-50 ">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {index}
      </th>
      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {name}
      </td>
      <td className="px-6 py-4 text-black max-h-[100px] overflow-scroll">
        {description}
      </td>
      <td className="px-6 py-4 text-center text-black">
        <p className={`px-2 shadow-md py-1 border ${environment === 'dev' ? 'bg-yellow-500' : 'bg-green-500'}`}>{environment === 'dev' ? 'Development' : 'Production' }</p>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-row p-1 justify-between border rounded-sm items-center">
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
      </td>
    </tr>
  );
}