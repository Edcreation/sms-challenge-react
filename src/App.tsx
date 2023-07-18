import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import { Provider } from 'react-redux';
import store from './redux/redux/store';
import Home from './pages/home/Home';
import { ProtectedComponent } from './utils/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoggedIn } from './utils/isLoggedIn';
import NotFound from './pages/others/404';

function App() {
  return (
    <div className="min-h-screen">
      <ToastContainer />
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/login" element={ isLoggedIn() ? <Home /> : <Login /> }></Route>
            <Route path="/home/*" element={<ProtectedComponent replace={<NotFound />}><Home /></ProtectedComponent> }></Route>
            <Route path="/*" element={<NotFound /> }></Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
