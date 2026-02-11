import { FaUserCircle } from "react-icons/fa";
import { format } from "timeago.js";
import { motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";

const CommentModal = ({ show, onClose, post, text, setText, addComment,deletedComment }) => {

  if (!show) return null;

  //deleted api..
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end">
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        exit={{ y: 300 }}
        className="bg-gray-900 w-full max-w-xl rounded-t-3xl p-4 h-[75vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <h2 className="text-white font-semibold text-lg">Comments</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto mt-3 space-y-3">
          {post.comments?.map((c) => (
            <div key={c._id} className="flex gap-3">
              <FaUserCircle className="text-2xl text-gray-400" />
              <div className="bg-gray-800 rounded-xl px-3 py-2">
                <div className="flex gap-4">
                  <span className="text-sm text-white font-semibold">
                    {c.postedBy?.name}
                  </span>
                  {c.postedBy._id === JSON.parse(localStorage.getItem("user"))._id && (
                    <button
                      onClick={() => deletedComment(post._id, c._id)}
                      className="text-red-500 hover:text-red-400 text-xs mt-1"
                    >
                      < RiDeleteBin6Line/>
                    </button>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{c.text}</p>

                <span className="text-xs text-gray-500">
                  {format(c.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-700 pt-3 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white outline-none"
          />

          <button
            onClick={addComment}
            className="px-5 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CommentModal;
