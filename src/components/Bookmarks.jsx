import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Post from "./Post"
import { fetchBookmark } from "../utils/slices/BookmarkSlice"

const Bookmarks = () => {
    const user = useSelector((store)=>store.auth.items)
    const bookmarkpost = useSelector((store)=>store.bookmark.bookmarks)
    const dispatch = useDispatch()

     
    useEffect(()=>{
     dispatch(fetchBookmark(user?.id))
    },[])

  return (
    <div className="ml-[300px]">
      <h1 className="p-2 text-2xl font-semibold">All Your Bookmarks📃</h1>
        {
             bookmarkpost?.length === 0 ? <p className="py-4 font-semibold text-2xl">No Bookmarks</p> :  bookmarkpost?.map((item)=>{
                return(
                    <Post key={item.id}  author={item.user.name} title={item.post.title} img={ item.post.img != ''  ?  item.post.img:""}  createdAt={item.created_at} postId={item.post_id}  label="bookmark" />
                )
            })
        }
    </div>
  )
}

export default Bookmarks