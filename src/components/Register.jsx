import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    
  });
  const [loading,setLoading]=useState(false)
  const navegate=useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true)
    // Registration logic here
   await axios.post("https://social-media-backend-2-topf.onrender.com/api/user/register",{

      name:formData.username,
      email:formData.email,
      password:formData.password

    }).then((res)=>{
      if(!res){
        return alert("registration failed")
      }
      
      else{
        setLoading(false)
        alert("registration successful");
        localStorage.setItem("userInfo",JSON.stringify(res.data));
        navegate("/login")
        
      }

    }).catch((err)=>{
      alert("no data found")
      console.log("error message:",err.message);
      
    })
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Registration form fields */}
          <div>
            <input
              type="text"
              placeholder="Username"
              onChange={(e)=>{setFormData({...formData,username:e.target.value})}}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white"
          >
            Register
          </button>
        </form>
        {loading && <p className='text-white text-center'>Loading..</p>}
        <p className="mt-4 text-gray-400">
          Already have an account? <Link to="/login" className="text-cyan-400">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;