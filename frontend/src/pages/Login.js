import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios"
import {useLocation, useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import "../styles/AuthStyles.css"
import { useAuth } from "../contexts/auth";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password})
      if(res && res.data.success) {
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem("auth", JSON.stringify(res.data))
        navigate(location.state || "/")
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Registration Error!")
    }
  }

  return (
    <Layout>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h2 className="title">LogIn</h2>
          
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            LogIn
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
