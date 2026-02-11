import { useEffect, useState } from 'react';
import { BiLike } from "react-icons/bi";
import { FaShareSquare, FaUserCircle } from "react-icons/fa";
import { format } from "timeago.js";
import { AiFillLike } from "react-icons/ai"
import { Link } from 'react-router-dom';

import { FaRegCommentDots } from "react-icons/fa6";
import CommentModal from "../tool-components/CommentModel"



const Home = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState({});
  //comment var..
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [text, setText] = useState("");


  const toggleExpand = (id) => {
    setExpandedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const playLikeSound = () => {
    const audio = new Audio("/sounds/likesound.mp3")
    audio.volume = 0.6
    audio.play()
  }


  useEffect(() => {
    fetch("http://localhost:2002/api/products/get")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err.message);
        setLoading(false);
      });
  }, []);

  //like api define
  const likePost = (id) => {
    playLikeSound()
    fetch("http://localhost:2002/api/user/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = product.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setProduct(newData)
        console.log(result);

      }).catch((err) => {
        console.log("err", err.message);

      })
  }

  //dislike api define..

  const DislikePost = (id) => {
    fetch("http://localhost:2002/api/user/dislikes", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {

        const newData = product.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setProduct(newData)


      }).catch((err) => {
        console.log("err", err.message);

      })
  }

  //comment api define..


  const addComment = () => {
    console.log("text", text);

    try {
      fetch("http://localhost:2002/api/user/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          postId: selectedPost._id,
          text
        })
      })
        .then(res => res.json())
        .then(result => {
          const newData = product.map((p) => {
            if (p._id === result._id) {
              return result;
            }
            return p;
          });

          setProduct(newData);
          setSelectedPost(result);
          setText("");
        });
    } catch (error) {
      console.log("error", error.message);

    }
  };

  //delete comment api define..

  const deletedComment = (postId, commentId) => {
    try {
      fetch("http://localhost:2002/api/user/deletecomment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          postId: postId,
          commentId: commentId
        })
      }).then((res) => res.json())
        .then((result) => {
          const newData = product.map((p) => {
            if (p._id === result._id) {
              return result
            } return p;
          })

          setProduct(newData);
          setSelectedPost(result);
        })
    } catch (error) {
      console.log("error deleting comment", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center py-6">
      <div className="w-full max-w-xl px-2">

        {/* 🔵 Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        <CommentModal
          show={showComment}
          onClose={() => setShowComment(false)}
          post={selectedPost || {}}
          text={text}
          setText={setText}
          addComment={addComment}
          deletedComment={deletedComment}
        />


        {/* 🔵 Feed */}
        {!loading && product.map((file) => (
          <div
            key={file._id}
            className="bg-gray-800/80 backdrop-blur border border-gray-700 rounded-2xl shadow-lg mb-6 overflow-hidden"
          >

            {/* Header */}

            <div className="flex items-center gap-3 p-4">
              <Link to={`profile/${file.postedBy?._id}`}>
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white text-2xl">
                  <FaUserCircle />
                </div>
              </Link>


        
                <div className="flex flex-col">
                  <span className="text-white font-semibold leading-none">
                    {file.postedBy?.name}
                  </span>
                  <span className="text-xs text-gray-400 pt-1">
                    {format(file.createdAt)}
                  </span>

                </div>
                
              
            </div>

            {/* Text */}
            <div className="px-4 pb-2 text-white">
              <h3 className="font-semibold text-lg">{file.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {expandedPosts[file._id]
                  ? file.description
                  : file.description?.slice(0, 90)
                }

                {file.description?.length > 90 && (
                  <span
                    onClick={() => toggleExpand(file._id)}
                    className="text-blue-400 cursor-pointer ml-1 hover:underline"
                  >
                    {expandedPosts[file._id] ? " See less" : " See more"}
                  </span>
                )}
              </p>

            </div>

            {/* Image */}
            {file.image && (
              <div className="w-full max-h-[400] overflow-hidden">
                <img
                  className="w-fit object-cover hover:scale-105 transition-transform duration-300"
                  src={file.image}
                  alt="post"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-around items-center text-gray-300 border-t border-gray-700 py-3">

              {
                file.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? (
                  <button onClick={() => { DislikePost(file._id) }} className="flex items-center gap-1 hover:text-blue-400 transition">
                    <AiFillLike className=" text-xl flex items-center gap-1 cursor-pointer text-blue-400 transition" />

                  </button>) : (<button onClick={() => { likePost(file._id) }} className="flex items-center gap-1 hover:text-blue-400 transition">
                    < BiLike className=" text-xl flex items-center gap-1 cursor-pointer hover:text-blue-400 transition" />

                  </button>)
              }
              <span>{file.likes.length} Likes</span>



              <button onClick={() => {
                setSelectedPost(file);
                setShowComment(true);
              }} className="flex items-center gap-1 hover:text-green-400 transition">
                <FaRegCommentDots
                  className="text-xl cursor-pointer" />

              </button>
              <span>{file.comments.length} Comment</span>
            </div>

          </div>
        ))}


      </div>
    </div>
  );
};

export default Home;
