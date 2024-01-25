const { query } = require("express");
const db =require("../config/connection");

class CoursModel {


static async getcours()
{
   return new Promise (resolve =>{
        
    db.query("select * from cours ",[],(error,result)=>{
        if (!error)
        resolve(result)
    });

   });
}

static async addcours(name  , active , description , image ,unit  )
{
   return new Promise (resolve =>{
      db.query("insert into cours (name,active,description,image,unit) values(?,?,?,?,?)",[name,active,description,image,unit],(e,r)=>{
      if(!e)
      resolve(true)
      else{
        console.log("error",e);
      resolve(false)
          }
      });
  
   });
}

static async deletecours(id)
{
   return new Promise (resolve =>{
      db.query("delete from cours where id=?",[id], (error,result)=>{
     if(error)
     resolve(false)
    else
    resolve(true)
      });
  
   });
}





static async edit(id,name,active,description , image ,unit){

 return new Promise (resolve=> {
    db.query("update cours set name=?,active=?,description=?,image=?,unit=? where id=?",[name,active,description,image,unit,id],(error,result)=>{
        if(!error)
        resolve(true)
    })

 })






}

}
module.exports=CoursModel;
