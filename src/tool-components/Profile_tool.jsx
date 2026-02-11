import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { format } from "timeago.js";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "./DeleteModel";

const Profile_tool = () => {

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal,setShowModal]=useState(false)
  const [deleteId, setDeleteId] = useState(null);

   const openModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  useEffect(() => {
    fetch('https://social-media-backend-2-topf.onrender.com/api/user/profile', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  //delete hanlder..

  const handlerDeleted=async()=>{
   

    try {
      const res=await fetch(`http://localhost:2002/api/products/delete/${deleteId}`,{
        method:"DELETE",
        headers:{
           Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      await res.json();
      
      setProfile(profile.filter((p)=>p._id !==deleteId))
      closeModal()
    } catch (error) {
      console.log(error);
      
    }
    
  }
 

  return (
    <>
    
      <DeleteModal
        show={showModal}
        onClose={closeModal}
        onConfirm={handlerDeleted}
      />
    <div className="min-h-screen bg-gray-100">

      {/* 🔵 Cover Photo */}
      <div className="h-52 bg-gradient-to-r from-blue-600 to-indigo-700 relative">

        {/* Avatar */}

        <div className="absolute -bottom-14 left-6">
          <div className="w-28 h-28 rounded-full bg-white p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-5xl text-gray-600">
              <FaUserCircle />
            </div>
          </div>
        </div>


      </div>

      {/* 🔵 Profile Info */}
      <div className="max-w-5xl mx-auto pt-20 px-4">
        <div className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {profile[0]?.postedBy?.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {profile.length} Posts
            </p>
          </div>

          <button className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition">
            Edit Profile
          </button>

        </div>

        {/* 🔵 Posts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Left Side Intro */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-semibold text-lg mb-2">Intro</h3>
              <p className="text-gray-600 text-sm">
                 |ADD BIO 🚀
              </p>
            </div>
          </div>

          {/* Right Side Posts */}
          <div className="md:col-span-2 space-y-5">

            {profile.map(post => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >

                {/* Post Header */}
                <div className="flex items-center gap-3 p-4 justify-between ">
                  <div className="flex items-center gap-3 ">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500">
                      <FaUserCircle />
                    </div>

                    <div>
                      <p className="font-semibold leading-none">
                        {post.postedBy?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {format(post.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button onClick={()=>openModal(post._id)} className="cursor-pointer"><RiDeleteBin6Line /></button>
                </div>

                {/* Text */}
                <div className="px-4 pb-2">
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-gray-700 text-sm">
                    {post.description}
                  </p>
                </div>

                {/* Image */}
                {post.image && (
                  <div className="w-full max-h-[420px] overflow-hidden">
                    <img
                      src={post.image}
                      className="w-full object-cover hover:scale-105 transition-transform duration-300"
                      alt="post"
                    />
                  </div>
                )}

              </div>
            ))}



          </div>
        </div>
      </div>

    </div>
    </>
  );
};


export default Profile_tool;
