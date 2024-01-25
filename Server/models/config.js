const { query } = require("express");
const db =require("../config/connection");

class ConfigModel {


static async getconfig()
{
   return new Promise (resolve =>{
        
    db.query("select * from config ",[],(error,result)=>{
        if (!error)
        resolve(result)
    });

   });
}

static async addconfig(name , email , nameadmin , password , active , goals , vision ,faccbook , phone , address)
{
   return new Promise (resolve =>{
      db.query("insert into config (name,email,nameadmin,password,active,goals,vision,faccbook,phone,address) values(?,?,?,?,?,?,?,?,?,?)",[name,email,nameadmin,password,active,goals,vision,faccbook,phone,address],(e,r)=>{
      if(!e)
      resolve(true)
      else{
        console.log("error",e);
      resolve(false)
          }
      });
  
   });
}

static async deleteconfig(id)
{
   return new Promise (resolve =>{
      db.query("delete from config where id=?",[id], (error,result)=>{
     if(error)
     resolve(false)
    else
    resolve(true)
      });
  
   });
}





static async edit(id,name,email,nameadmin	,password,active,goals,vision,faccbook,phone,address){

 return new Promise (resolve=> {
    db.query("update config set name=?,email=?,nameadmin	=?,password=? ,active=?,goals=?,vision=?,faccbook=?,phone=?,address=? where id=?",[name,email,nameadmin,password,active,goals,vision,faccbook,phone,address,id],(error,result)=>{
        if(!error)
        resolve(true)
    })

 })






}

}
module.exports=ConfigModel;