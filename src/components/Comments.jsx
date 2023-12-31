import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import avatar from '../assets/avatar.png'
import { useDispatch } from 'react-redux';
import { fetchCommentsByPostId, postComment } from "../utils/slices/CommentSlice";

// eslint-disable-next-line react/prop-types
const Comments = ({postId}) => {
    const user = useSelector((store)=>store.auth.items)
    const comments = useSelector((state) => state.comments);
    const [replyText,setReplyText] = useState("")

    const dispatch = useDispatch()
    const handleReply = ()=>{
     dispatch(postComment({userId:user.id,postId,content:replyText}))
     setReplyText("")
     dispatch(fetchCommentsByPostId(postId))
    }

    useEffect(()=>{
      dispatch(fetchCommentsByPostId(postId))
    },[postId,dispatch])
   

  return (
    <div className="p-2 px-10">
        <div>
            <input type="text" placeholder="type your comment" className=" bg-slate-200 px-2" onChange={(e)=>setReplyText(e.target.value)} value={replyText} />
            <button className="px-2  ml-2 text-white bg-black rounded-md" onClick={handleReply}>Reply</button>
        </div>
         {/* comments */}
         <div>
            {
              comments.length == 0 ? <p>no comments</p> :    comments.map((item)=>{
                   return (
                    <div key={item.id}> 
                         <div className=" flex py-4 items-center">
                            <img src={avatar} className="w-10 h-10" />
                            <div className="flex flex-col ml-2">
                            <p className="ml-1 text-sm font-semibold">{item?.user?.name}</p>
                            <p className="ml-1">{item?.content}</p>
                            {/* <MdReply className="text-xl hover:text-gray-500 cursor-pointer"/> */}
                            </div>
                        </div>
                          

                    </div>

                
                   )
                })
            }

         </div>

    </div>
  )
}

export default Comments