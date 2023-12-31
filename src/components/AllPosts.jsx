import axios from "axios"
import { useEffect, useState } from "react"
import Post from "./Post";
import { useSelector } from "react-redux";

const AllPosts = () => {
  
  const postChange = useSelector((store)=>store.post.items)
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
      const config = {
        headers: {
          Authorization: localStorage.getItem('token'), 
        }
      };
      axios.get(import.meta.env.VITE_BACKEND_URI+"/api/post",config).then((res)=>{
      setLoading(false)
        setPosts(res.data.post)
      }).catch((err)=>{
        console.log(err)
      })
    },[postChange])


    if(loading) return <h1>Loading..</h1>
  return (
    <div>
{
    posts.map((item,index)=>{
        return (
            <Post  title={item.title} key={index} img={  item.img[0] !='' ? item.img:null} author={item.author.name}  profileImg={item.author.profile_url} postId={item.id} createdAt={item.create_at}  />
        )
    })
}
        
    </div>
  )
}

export default AllPosts