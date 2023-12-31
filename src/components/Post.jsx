
import { AiOutlineLike } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { GoBookmarkSlashFill } from "react-icons/go";
import { FaComment } from "react-icons/fa";
import avatar from '../assets/avatar.png';
import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { addPost } from "../utils/slices/postSlice";
import { showToast } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import Comments from "./Comments";
import { postBookmark, removeBookmark } from "../utils/slices/BookmarkSlice";
import { IoBookmarkSharp } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const Post = ({title,img,author,postId,createdAt,isdelete,label,profileImg}) => {
const dateObject = new Date(createdAt);

const date = `${dateObject.getUTCDate()}/${dateObject.getUTCMonth() + 1}/${dateObject.getUTCFullYear()}`

  
  const user = useSelector((store)=>store.auth.items)
  const post = useSelector((store)=>store.post.items)
  const [isLiked,setisLiked] = useState(false)
  const [numberOfLikes,setNumberOfLikes] = useState(0);
  const [showComments,setShowComments] = useState(false)

  const dispatch = useDispatch()

  const handlePostDelete = ()=>{
    axios.delete(import.meta.env.VITE_BACKEND_URI+`/api/post/remove/${postId}`).then(()=>{
      dispatch(addPost(!post))
      showToast("deleted post")
    }).catch((err)=>{
      console.log(err) 
    })
  }

  const handleLike = ()=>{
    setisLiked(!isLiked)
    if(!isLiked){

      setNumberOfLikes((prev)=>prev+1)
      axios.post(import.meta.env.VITE_BACKEND_URI+'/api/like',{userId:user.id ,postId:postId}).then(()=>{
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      setNumberOfLikes((prev)=>prev-1)
      axios.post(import.meta.env.VITE_BACKEND_URI+'/api/like/unlike',{userId:user.id ,postId:postId}).then(()=>{
      
      }).catch((err)=>{
        console.log(err)
      })

    }

  }

  useEffect(()=>{
   axios.get(import.meta.env.VITE_BACKEND_URI+`/api/like/id/${postId}`).then((res)=>{
  
    setNumberOfLikes(res.data.numberOfLikes)
   }).catch((err)=>{
    console.log(err)
   })
  },[])
 
  const handleBookmark = ()=>{
       dispatch(postBookmark({userId:user?.id,postId}))
       showToast("bookmarked")
  }

  const handleUnbookmark = () =>{
    dispatch(removeBookmark({userId:user?.id,postId}))
    showToast("Unbookmarked")
  }

  return (
    <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[500px] p-2 mx-2 flex flex-col justify-center items-start rounded mt-2 border-black border">
      <ToastContainer/>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <img src={ profileImg ? profileImg :avatar}  className="w-10 h-10 rounded-full "/>
        <p className="ml-4 font-semibold ">{author}</p>
        <p className="text-xs ml-2 text-slate-500">{date}</p>
        </div>

      {
        isdelete ?   <div className="mr-4 text-2xl cursor-pointer" onClick={handlePostDelete}>
        <MdDelete className="hover: text-red-600"/>
      </div> : null
      }

    
      </div>
      <div className="flex flex-col items-center justify-center">
      <h1 className="text-start mx-12">{title}</h1>
      <div>
         {
           img ? <img src={img} className="w-[400px] h-[200px] mx-10" />: null
         }
      </div>
      </div>
      <div className="flex justify-between w-full px-10 text-2xl mt-3">
        <div className="flex items-center cursor-pointer " onClick={handleLike}>
          {isLiked ? <AiFillLike  />  :   <AiOutlineLike  /> }
        <div className="text-sm font-sans ml-2 flex"> <p className="font-semibold mr-1">{ numberOfLikes} </p> Like</div>
        </div>
        <div className="flex items-center cursor-pointer" onClick={()=>setShowComments(!showComments)}>
         <FaComment />
         <p className="text-sm font-sans ml-2">Comment</p>
        </div>
        <div  className="flex items-center cursor-pointer">
        <IoMdShareAlt />
        <p  className="text-sm font-sans ml-2">Repost</p>
        </div>
        {
          label 
          ?   
          
          <div className="flex items-center cursor-pointer" onClick={handleUnbookmark}>
          <GoBookmarkSlashFill />
          <p className="text-sm font-sans ml-2">Unbookmark</p>
          </div> :  <div className="flex items-center cursor-pointer" onClick={handleBookmark}>
        <IoBookmarkSharp />
        <p className="text-sm font-sans ml-2">Bookmark</p>
        </div>
        }
        
      </div>

      {
        showComments ? <Comments postId={postId} />:null
      }
    </div>
  )
}

export default Post