
import { useEffect, useState } from 'react';
import { BiLike } from "react-icons/bi";
import { FaShareSquare } from "react-icons/fa";
const Home = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)


  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetch("https://social-media-backend-2-topf.onrender.com/api/products/get")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products
        ),
          setLoading(false)
      }).catch((err) => {
        console.log("error", err.message);

      }
      )

  }, [])
  console.log(product);



  return (
    <div className='w-full'>


      <div className='' >
        {loading && <h1>Product is loading..</h1>}
        {product && product.map((file) => {
          return <div key={file._id} className='bg-gray-800 grid grid-cols-1 gap-3 m-2'>
            <div className=' flex m-2  '>
              <span className='bg-white w-9 rounded-2xl h-10' ></span>
              <div className=' pl-4 '>
                <span className=' text-white'>{user.User.name}</span>
                <p className='text-gray-500 text-sm '></p>
              </div>
            </div>
            <div className='text-white pl-2'>
              <h3>{file.title}</h3>
              <p>{file.description}</p>

            </div>
            <div>
              <img src={file.image} alt="" />
            </div>
            {/* <img className='w-full h-150' src={file.img} alt="" />*/}
            <div className='flex justify-center gap-30 [&>span]: text-white p-2'>
              <span className='text-2xl cursor-pointer hover:text-sky-900'><  BiLike/></span>
              <span className='text-2xl cursor-pointer hover:text-sky-900'><FaShareSquare/></span>
            </div>
          </div>
        })}
      </div>




    </div>
  );
};

export default Home;