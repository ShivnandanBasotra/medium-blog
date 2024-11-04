import { useSetRecoilState } from "recoil";
import authAtom from "../atoms/auth";
import {AuthSchema} from "@shiv.100xdevs/medium-common";
import { useState } from "react";
import axios from "axios";
import {backendUrl} from "../../config"
import user from "../atoms/user";

export default function SigninPage() {
  const setCurrentPage = useSetRecoilState(authAtom);
  const [authInputs, setAuthInputs] = useState<AuthSchema>({
    email: '',
    password: '',
  })
  const setUser = useSetRecoilState(user);
  async function handleSignin (e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
     try {
      const response = await axios.post(`${backendUrl}/api/v1/user/signin`,authInputs);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
     } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Error:', error.response?.data || error.message);
      } else {
        console.log('An unexpected error occurred:', error);
      }
     }
     
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <div className="mb-4 ">
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-sm text-gray-600">Access your account</p>
        </div>
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={authInputs.email}
                onChange={(e)=>{setAuthInputs(prev=>({...prev,email:e.target.value}))}}
                placeholder="Enter your email"
                required
                className="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-black"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={authInputs.password}
                onChange={(e)=>{setAuthInputs(prev=>({...prev,password:e.target.value}))}}
                placeholder="Enter your password"
                required
                className="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-black"
              />
            </div>
            {/* {error && (
              <div className="px-4 py-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg">
                {error}
              </div>
            )} */}
          </div>
          <div className="flex flex-col mt-6 space-y-4">
            <button type="button" onClick={handleSignin} className="w-full px-4 py-2 font-semibold text-white bg-black rounded-lg hover:bg-slate-800 focus:outline-none focus:ring focus:ring-blue-200">
              Sign In
            </button>
            <div className="text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <a onClick={()=>setCurrentPage('signup')} className="text-slate-900 bold hover:underline cursor-pointer">
                Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
