const   ExamModel =require("../models/exam");
const {validationResult}=require("express-validator")

class ExamController{

    static async getallexam(req,res)
    { 
        var results =await ExamModel.getexam();
        if(results)
        res.send(results)
    }


  static async addexam(req,res)
    {   var start_time = req.body.start_time;
        var  end_time= req.body.end_time;
        var name= req.body.name;
        var full_mark= req.body.full_mark;
        var teacherid= req.body.teacherid;
    

        var x =await ExamModel.addexam(start_time  , end_time , name , full_mark ,teacherid);
        if(x==true)
        res.send("add successfully")
        else
        res.send("add failed")
    }


    static async deleteexam(req,res)
    {   const  id = req.body.id;
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
                res.json(errors.array());
        }
       else{
             if(id)
                {
                     var result= await ExamModel.deleteexam(id)
                     
                     if(result)
                        res.send("delete done")
                     else 
                        res.send("failed to delete user ")
                }
            }
    }


    static async updateexam(req,res)
    {   console.log("edit config");
       
    
        const  id = req.body.id;
        const start_time = req.body.start_time;
        const end_time= req.body.end_time;
        const  name= req.body.name;
        const full_mark= req.body.full_mark;
        const teacherid= req.body.teacherid;

        

        const x = await ExamModel.edit(id,start_time  , end_time , name , full_mark ,teacherid )

       if (x)
       res.send("data edited successfully")

       else{
        res.send("faild to update user")
       }

    }

}

module.exports=ExamController;