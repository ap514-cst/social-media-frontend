import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";

const User_Profile = () => {

  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://social-media-backend-4-67g5.onrender.com/api/user/userProfile/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user)
        setPosts(data.posts)
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

  return (
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
              {user[0]?.postedBy?.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {posts.length} Posts
            </p>
          </div>



        </div>

        {/* 🔵 Posts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Left Side Intro */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-semibold text-lg mb-2">Intro</h3>
              <p className="text-gray-600 text-sm">
                MERN Stack Developer | Learning & Building cool stuff 🚀
              </p>
            </div>
          </div>

          {/* Right Side Posts */}
          <div className="md:col-span-2 space-y-5">

            {posts.map(post => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >

                {/* Post Header */}
                <div className="flex items-center gap-3 p-4">
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
  );
};

export default User_Profile;
