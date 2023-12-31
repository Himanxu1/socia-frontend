import {  useSelector } from "react-redux"
import Post from "../components/Post"
import { useEffect, useState } from "react"



const Explore = () => {

  const allposts = useSelector((store)=>store.post.posts)
  const [sortedPost,setSortedPost] = useState([])
  const [activeTab,setActiveTab] = useState("trending")
  

  const handleChangeButton = (category)=>{
     if(category =="trending"){
      const sortedTrendingPosts = [...allposts].sort(
        (postA, postB) => postB.likes.length - postA.likes.length
      );
      setActiveTab("trending")
      setSortedPost(sortedTrendingPosts)
    
     }else if(category == "recent"){
      const recentPost = [...allposts].sort(
        (postA, postB) => new Date(postB.create_at) - new Date(postA.create_at)
      );
      setActiveTab("recent")
       setSortedPost(recentPost)
     }else{
      const oldPost = [...allposts].sort(
        (postA, postB) =>  new Date(postA.create_at) - new Date(postB.create_at)
      );
        setActiveTab("old")
        setSortedPost(oldPost)
     }
     
  }
  const defaultStyle = "px-2 py-1 border border-black rounded-xl"

  useEffect(()=>{
    handleChangeButton("trending")
  },[])


  return (
    <div className="p-4 ml-[380px]">
        <div >
            <h1 className="text-2xl mb-2 ">Explore</h1>
            <div className="flex w-[220px] justify-between">
                <button className={ activeTab === "trending" ?  ` ${defaultStyle} bg-purple-700 text-white hover:text-white hover:bg-purple-400` :  `${defaultStyle} bg-purple-400`} onClick={()=>handleChangeButton("trending")}>Trending</button>
                <button  className= { activeTab === "recent" ?  ` ${defaultStyle} bg-purple-700 text-white hover:text-white hover:bg-purple-400` : `${defaultStyle} bg-purple-400`} onClick={()=>handleChangeButton("recent")}>Recent</button>
                <button  className={ activeTab === "old" ?     ` ${defaultStyle} bg-purple-700 text-white hover:text-white hover:bg-purple-400` : ` ${defaultStyle} bg-purple-400`}  onClick={()=>handleChangeButton("old")}>Old</button>
            </div>
        </div>

  {/* Suggested feed based on the active button  */}
            <div>
               
               {
                sortedPost.map((item)=>{
                  return  (
                    <Post  key={item.id} title={item.title} img={ item.img !='' ? item.img:""} author={item.author.name}  postId={item.id} createdAt={item.create_at}  />
                  )
                })
               }

            </div>
          
    </div>
  )
}

export default Explore