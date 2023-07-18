import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../utils/isLoggedIn';

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="p-2 border-l-2">Page Not Found.{ isLoggedIn()
        ? <Link className="font-semibold underline" to="/home">Return to Dashboard.</Link>
        : <Link className="font-semibold underline" to="/login">Try Logging In</Link>}</div>
    </div>
  );
}
