import { supabase } from "./database.js"

export async function registerEvent(type,data){

 await supabase
  .from("system_logs")
  .insert([{
   type,
   data,
   created_at:new Date()
  }])

}

export async function riskEngine(){

 const {data} = await supabase
  .from("system_logs")
  .select("*")
  .order("created_at",{ascending:false})
  .limit(50)

 let score = 0

 if(data){

  data.forEach(log=>{

   if(log.type==="failed_login") score+=10
   if(log.type==="license_block") score+=50
   if(log.type==="admin_login") score+=1

  })

 }

 return score

}