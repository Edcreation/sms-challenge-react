import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import ListRecepients from './list/ListRecepients';
import SendMessages from './messages/Messages';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from 'react-toastify/dist/inject-style';
import Profile from './profile/Profile';
// import { useProfile } from './profile/profile.hooks';
import NotFound from '../others/404';
// import { useLogout } from '../../utils/isLoggedIn';
// import { DarkButton } from '../../utils/darkmode';
// import { useDetectClickOutside } from 'react-detect-click-outside';
import DropdownUser from '../../components/DropdownUser';
import Sidebar from '../../components/Sidebar';
import Settings from './settings/Settings';
import ListGroup from './list/ListGroups';
import Create from './list/Create';

// CALL IT ONCE IN YOUR APP
injectStyle();

export default function Home() {
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  full ? document.documentElement.requestFullscreen() : '';
  return (
    <div className="flex flex-row bg-slate-100 bg-opacity-100">
      <Sidebar setSidebarOpen={setOpen} sidebarOpen={open} />
      <div className="w-full overflow-hidden h-screen" style={{ transition: '.6s' }}>
        <div className="w-full z-50 px-2 md:px-5 py-2 flex justify-between md:justify-end items-center flex-row  shadow-lg border-b">
          <button onClick={(e) => {e.stopPropagation(); setOpen(true);}} className="md:hidden mx-2">
            <i className="fa fa-bars text-xl font-light" aria-hidden="true"></i>
          </button>
          <div className="border  rounded-md bg-slate-100 flex px-2">
            <input type='search' className='w-44 focus:outline-none bg-transparent  p-2' />
            <button className='p-2'><i className="fa fa-search" aria-hidden="true"></i></button>
          </div>
          <button onClick={() => setFull((prev) => !prev)} className="text-black p-2 text-xl hidden md:block"><i className="fa fa-arrows-alt" aria-hidden="true"></i></button>
          <DropdownUser />
        </div>
        <div className="p-1 md:p-5 h-screen pb-2 overflow-scroll">
          <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/settings/*' element={<Settings />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/recipients' element={<ListRecepients />}></Route>
            <Route path='/recipients-groups' element={<ListGroup />}></Route>
            <Route path='/create/*' element={<Create />}></Route>
            <Route path='/send-message/*' element={<SendMessages />}></Route>
            <Route path="/*" element={<NotFound /> }></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

