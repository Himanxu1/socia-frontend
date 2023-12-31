import { useParams } from 'react-router-dom'
import banner from '../assets/banner.png'
import avatar from '../assets/avatar.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../utils/slices/postSlice'
import { ToastContainer } from 'react-toastify'
import { showToast } from '../utils/toast'


const UserProfile = () => {
    const {id} = useParams()


    const [data,setData] = useState(null)
    const [userPost,setUserPost] = useState([])
    const [isfollowing,setIsfollowing] = useState(false)
    const [followingUser,setFollowingUser] = useState([])
    const [userdata ,setUserdata] = useState(null)
    const user = useSelector((store)=>store.auth.items)
    const postChange = useSelector((store)=>store.post.items)

    const dispatch = useDispatch()


    const handleFollow = ()=>{

      if(isfollowing){
    
        //  unfollow request and also change the following to follow
        axios.post(import.meta.env.VITE_BACKEND_URI+'/api/user/unfollow',{userId:user.id,followerId:id}).then((res)=>{
      
          dispatch(addPost(!postChange))
          //  change the follow into following
          setIsfollowing(false)
         showToast("unfollowed")
            
        }).catch((err)=>{
          console.log(err)
        })

      }else{
        axios.post(import.meta.env.VITE_BACKEND_URI+'/api/user/follow',{userId:user.id,followerId:id}).then((res)=>{
        
          dispatch(addPost(!postChange))
          //  change the follow into following
          setIsfollowing(true)
          showToast("followed")
            
        }).catch((err)=>{
          console.log(err)
        })
      }

    }

    useEffect(()=>{
      axios.get(import.meta.env.VITE_BACKEND_URI+`/api/user/${id}`).then((res)=>{
        setData(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    },[id])

    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URI+`/api/post/id/${id}`).then((res)=>{
          setUserPost(res.data.post)
        }).catch((err)=>{
          console.log(err)
        })
      },[id])

    useEffect(()=>{
     axios.get(import.meta.env.VITE_BACKEND_URI+`/api/user/getdata/${id}`).then((res)=>{
      setUserdata(res.data)
     }).catch((err)=>{
      console.log(err)
     })
    },[id,postChange])  

    useEffect(()=>{
      axios.get(import.meta.env.VITE_BACKEND_URI+`/api/user/getdata/${user?.id}`).then((res)=>{
       setFollowingUser(res.data.following)
       }).catch((err)=>{
        console.log(err)
       })
    },[])

    useEffect(()=>{
       const tempuser =  followingUser.filter((item)=> item.id ===  Number(id))
      
       if(tempuser[0]?.id === Number(id)){
        setIsfollowing(true)
       }else{
        setIsfollowing(false)
       }

    },[id,followingUser])


    // console.log(isfollowing);
    
  return (
    <div className='ml-[340px]'>
      <ToastContainer/>
        <div className='relative'>
            <img  src={banner} className='w-[600px] h-[180px] object-cover mt-2 rounded' />
        <div className='absolute  top-32 left-10'>
            <img  src={data?.profile_url ? data?.profile_url : avatar}  className='w-32 h-32' />
        </div>
        </div>
        <div className='flex flex-col items-center justify-center p-2 mt-10'>
            <div>
            <button className='px-4 py-2 border border-black font-semibold rounded hover:bg-black hover:text-white bg:border-white' onClick={handleFollow}>{ isfollowing ? 'Following':"Follow"} </button>
            </div>
            <div className='flex w-[400px] justify-evenly'>
                <div className='flex flex-col items-center p-2'>
                    <p className='font-bold text-xl'>{userdata?.numberOfFollowers}</p>
                    <p>FOLLOWERS</p>
                </div>
                <div className='flex flex-col  items-center p-2'>
                    <p className='font-bold text-xl'>{userdata?.numberOfPosts}</p>
                    <p>POSTS</p>
                </div>
                <div className='flex flex-col items-center p-2'>
                    <p className='font-bold text-xl'>{userdata?.numberOfFollowing}</p>
                    <p>FOLLOWINGS</p>
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center'>
            <p className='font-mono'>@{data?.name}</p>
            <p>{data?.bio ? data?.bio : 'this is default bio' }</p>
        </div>
        <div className='ml-20'>
            {
               userPost.length === 0  ? <p className='text-start font-semibold'>No Post YET</p> :    userPost?.map((item)=>{
                    return (
                        <Post key={item.id} postId={item.id} title={item.title} img={  item.img[0] !== '' ? item.img:""} author={item.author.name} createdAt={item.create_at} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default UserProfile