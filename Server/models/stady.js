const { query } = require("express");
const db =require("../config/connection");

class StadyModel {


static async getstady()
{
   return new Promise (resolve =>{
        
    db.query("select * from stady ",[],(error,result)=>{
        if (!error)
        resolve(result)
    });

   });
}

static async addstady(teacherid,coursid,studentid )
{
   return new Promise (resolve =>{
      db.query("insert into stady (teacherid,coursid,studentid) values(?,?,?)",[teacherid,coursid,studentid],(e,r)=>{
      if(!e)
      resolve(true)
      else{
        console.log("error",e);
      resolve(false)
          }
      });
  
   });
}

static async deletestady(id)
{
   return new Promise (resolve =>{
      db.query("delete from stady where id=?",[id], (error,result)=>{
     if(error)
     resolve(false)
    else
    resolve(true)
      });
  
   });
}





static async edit(id,teacherid,coursid,studentid){

 return new Promise (resolve=> {
    db.query("update stady set teacherid=?,coursid=?,studentid=? where id=?",[teacherid,coursid,studentid,id],(error,result)=>{
        if(!error)
        resolve(true)
    })

 })

}

}
module.exports=StadyModel;