import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../utils/validation";
import { Formik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/authSlice";
import { showToast } from "../utils/toast";
import { ToastContainer } from "react-toastify";

const Login = () => {
    
  const initialValues ={
    email:"",
    password:""
  }
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values) => {
            // eslint-disable-next-line no-undef
            axios.post(import.meta.env.VITE_BACKEND_URI+ '/api/user/login',values).then((res)=>{
                localStorage.setItem('token',res.data.token)   
                dispatch(addUser(res.data.user))
      
                if(res.status == 200 || res.status == 201){
                
                    navigate('/app/home')
                    showToast("login successful")
                }
            }).catch((err)=>{
                console.log(err)
            })
          }}
    >
    {
        (formik)=>{
            const {
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
                
              } = formik;

            return (
  <div>
    <ToastContainer
    position="bottom-left"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
          <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
              <div>
                  <a href="/">
                      <h3 className="text-4xl font-bold text-purple-600">
                          Socia
                      </h3>
                  </a>
              </div>
              <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                  <form onSubmit={handleSubmit}>
              
                      <div className="mt-4">
                          <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 undefined"
                          >
                              Email
                          </label>
                          <div className="flex flex-col items-start">
                              <input
                                  type="email"
                                  name="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                          </div>
                          { errors.email && touched.email ?    <p className="text-red-400">{errors.email}</p>:null}
                      </div>
                      <div className="mt-4">
                          <label
                              htmlFor="password"
                              className="block text-sm font-medium text-gray-700 undefined"
                          >
                              Password
                          </label>
                          <div className="flex flex-col items-start">
                              <input
                                  type="password"
                                  name="password"
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                          </div>
                          { errors.password && touched.password ?    <p className="text-red-400">{errors.password}</p>:null}
                      </div>
          
                      <a
                          href="#"
                          className="text-xs text-purple-600 hover:underline"
                      >
                          Forget Password?
                      </a>
                      <div className="flex items-center mt-4">
                          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit">
                              Login
                          </button>
                      </div>
                  </form>
                  <div className="mt-4 text-grey-600">
                      New User?
                      <span>
                          <Link className="text-purple-600 hover:underline" to='/signup' >
                              Register
                          </Link>
                      </span>
                  </div>
               
              </div>
          </div>
      </div>
            )
        }
    }
    </Formik>
    
  );
}

export default Login