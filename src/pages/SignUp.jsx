import { Link } from "react-router-dom";
import { Formik } from "formik";
import { SignUpSchema } from "../utils/validation";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utils/toast";
import { useState } from "react";
import { Oval } from "react-loader-spinner";


  const SignUp = () => {
    const [loading,setLoading] = useState(false)

    const initialValues = {
        name:"",
        email: "",
        password: "",
        confirmPassword:""
      };
    const navigate = useNavigate();
      
    return (
        <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
            setLoading(true)
            // eslint-disable-next-line no-undef
            axios.post(import.meta.env.VITE_BACKEND_URI+'/api/user/signup',values).then(()=>{
                setLoading(false)
                showToast("Sign up successfully")
                navigate('/')
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
                <ToastContainer/>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-purple-600">
                            Socia
                        </h3>
                    </a>
                </div>
                <div className="absolute">
                {
                loading && <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
              }
              
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form onSubmit={handleSubmit} >
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            { errors.name && touched.name ?    <p className="text-red-400">{errors.name}</p>:null}
                        </div>
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
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            { errors.password && touched.password ?    <p className="text-red-400">{errors.password}</p>:null}
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    name="confirmPassword"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            { errors.confirmPassword && touched.confirmPassword ?    <p className="text-red-400">{errors.confirmPassword}</p>:null}
                        </div>
                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="flex items-center mt-4">
                            
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <Link className="text-purple-600 hover:underline"  to='/'>
                                Log in
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

export default SignUp