import { useDispatch, useSelector } from 'react-redux';
import avatar from '../assets/avatar.png';
import banner from '../assets/banner.png';
import { LiaEditSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from '../utils/constants';
import axios from 'axios';
import Post from './Post';
import { updateUser } from '../utils/slices/authSlice';


const Profile = () => {


    const user = useSelector((store)=>store.auth.items)
    const postChange = useSelector((store)=>store.post.items)
    const {bio,name,email,id} = user
    const [showModal,setShowModal] = useState(false)
    const [updateName,setUpdateName] = useState("")
    const [updateBio,setUpdateBio] = useState("")
    const [userPosts,setUserPosts] = useState([])
    const [url,setUrl] = useState("")
    const [data,setData] = useState({})
    const [isdelete,setIsDelete] = useState(true)
    const [userdata ,setUserdata] = useState(null)

    
    const dispatch = useDispatch()

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

      const handleSave = () =>{
         dispatch(updateUser(data))
         setShowModal(false)
      }

      useEffect(()=>{
        
        axios.get(import.meta.env.VITE_BACKEND_URI+`/api/post/id/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
        }
      }
        ).then((res)=>{

          setUserPosts(res.data.post)
        }).catch((err)=>{
          console.log(err)      
        })
      },[postChange,id])


      useEffect(() => {
        setData((prevData) => {
          const newData = { ...prevData }; // Create a copy of the previous data
          newData.userid = id
          if (updateName !== "") {
            newData.name = updateName;
          }
          if(updateBio != ""){
            newData.bio = updateBio
          }
          if (url !== "") {
            newData.avatar = url;
          }
    
          return newData; // Return the updated data object
        });
      }, [updateBio, updateName, url,id]);

      useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URI+`/api/user/getdata/${id}`).then((res)=>{
         setUserdata(res.data)
        }).catch((err)=>{
         console.log(err)
        })
       },[id,postChange])  

  return (
    <div className='ml-[340px]'>
        <img src={banner} className="mt-2 relative w-[600px] h-[170px]  object-cover p-2 rounded-xl ml-2" />
           <img  src={  user.profile_url ? user.profile_url : avatar} className='w-32 h-32 absolute top-40 left-[460px]' />
        <div className='relative pt-24 pl-20  w-[600px] h-[200px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ml-4'> 
           <LiaEditSolid  className='text-3xl  absolute  top-10 left-[550px] cursor-pointer hover:text-gray-400' onClick={()=>setShowModal(true)}/>
        <div className='flex justify-between'>

           <h1 className='text-xl font-serif font-semibold  '>{name}</h1>
           <h1 className='font-medium  mr-10 '>{email}</h1>
        </div>
           <h1 className='font-medium'>{bio ? bio :"This is default Bio"}</h1>
           <div className='flex items-center '>
           <div className='flex items-center p-2'>
                    <p className='font-bold text-xl'>{userdata?.numberOfFollowers}</p>
                    <p className='ml-1'>FOLLOWERS</p>
                </div>
                <div className='flex  items-center p-2'>
                    <p className='font-bold text-xl'>{userdata?.numberOfPosts}</p>
                    <p className='ml-1'>POSTS</p>
                </div>
                <div className='flex items-center p-2'>
                    <p className='font-bold text-xl'>{userdata?.numberOfFollowing}</p>
                    <p className='ml-1'>FOLLOWINGS</p>
                </div>

           </div>
        </div>

        {
            showModal? (
                <>
                <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-2xl font-semibold">
                        Edit Profile
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
    
                    <div className="relative px-4 flex-auto w-[500px] h-[280px] p-2">
                    
                    <div className='flex flex-col'>
                        <div>
                        <div className="w-20">
                        <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                         onChange={onFileChange}
                        />
                <label
                  htmlFor="fileInput"
                  className=" "
                >
                  <img  src={ url? url : avatar } className='w-20 h-20 hover:opacity-70 cursor-pointer object-cover rounded-full'  />
                </label>
                            </div>
                        
                        </div>
                        <div className='p-2 flex flex-col'>
                        <lable className="font-semibold">Name</lable>
                        <input  type='text'  className='py-2 border rounded' value={updateName} onChange={(e)=>setUpdateName(e.target.value)}  />
                        </div>
                    </div>
                    <div className='flex flex-col p-2'>
                        <lable className="font-semibold">Bio</lable>
                        <input  type='text' className='py-2 border rounded' value={updateBio} onChange={(e)=>setUpdateBio(e.target.value)}  />
                    </div>

                    </div>
                      
    
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                   
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={()=>setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ): null
        }
        <div>
 
       {
           userPosts.length === 0 ? <p className='p-10 text-xl font-bold font-sans'>No Post yet !!</p>         :     userPosts?.map((item)=>{
          return (
             <div key={item.id} className='ml-16 '>
            
              <Post key={item.id} title={item.title} img={ item.img[0] !=='' ? item.img : ""} author={item.author.name} createdAt={item.create_at} isdelete={isdelete} postId={item.id} />
              </div>

          )
        })
       }

   
        </div>
    </div>
  )
}

export default Profile