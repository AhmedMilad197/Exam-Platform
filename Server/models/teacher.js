const { query } = require("express");
const db =require("../config/connection");

class TeacherModel {


static async getteacher()
{
   return new Promise (resolve =>{
        
    db.query("select * from teacher ",[],(error,result)=>{
        if (!error)
        resolve(result)
    });

   });
}

static async addteacher(name,username,password,image,specialist,lastlogin,active  )
{
   return new Promise (resolve =>{
      db.query("insert into teacher (name,username,password,image,specialist,lastlogin,active) values(?,?,?,?,?,?,?)",[name,username,password,image,specialist,lastlogin,active],(e,r)=>{
      if(!e)
      resolve(true)
      else{
        console.log("error",e);
      resolve(false)
          }
      });
  
   });
}

static async deleteteacher(id)
{
   return new Promise (resolve =>{
      db.query("delete from teacher where id=?",[id], (error,result)=>{
     if(error)
     resolve(false)
    else
    resolve(true)
      });
  
   });
}





static async edit(id,name,username,password,image,specialist,lastlogin,active){

 return new Promise (resolve=> {
    db.query("update teacher set name=?,username=?,password=?,image=?,specialist=?,lastlogin=?,active=? where id=?",[name,username,password,image,specialist,lastlogin,active,id],(error,result)=>{
        if(!error)
        resolve(true)
    })

 })






}

}
module.exports=TeacherModel;
