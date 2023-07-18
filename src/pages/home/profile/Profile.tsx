import { useState } from 'react';
import { useProfile } from './profile.hooks';

function Profile() {
  const { loading, error, profile } = useProfile();
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex justify-center items-center">
      { loading ? <ProfileSkeleton /> : error ? <p>{error}</p> :
        <div className="w-11/12 mt-10 bg-slate-200 max-w-[600px] border shadow-md flex flex-col justify-between items-center">
          <div className="p-5">
            <div className="rounded-full h-20 w-20 bg-black flex justify-center items-center text-white text-[40px] border">{profile?.lastName.split('')[0].toUpperCase()}</div>
          </div>
          <div className="flex  flex-col justify-between items-center pb-5">
            <p className="w-full text-start text-lg font-bold">{profile?.firstName} {profile?.lastName}</p>
            <p className="w-full text-start mb-5 text-sm">{profile?.email}</p>
            <div className="p-1 px-2 border rounded-md bg-orange-400 max-w-[100px] text-center">{profile?.role}</div>
          </div>
          <div className="flex transition-all flex-row w-full p-2 justify-end"><button onClick={() => setOpen((prev) => !prev) } className='text-regal-blue font-bold underline'>Edit</button></div>
          {open ? <EditBox firsName={profile?.firstName} lastName={profile?.lastName} /> : '' }
        </div>
      }

    </div>
  );
}

function EditBox({ firsName, lastName } : { firsName?: string, lastName?: string } ) {
  return (
    <div className="w-full glide-in-top p-2">
      <div className="border-t pt-2 flex flex-col  justify-center items-start">
        <div className="flex-col md:flex-row flex">
          <div className="">
            <label htmlFor="firstName" className='font-semibold'>First Name:</label>
            <input placeholder={firsName} name='firstName' type='text' className='focus:outline-none p-1 bg-transparent border-b border-slate-400 mx-2' />
          </div>
          <div className="mt-2 md:mt-0">
            <label htmlFor="lastName" className='font-semibold'>Last Name:</label>
            <input placeholder={lastName} name='lastName' type='text' className='focus:outline-none p-1 bg-transparent border-b border-slate-400 mx-2' />
          </div>
        </div>
        <div className="my-2"><button className='p-1 bg-blue-500 text-white rounded-md'>Confirm</button></div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="w-11/12 bg-slate-300 md:w-1/2 border shadow-md flex flex-col justify-between items-center">
      <div className="p-5">
        <div className="rounded-full h-20 w-20  bg-gray-400 animate-pulse"></div>
      </div>
      <div className="flex flex-col justify-between items-center pb-5">
        <p className="text-start text-lg font-bold h-4 bg-slate-300 animate-pulse w-36"></p>
        <p className="text-start mb-5 text-sm h-3 animate-pulse bg-slate-300 mt-2 w-36"></p>
        <div className="p-1 px-2 border rounded-md bg-orange-200 max-w-[100px] text-center w-20 h-8 animate-pulse"></div>
      </div>
    </div>
  );
}


export default Profile;