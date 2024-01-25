const { query } = require("express");
const db =require("../config/connection");

class ExamModel {


static async getexam()
{
   return new Promise (resolve =>{
        
    db.query("select * from exam ",[],(error,result)=>{
        if (!error)
        resolve(result)
    });

   });
}

static async addexam(start_time  , end_time , name , full_mark ,teacherid  )
{
   return new Promise (resolve =>{
      db.query("insert into exam (start_time,end_time,name,full_mark,teacherid) values(?,?,?,?,?)",[start_time,end_time,name,full_mark,teacherid],(e,r)=>{
      if(!e)
      resolve(true)
      else{
        console.log("error",e);
      resolve(false)
          }
      });
  
   });
}

static async deleteexam(id)
{
   return new Promise (resolve =>{
      db.query("delete from exam where id=?",[id], (error,result)=>{
     if(error)
     resolve(false)
    else
    resolve(true)
      });
  
   });
}





static async edit(id,start_time  , end_time , name , full_mark ,teacherid ){

 return new Promise (resolve=> {
    db.query("update exam set start_time=?,end_time=?,name=?,full_mark=?,teacherid=? where id=?",[start_time  , end_time , name , full_mark ,teacherid,id ],(error,result)=>{
        if(!error)
        resolve(true)
    })

 })






}

}
module.exports=ExamModel;
