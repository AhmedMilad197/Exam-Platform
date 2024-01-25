const   StadyModel =require("../models/stady");
const {validationResult}=require("express-validator")

class StadyController{

    static async getallstady(req,res)
    { 
        var results =await StadyModel.getstady();
        if(results)
        res.send(results)
    }


  static async addstady(req,res)
    {   var teacherid = req.body.teacherid;
        var  coursid= req.body.coursid;
        var studentid= req.body.studentid;
      
    

        var x =await StadyModel.addstady(teacherid,coursid,studentid);
        if(x==true)
        res.send("add successfully")
        else
        res.send("add failed")
    }


    static async deletestady(req,res)
    {   const  id = req.body.id;
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
                res.json(errors.array());
        }
       else{
             if(id)
                {
                     var result= await StadyModel.deletestady(id)
                     
                     if(result)
                        res.send("delete done")
                     else 
                        res.send("failed to delete user ")
                }
            }
    }


    static async updatestady(req,res)
    {   console.log("edit config");
       
        const  id = req.body.id;
        const teacherid = req.body.teacherid;
        const coursid= req.body.coursid;
        const  studentid= req.body.studentid;
       
        
        const x = await StadyModel.edit(id,teacherid,coursid,studentid)

       if (x)
       res.send("data edited successfully")

       else{
        res.send("faild to update user")
       }

    }

}

module.exports=StadyController;