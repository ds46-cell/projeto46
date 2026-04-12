import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Stats from "../modules/Stats"
import LiveLogs from "../modules/LiveLogs"

export default function Dashboard(){

  const [risk,setRisk] = useState(0)

  useEffect(()=>{
    const interval = setInterval(async()=>{
      const res = await fetch("http://localhost:3000/api/monitor")
      const data = await res.json()
      setRisk(data.riskScore)
    },2000)

    return ()=>clearInterval(interval)
  },[])

  return (
    <div className="dashboard">

      <motion.h1
        initial={{opacity:0}}
        animate={{opacity:1}}
      >
        🚀 Ultra Control Core
      </motion.h1>

      <Stats risk={risk} />
      <LiveLogs />

    </div>
  )
}