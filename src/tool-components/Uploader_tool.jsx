import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";

//https://social-media-backend-2-topf.onrender.com/api/products/post
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate=useNavigate()

  // Preview image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Cleanup memory
  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true)

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "insatCloud");

      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/dnfsx9e0k/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudData = await cloudRes.json();
      console.log("Cloudinary response:", cloudData);

      console.log("Sending to backend:", {
        title,
        description,
        image: cloudData.secure_url,
      });


      // "https://social-media-backend-2-topf.onrender.com/api/products/post",
      const token = localStorage.getItem("token") || localStorage.getItem("jwt");

      
      

      fetch("https://social-media-backend-2-topf.onrender.com/api/products/post", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          title,
          description,
          image: cloudData.secure_url,

        })
      }).then(res => res.json(),
        
        setLoading(false),
        alert("done"),
        navigate("/")


    )
        .catch(err => {
          console.log(err);
        })

    } catch (err) {
      console.log("ERROR:", err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create New Post
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <textarea
            placeholder="Post Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-64 object-cover rounded-lg border"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Uploading..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
