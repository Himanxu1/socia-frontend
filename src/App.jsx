import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Member from "./components/Member";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllPosts } from "./utils/slices/postSlice";


function App() {
  const theme = useSelector((store) => store.theme.theme);
  const dispatch = useDispatch();
  dispatch(fetchAllPosts());

  const bg = theme === "dark" ? "bg-blue-950" : "bg-white";
  const text = theme === "dark" ? "text-white" : "text-black";
  return (
    <>
      <Navbar />
      <div
        className={` flex pt-12 justify-between w-full px-20  ${bg} ${text}`}
      >
        <Sidebar />
        <Outlet />
        <Member />
      </div>
    </>
  );
}

export default App;
