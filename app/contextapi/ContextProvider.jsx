"use client"
import axios from "axios"
import { createContext, useEffect, useState } from "react";
export const Context = createContext()

const ContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isloggedin, setIsloggedin] = useState(false)

  const getuserdata = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/user/userdata', { withCredentials: true })
      if (data.success && data.user) {
        setLoading(false)
        setUser(data.user)
      } else {
        console.error("Failed to fetch user data:", data.message)
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message)
    }
  }
  const getAuthstatus = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/auth/login', { withCredentials: true });
      if (data.success) {
        setIsloggedin(true)
        getuserdata()
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getAuthstatus()
  }, [])
  const value = {
    user,
    isloggedin,
    loading,
    getuserdata,
    setIsloggedin,
    setUser
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
