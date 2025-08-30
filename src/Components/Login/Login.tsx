
import { useForm } from "react-hook-form";
import style from "./Login.module.css";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
interface AuthContextType {
    saveUserData: () => void;
  }
  const { saveUserData } = useContext(AuthContext) as AuthContextType;
   interface formData  {
    username: string ,
    password: string
  }
  let navigate = useNavigate();
  
 
  let {register , handleSubmit , formState:{errors}} =  useForm < formData> ()
 
const onSubmit = async (data: formData) => {
  try {
    let response = await axios.post("https://dummyjson.com/auth/login", data);
    localStorage.setItem("userToken", response.data.accessToken);
    console.log(response.data);
    saveUserData();
   
    

    toast.success("Login successful!");
    navigate("/dashboard");
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    toast.error("Login failed! Please check your credentials.");
  }
};
  return (
    <div className={`${style.loginContainer}`}>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-10 col-sm-8 col-md-5 bg-white p-5 rounded-4 shadow">
            <div className="text-title text-center p-3">
              <h2
                className={`text-center mb-4  formTitle ${style.formTitle} font-weight-bold  `}
              >
                User Management System
              </h2>
              <h3>SIGN IN</h3>
              <small className="text-secondary">
                Enter your credentials to access your account
              </small>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-secondary">
                  username
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  placeholder="Enter your username"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-danger">Username is required</span>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label text-secondary "
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-danger">Password is required</span>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100 mt-3 text-white"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
