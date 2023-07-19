import { useProfile } from './profile.hooks';
import user from '../../../assets/user.png';
import cover from '../../../assets/cover.jpeg';

function Profile() {
  const { profile } = useProfile();

  function toPascalCase(input: string): string {
    const words = input.split(/\s+|_|-/); // Split by spaces, underscores, and hyphens
    const pascalCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return pascalCaseWords.join('');
  }
  return (
    <div className="w-full flex justify-center items-center bg-black">
      <div className="w-full bg-slate-100 border ">
        <div className="bg-slate-200 relative  h-56 flex justify-end items-end"
          style={{
            background: `url(${cover})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          <button className='px-2 py-1 m-3 border border-gray-500 text-white bg-black'>Edit</button>
        </div>
        <div className="flex justify-end p-2">
        </div>
        <div className=" bottom-1 z-10 ">
          <div className=" flex flex-col md:flex-col justify-start items-center">
            <div className="">
              <div className="drop-shadow-2">
                <img src={user} className='w-32' alt="profile" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row p-2 justify-center items-center">
              <div className="flex flex-col items-center">
                <h1 className='text-center font-semibold text-2xl'>{toPascalCase(profile?.firstName || '')} {toPascalCase(profile?.lastName || '')}</h1>
                <h6 className='text-[12px] mt-3'>{profile?.email}</h6>
                <div className='w-full my-5 flex justify-center'><p className='bg-slate-100 shadow-md text-center p-2 border'>Developer</p></div>
                {/* <div className="my-5"></div> */}
                <div className="border border-slate-400 p-2 text-sm flex flex-wrap gap-2 bg-slate-200 rounded-md">
                  <div className="border-r-2 border-slate-400 p-1">1345 <b>Recipients</b> </div>
                  <div className="border-r-2 border-slate-400 p-1">456<b> Groups</b></div>
                  <div className="p-1">2<b> Years</b></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Profile;