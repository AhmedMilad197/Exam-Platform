const { query } = require("express");
const db =require("../config/connection");

class StudentModel {


static async getstudent()
{
   return new Promise (resolve =>{
        
    db.query("select * from student ",[],(error,result)=>{
        if (!error)
        resolve(result)
    });

   });
}

static async addstudent(name  , username , password , phone ,address )
{
   return new Promise (resolve =>{
      db.query("insert into student (name,username,password,phone,address) values(?,?,?,?,?)",[name  , username , password , phone ,address ],(e,r)=>{
      if(!e)
      resolve(true)
      else{
        console.log("error",e);
      resolve(false)
          }
      });
  
   });
}

static async deletestudent(id)
{
   return new Promise (resolve =>{
      db.query("delete from student where id=?",[id], (error,result)=>{
     if(error)
     resolve(false)
    else
    resolve(true)
      });
  
   });
}





static async edit(id,name  , username , password , phone ,address ){

 return new Promise (resolve=> {
    db.query("update student set name=?,username=?,password=?,phone=?,address=? where id=?",[name  , username , password , phone ,address,id ],(error,result)=>{
        if(!error)
        resolve(true)
    })

 })






}

}
module.exports=StudentModel;