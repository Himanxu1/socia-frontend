import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const Sidebar = () => {

  const navigate = useNavigate()


  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className="fixed  ml-0 w-[280px] h-[550px]  m-2">
      <ul className={`text-xl flex flex-col font-semibold space-y-6  mt-4 `}>
        <Link to="/app/home">
          <li className="flex items-center cursor-pointer hover:bg-gray-200  hover:rounded p-2 hover:text-gray-700">
            <FaHome className="text-2xl mr-2 ml-10 " />
            Home
          </li>
        </Link>
        <Link to="/app/explore">
          <li className="flex items-center cursor-pointer hover:bg-gray-200 p-2 hover:text-gray-700">
            <MdOutlineExplore className="text-2xl mr-2 ml-10" />
            Explore
          </li>
        </Link>
        
        <Link to="/app/bookmarks">
          <li className="flex items-center cursor-pointer hover:bg-gray-200 p-2 hover:text-gray-700">
            <FaCopy className="text-2xl mr-2 ml-10" />
            Bookmarks
          </li>
        </Link>
        <Link to="/app/profile">
          <li className="flex items-center cursor-pointer hover:bg-gray-200 p-2 hover:text-gray-700">
            <CgProfile className="text-2xl mr-2 ml-10" /> Profile
          </li>
        </Link>
        <li className="flex items-center cursor-pointer hover:bg-gray-200 p-2 hover:text-gray-700" onClick={handleLogout}>
          <IoIosLogOut className="text-2xl mr-2 ml-10"  /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
