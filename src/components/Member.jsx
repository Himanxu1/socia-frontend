import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import avatar from '../assets/avatar.png'
import { Link } from "react-router-dom"

const Member = () => {


  const user = useSelector((store)=>store.auth.items)
  const [suggestedUser,setSuggestedUser] = useState([])
  const [filteredUser,setFilteredUser] = useState([])
  const [searchText,setSearchText] = useState("")

    useEffect(()=>{
     axios.get(import.meta.env.VITE_BACKEND_URI+`/api/user/all/${user.id}`).then((res)=>{
      
      setSuggestedUser(res.data)
      setFilteredUser(res.data)
     }).catch((err)=>{
      console.log(err)
     })
    },[])

    useEffect(()=>{
      const searchedUser = suggestedUser.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))

      setFilteredUser(searchedUser)
    },[searchText])



  return (
    <div >
        {/*  Search bar */}
        <div className="ml-320 mt-10">
            <input  type="text" placeholder="Search user" className="border border-black py-1 w-60 px-2 rounded-md"  onChange={(e)=>setSearchText(e.target.value)} />
        </div>
        {/* Show atleat 5 Users profile */}
        <div>
         {   filteredUser.length === 0  ?  <p className="p-2">no user found</p> :    filteredUser   ?.map((singleUser)=>{
            return (
              <Link key={singleUser.id} to={`/app/profile/${singleUser.id}`}>             
              <div key={singleUser.id} className='px-4 w-[230px] py-2 border flex rounded items-center border-black m-2 cursor-pointer hover:bg-gray-100'>
               
                  <img  src={singleUser.profile_url ? singleUser.profile_url : avatar} className="w-10 h-10 rounded-full" />
                  
               <p className="p-2 hover:text-blue-950">{singleUser.name}</p>
              </div>
              </Link>
            )
          })
         }

            
        </div>

    </div>
  )
}

export default Member