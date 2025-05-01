'use client';

import Link from 'next/link';
import { useAuth } from './context';

export default function Navbar() {
  const {loggIn ,LogOut} = useAuth();
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        MyApp
      </Link>

      <p>{loggIn.email}</p>

      <div className="space-x-4">
        {!loggIn.state ?
          (<>
            <Link
              href="/Login"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            > Login</Link>
            <Link
              href="/Signup"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
            > Sign Up</Link>
          </>)
          :
          (<>
           <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition" onClick={LogOut}> Log Out</button>
          </>)
        }
      </div>
    </nav>
  );
}
