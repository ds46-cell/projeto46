import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

app.post("/verify",async(req,res)=>{

  const {license_key,client,machine_id}=req.body

  const {data}=await supabase
    .from("licenses")
    .select("*")
    .eq("license_key",license_key)
    .single()

  if(!data){
    return res.json({valid:false})
  }

  if(data.status!=="active"){
    return res.json({valid:false})
  }

  res.json({
    valid:true,
    client:data.client_name
  })
})

app.listen(4000,()=>{
  console.log("🔥 LICENSE SERVER ULTRA ON")
})