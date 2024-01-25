/*const { query } = require("express");
const db =require("../config/connection");

class UserModel {


static async getuser()
{
   return new Promise (resolve =>{
        
    db.query("select * from user ",[],(error,result)=>{
        if (!error)
        resolve(result)
    });

   });
}

static async adduser(name , email , password)
{
   return new Promise (resolve =>{
      db.query("insert into user (name,email,password) values(?,?,?)",[name,email,password],(e,r)=>{
      if(!e)
      resolve(true)
      else{
        console.log("error",e);
      resolve(false)
          }
      });
  
   });
}

static async deleteuser(id)
{
   return new Promise (resolve =>{
      db.query("delete from user where id=?",[id], (error,result)=>{
     if(error)
     resolve(false)
    else
    resolve(true)
      });
  
   });
}


static async edit(id,name,email,password){

 return new Promise (resolve=> {
    db.query("update user set name=?,email=?,password=? where id=?",[name,email,password,id],(error,result)=>{
        if(!error)
        resolve(true)
    })

 })






}

}
module.exports=UserModel;
*/