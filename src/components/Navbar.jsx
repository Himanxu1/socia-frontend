import { BsLightning } from "react-icons/bs";
import { BsLightningFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "../utils/slices/themeSlice";

const Navbar = () => {

  const dispatch = useDispatch()
  const theme = useSelector((store)=>store.theme.theme)

  return (
    <div className="flex fixed justify-between text-xl h-[60px]  w-full bg-black text-white items-center "> 
      <h1 className="ml-20">Socia</h1>
        <ul className="flex mr-20 justify-between w-[300px]">
            <li className="ml-32">Change theme</li>
            {
              theme === 'light' ?    <li className="cursor-pointer" onClick={()=>dispatch(darkMode())}><BsLightning className="text-yellow-300 text-2xl"/></li> : <li className="text-2xl cursor-pointer" ><BsLightningFill className="text-yellow-300 text-2xl" onClick={()=>dispatch(lightMode())}/></li>
            }
        </ul>
    </div>
  )
}

export default Navbar