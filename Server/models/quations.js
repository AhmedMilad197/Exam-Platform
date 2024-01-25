const { query } = require("express");
const db =require("../config/connection");

class QuationsModel {


static async getquations()
{
   return new Promise (resolve =>{
        
    db.query("select * from quations ",[],(error,result)=>{
        if (!error)
        resolve(result)
    });

   });
}

static async addquations(courseid,teacherid,type,content,answer1,answer2,answer3,answer4,rightanswer,active,mark)
{
   return new Promise (resolve =>{
      db.query("insert into quations (courseid,teacherid,type,content,answer1,answer2,answer3,answer4,rightanswer,active,mark) values(?,?,?,?,?,?,?,?,?,?,?)",[courseid,teacherid,type,content,answer1,answer2,answer3,answer4,rightanswer,active,mark],(e,r)=>{
      if(!e)
      resolve(true)
      else{
        console.log("error",e);
      resolve(false)
          }
      });
  
   });
}

static async deletequations(id)
{
   return new Promise (resolve =>{
      db.query("delete from quations where id=?",[id], (error,result)=>{
     if(error)
     resolve(false)
    else
    resolve(true)
      });
  
   });
}





static async edit(id,courseid,teacherid,type,content,answer1,answer2,answer3,answer4,rightanswer,active,mark){

 return new Promise (resolve=> {
    db.query("update quations set courseid=?,teacherid=?, type=?,content=? ,answer1=?,answer2=?,answer3=?,answer4=?,rightanswer=?,active=?,mark=? where id=?",[courseid,teacherid,type,content,answer1,answer2,answer3,answer4,rightanswer,active,mark,id],(error,result)=>{
        if(!error)
        resolve(true)
    })

 })






}

}
module.exports=QuationsModel;