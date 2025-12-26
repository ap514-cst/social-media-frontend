import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import axios from "axios";
const Login = ({ setIsAuthenticated }) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // Add your authentication logic here
    await axios.post("https://social-media-backend-2-topf.onrender.com/api/user/login", {
      email: userEmail,
      password: password
    }).then((res) => {
      if (!res) {
        return alert("login failed")
      } else {
        setLoading(false)
        alert("login successful")
        setIsAuthenticated(true);
      }
    }).catch((err) => {
      console.log("error message:", err.message);

    })


  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-700">
        {/* Header */}
        <div className=" from-cyan-900 to-blue-900 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <UserCircleIcon className="w-12 h-12 text-cyan-300" />
          </div>
          <h1 className="text-3xl font-bold text-white">GMGTNF</h1>
          <p className="text-cyan-200 mt-2">Welcome back</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-0 text-sm font-medium">
                UserEmail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircleIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your Email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-cyan-600 rounded bg-gray-700 border-gray-600 focus:ring-cyan-500" />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4  from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Sign In
            </button>
          </form>

          <div className="mt-0 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Create one now
              </Link>
            </p>
          </div>
          {loading && <p className='text-white text-center'>loading..</p>}

          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-center text-sm text-gray-400">
              © 2024 GMGTNF. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
