import AllPosts from "../components/AllPosts"
import PostCard from "../components/PostCard"

const Home = () => {


  return (
    <div >
  <div className="">
  

<div className="flex flex-col ml-[300px]">
      {/* Post Card */}
      <PostCard/>

      {/* user posts */}
      <AllPosts/>
</div>

</div>

    </div>
  )
}

export default Home