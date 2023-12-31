import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const Sidebar = () => {

  const navigate = useNavigate()


  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div className="fixed  ml-10 w-[280px] h-[550px] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] m-2">
      <ul className={`text-xl flex flex-col font-semibold space-y-6  mt-4 `}>
        <Link to="/app/home">
          <li className="flex items-center cursor-pointer hover:bg-gray-200 p-2 hover:text-gray-700">
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
        <Link to="/app/notification">
          <li className="flex items-center cursor-pointer hover:bg-gray-200 p-2 hover:text-gray-700">
            <IoIosNotifications className="text-2xl mr-2 ml-10" />
            Notification
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
