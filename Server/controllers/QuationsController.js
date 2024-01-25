const   QuationsModel =require("../models/quations");
const {validationResult}=require("express-validator")

class QuationsController{

    static async getallquations(req,res)
    { 
        var results =await QuationsModel.getquations();
        if(results)
        res.send(results)
    }


    static async addquations(req,res)
    {   var courseid = req.body.courseid;
        var teacherid = req.body.teacherid;
        var type = req.body.type;
        var content= req.body.content;
        var  answer1= req.body.answer1;
        var  answer2= req.body.answer2;
        var  answer3= req.body.answer3;
        var  answer4= req.body.answer4;
        var rightanswer= req.body.rightanswer;
        var active= req.body.active;
        var mark= req.body.mark;
     
        var x =await QuationsModel.addquations(courseid,teacherid,type,content,answer1,answer2,answer3,answer4,rightanswer,active,mark);
        if(x==true)
        res.send("add successfully")
        else
        res.send("add failed")
    }


    static async deletequations(req,res)
    {   const  id = req.body.id;
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
                res.json(errors.array());
        }
       else{
             if(id)
                {
                     var result= await QuationsModel.deletequations(id)
                     
                     if(result)
                        res.send("delete done")
                     else 
                        res.send("failed to delete user ")
                }
            }
    }


    static async updatequations(req,res)
    {   console.log("edit config");
        const  id = req.body.id;

        const courseid = req.body.courseid;
        const teacherid = req.body.teacherid;
        const type	 = req.body.type	;
        const content= req.body.content;
        const answer1= req.body.answer1;
        const answer2= req.body.answer2;
        const answer3= req.body.answer3;
        const answer4= req.body.answer4;
        const rightanswer= req.body.rightanswer;
        const active= req.body.active;
        const mark= req.body.mark;
        const x = await QuationsModel.edit(id,courseid,teacherid,type,content,answer1,answer2,answer3,answer4,rightanswer,active,mark)

       if (x)
       res.send("data edited successfully")

       else{
        res.send("faild to update user")
       }

    }

}

module.exports=QuationsController;