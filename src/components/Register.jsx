import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://social-media-backend-2-topf.onrender.com/api/user/register",
        {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      // 🔐 Save JWT token
      localStorage.setItem("token", res.data.token);

      // Save user info
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registration successful");
      navigate("/");

    } catch (err) {
      console.log("Register error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
