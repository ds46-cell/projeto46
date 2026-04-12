import { useEffect, useState } from "react"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

export default function App(){

  const [auth,setAuth] = useState(false)

  return auth ? (
    <Dashboard />
  ) : (
    <Login onLogin={()=>setAuth(true)} />
  )
}