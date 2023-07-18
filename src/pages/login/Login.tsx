/* eslint-disable @typescript-eslint/no-explicit-any */
import image from '../../assets/login-graphics.jpg';
import { useLogin } from './login.hooks';

export default function Login() {
  const { loading, error, handleLogin } = useLogin();
  const handleSubmit = (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const formValues: { [name: string]: string } = {};
    for (const [name, value] of data.entries()) {
      formValues[name] = value as string;
    }
    handleLogin({
      email: formValues.email,
      password: formValues.password,
    });
  };
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-11/12 md:w-8/12 max-w-[700px] flex border bg-slate-200 rounded-sm overflow-hidden border-slate-300 flex-row">
        <div className="w-1/2 hidden md:flex"
          style={{
            background: `url(${image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="w-full h-full backdrop-brightness-50 text-white flex justify-center flex-col items-center">
            <p className="text-2xl font-bold">Welcome back</p>
                    Please login to your account.
          </div>
        </div>
        <div className="w-full md:w-1/2 py-5">
          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-start items-center">
            <div className="w-11/12 p-2 text-xl pl-0 font-semibold">Login</div>
            <div className="w-11/12 text-[14px] text-red-500 mb-2">{error}</div>
            <label htmlFor="input-group-1" className="block w-11/12 mb-2 text-left text-[13px] font-medium text-gray-900 opacity-30">Username or Email</label>
            <div className="relative mb-3 flex justify-center items-center w-11/12">
              <div className="absolute inset-y-0 text-md text-regal-blue left-0 flex items-center pl-3.5 pointer-events-none">
                <i className="fa opacity-80 fa-envelope" aria-hidden="true"></i>
              </div>
              <input type="email" name='email' id="input-group-1" className="bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-md block w-full pl-10 p-2.5 focus:outline-none" placeholder="email@ishema.com" required={true} />
            </div>
            <label htmlFor="input-group-2" className="block w-11/12 mb-2 text-left text-[13px] font-medium text-gray-900 opacity-30">Password</label>
            <div className="relative mb-6 flex justify-center items-center w-11/12">
              <div className="absolute inset-y-0 text-lg text-regal-blue left-0 flex items-center pl-3.5 pointer-events-none">
                <i className="fa opacity-80 fa-lock" aria-hidden="true"></i>
              </div>
              <input type="password" name='password' id="input-group-2" className="bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-md block w-full pl-10 p-2.5 focus:outline-none" required={true} />
            </div>
            <div className="flex text-sm flex-wrap items-center justify-between w-11/12 px-2 mb-6">
              <div className="flex flex-row">
                <div className="flex items-center h-5">
                  <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 " />
                </div>
                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 ">Remember me</label>
              </div>
              <div className="underline text-regal-blue">
                            Forgot Password?
              </div>
            </div>
            {loading ?
              <button className="p-3 bg-regal-blue text-white min-w-[64px] rounded-md"><i className="fa fa-spinner fa-spin" aria-hidden="true"></i></button> :
              <button className="p-3 bg-regal-blue text-white rounded-md">Login</button>
            }
          </form>
        </div>
      </div>
    </div>
  );
}
