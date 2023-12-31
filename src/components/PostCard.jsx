/* eslint-disable no-undef */
import { useState } from "react"
import { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } from "../utils/constants";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import avatar from '../assets/avatar.png'
import { addPost } from "../utils/slices/postSlice";
import {ToastContainer} from 'react-toastify'
import { showToast } from "../utils/toast";



// const backend_url = process.env.REACT_APP_BACKEND_URI


const PostCard = () => {
  
  // eslint-disable-next-line no-undef
  const user = useSelector((store)=>store.auth.items)
  const postChange = useSelector((store)=>store.post.items)
  const dispatch = useDispatch();

  const [showModal,setShowModal] = useState(false);

  const [url, setUrl] = useState("");
  const [title,setTitle] = useState("")
  
  
  

  const onFileChange = (event) => {

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== "") {
          const uploadedFileUrl = data.secure_url;
          setUrl(uploadedFileUrl);
        
        }
      })
      .catch((err) => console.error(err));
  };

  const onFileUpload = () => {
    const data = { title,authorId:user.id, img: [url] };
  
    axios
      .post(import.meta.env.VITE_BACKEND_URI+'/api/post/create', data,
       {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      }
      )
      .then(() => {
       
        dispatch(addPost(!postChange))
         showToast("Post successful")
         handleClose()
      })
      .catch((err) => {
        console.log(err);
        
      });
  };


  const handleClose = ()=>{
    let convertingDate = new Date().toString();
      convertingDate = convertingDate.split('G')[0].trim()
    setUrl("");
    setShowModal(false)
  }

  return (

    <div>
      <ToastContainer/>
    <div className=" flex items-center w-[500px] h-20 m-2 p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <img src={ user.profile_url ? user.profile_url :  avatar}  className="w-12 h-12 rounded-full"/>
       <div className="border border-grey-100 p-4  ml-2 cursor-pointer rounded-xl w-full" onClick={()=>setShowModal(true)}>
        <h1>Share Post</h1>
       </div>
    </div>
   <div>
   {showModal ? (
        <>
          <div
            className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Share Your thought
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative px-4 flex-auto w-[400px] h-[80px]">
                  <textarea className="w-full p-2 h-full resize-none border-2 border-black "  onChange={(e)=>setTitle(e.target.value)}  />
                </div>
                  <div className="flex justify-center">
                    
                {url ? (
                  <img src={url} alt="product" className="w-[92%]  h-40 object-fit mt-2" />
                ) : null}
              </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div className="mr-20">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={onFileChange}
            />
            <label
              htmlFor="fileInput"
              className=" font-bold border border-gray-400 px-4 py-2 "
            >
              Choose
            </label>
            <span id="fileName"></span>
          </div>
          
          {/* <div className="absolute top-56">
          {showEmoji && <div className="emoji-container">
                    <EmojiPicker onEmojiClick={onEmojiClick} disableSearchBar={true} pickerStyle={{height: "15rem", width: "15rem"}}/>

                  </div>}
          </div> */}
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onFileUpload}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
   </div>
    </div>
  )
}




   



export default PostCard