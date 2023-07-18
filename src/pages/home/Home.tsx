import { useState } from 'react';
import logo from '../../assets/ishemahub.png';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import ListRecepients from './list/ListRecepients';
import SendMessages from './messages/Messages';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from 'react-toastify/dist/inject-style';
import Profile from './profile/Profile';
import { useProfile } from './profile/profile.hooks';
import NotFound from '../others/404';
import { useLogout } from '../../utils/isLoggedIn';
import { DarkButton } from '../../utils/darkmode';

// CALL IT ONCE IN YOUR APP
injectStyle();

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-row bg-slate-100">
      <Sidebar view={open ? 'left-0' : '-left-56'} action={setOpen} />
      <div className="w-full overflow-hidden h-screen" style={{ transition: '.6s' }}>
        <Navbar action={setOpen} />
        <div className="p-1 md:p-5 h-screen overflow-scroll">
          <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/recepients' element={<ListRecepients />}></Route>
            <Route path='/send-message' element={<SendMessages />}></Route>
            <Route path="/*" element={<NotFound /> }></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

function Navbar({ action } : { action: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [open, setOpen] = useState(false);
  const logout = useLogout();
  const { loading, profile } = useProfile();
  // const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });
  const [full, setFull] = useState(false);
  full ? document.documentElement.requestFullscreen() : '';
  return (
    <div className="w-full z-50 px-2 md:px-5 py-2 flex justify-between md:justify-end items-center flex-row bg-slate-50 shadow-lg border-b">
      <button onClick={() => action((prev) => !prev)} className="md:hidden mx-2 cursor-pointer">
        <i className="fa fa-bars text-xl font-light" aria-hidden="true"></i>
      </button>
      <div className="border  rounded-md bg-slate-100 flex px-2">
        <input type='search' className='w-44 focus:outline-none bg-transparent  p-2' />
        <button className='p-2'><i className="fa fa-search" aria-hidden="true"></i></button>
      </div>
      <button onClick={() => setFull((prev) => !prev)} className="text-black p-2 text-xl hidden md:block"><i className="fa fa-arrows-alt" aria-hidden="true"></i></button>
      <button onClick={() => setOpen((prev) => !prev)} className="p-1 flex flex-row items-center justify-between ">
        <div className=" hidden md:flex flex-col justify-end items-start">
          {loading ? <p className="text-md font-bold w-20 h-5 animate-pulse bg-slate-300"></p> : <p className="text-md font-bold">{profile?.firstName}</p> }
          <div className="flex flex-row items-center">
            <i className="fa fa-circle text-[6px] mr-1 text-green-400 mt-1" aria-hidden="true"></i>
            <p className="text-[12px]">Available</p>
          </div>
        </div>
        {loading ? <div className="bg-slate-300 animate-pulse ml-1 rounded-full w-8 h-8"></div> : <div className="bg-black ml-2 rounded-full w-8 h-8 text-white flex justify-center items-center border">{profile?.lastName.split('')[0].toUpperCase()}</div>}
      </button>
      <div className={`w-44 z-10 ${!open ? '-right-48':'right-1'} shadow-xl transition-all bg-slate-300  top-[4.2rem]  fixed border border-[#00000042]`}>
        <Link to="/home/profile" className="p-1 py-2 border-b border-slate-200 hover:text-white transition-all cursor-pointer hover:bg-regal-blue px-5 flex flex-row items-center"><i className="fa fa-user mr-2" aria-hidden="true"></i><p>Profile</p></Link>
        <div className="py-1 mt-4 text-black border-t border-slate-700">
          <DarkButton />
        </div>
        <button onClick={() => logout()} className="p-1 w-full py-2 text-white transition-all mt-2 cursor-pointer flex flex-row items-center bg-regal-blue px-5"><i className="fa fa-sign-out mr-2" aria-hidden="true"></i><p>Log Out</p></button>
      </div>
    </div>
  );
}

function Sidebar({ view, action } : { view: string, action: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div
      className={`${view} md:left-0 fixed md:relative md:flex flex transition-all slide-in-left justify-between flex-col w-80 max-w-[200px] text-white h-screen bg-regal-blue`}>
      <div className="">
        <div className="h-[57px] md:h-[66px] bg-slate-50 border-slate-700 pb-[2px] w-full flex flex-row justify-between items-center">
          <div className="flex justify-center items-center w-20 h-10">
            <img src={logo} className='w-full' alt="ishema_hub_logo" />
          </div>
          <button onClick={() => action(false)} className="p-5 text-black md:hidden">
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="w-full px-2 pt-4">
          <Link to="/home" className="p-2 mb-3 flex flex-row items-center transition-all hover:translate-x- hover:translate-y-1 hover:border rounded-md overflow-hidden border-slate-700 cursor-pointer ">
            <div className="pr-2">
              <i className="fa fa-home" aria-hidden="true"></i>
            </div>
              Dashboard
          </Link>
          <Link to="/home/profile" className="p-2 mb-3 flex flex-row items-center transition-all hover:translate-x- hover:translate-y-1 hover:border rounded-md overflow-hidden border-slate-700 cursor-pointer ">
            <div className="pr-2">
              <i className="fa fa-user" aria-hidden="true"></i>
            </div>
              Profile
          </Link>
          {/* <Recipient /> */}
          <Messages />

        </div>
      </div>
    </div>
  );
}

// function Recipient() {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className='mb-3'>
//       <div onClick={() => setOpen((prev) => !prev)} className="p-2  flex flex-row- justify-between items-center transition-all hover:translate-x- hover:translate-y-1 hover:border rounded-md overflow-hidden border-slate-700 cursor-pointer ">
//         <div className="">
//           <i className="fa fa-users pr-2" aria-hidden="true"></i>
//             Recipients
//         </div>
//         <div className={`${open ? '' : 'rotate-90'} transition-all`}><i className="fa fa-caret-right" aria-hidden="true"></i></div>
//       </div>
//       <div className={`${open ? 'hidden' : ''} transition-opacity flex flex-col px-2 pt-1 pl-5 mb-3`}>
//         <Link to="/home/recepients" className="p-2 w-full pr-20 hover:translate-x-2 transition-all mb-1 hover:border border-slate-700 cursor-pointer rounded-md">List All</Link>
//         <Link to="/home/create-recepients" className="p-2 w-full pr-20 hover:translate-x-2 transition-all mb-1 hover:border border-slate-700 cursor-pointer rounded-md">Create</Link>
//       </div>
//     </div>
//   );
// }

function Messages() {
  const [open, setOpen] = useState(false);
  return (
    <div className='mb-3'>
      <div onClick={() => setOpen((prev) => !prev)} className="p-2  flex flex-row- justify-between items-center transition-all hover:translate-x- hover:translate-y-1 hover:border rounded-md overflow-hidden border-slate-700 cursor-pointer ">
        <div className="">
          <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
              Messages
        </div>
        <div className={`${open ? '' : 'rotate-90'} transition-all`}><i className="fa fa-caret-right" aria-hidden="true"></i></div>
      </div>
      <div className={`${open ? 'hidden' : ''} transition-opacity flex flex-col px-2 pt-1 pl-5 mb-3`}>
        {/* <Link to="/home/recepients" className="p-2 w-full pr-20 hover:translate-x-2 transition-all mb-1 hover:border border-slate-700 cursor-pointer rounded-md">Reports</Link> */}
        <Link to="/home/send-message" className="p-2 w-full pr-20 hover:translate-x-2 transition-all mb-1 hover:border border-slate-700 cursor-pointer rounded-md">Send</Link>
      </div>
    </div>
  );
}
