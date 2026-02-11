import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(
     // "https://social-media-backend-2-topf.onrender.com/api/user/login",
     " https://social-media-backend-4-67g5.onrender.com/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ Save token properly
    localStorage.setItem("token", data.token);
    localStorage.setItem("user",JSON.stringify(data.user))
    setIsAuthenticated(true);
    alert("Login successful");
    navigate("/");

  } catch (err) {
    console.log("Login error:", err.message);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-700">

        {/* Header */}
        <div className="p-8 text-center">
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
              <label className="block text-gray-300 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full pl-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>

          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-cyan-400">
                Register
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
