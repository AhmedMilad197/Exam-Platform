const   TeacherModel =require("../models/teacher");
const {validationResult}=require("express-validator")

class TeacherController{

    static async getallteacher(req,res)
    { 
        var results =await TeacherModel.getteacher();
        if(results)
        res.send(results)
    }


  static async addteacher(req,res)
    {   var name = req.body.name;
        var  username= req.body.username;
        var password= req.body.password;
        var image= req.body.image;
        var specialist= req.body.specialist;
        var lastlogin= req.body.lastlogin;
        var active= req.body.active;

        var x =await TeacherModel.addteacher(name,username,password,image,specialist,lastlogin,active);
        if(x==true)
        res.send("add successfully")
        else
        res.send("add failed")
    }


    static async deleteteacher(req,res)
    {   const  id = req.body.id;
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
                res.json(errors.array());
        }
       else{
             if(id)
                {
                     var result= await TeacherModel.deleteteacher(id)
                     
                     if(result)
                        res.send("delete done")
                     else 
                        res.send("failed to delete user ")
                }
            }
    }


    static async updateteacher(req,res)
    {   console.log("edit config");

        const  id = req.body.id;
        const name = req.body.name;
        const  username= req.body.username;
        const password= req.body.password;
        const image= req.body.image;
        const specialist= req.body.specialist;
        const lastlogin= req.body.lastlogin;
        const active= req.body.active;
     
     
       
        
        const x = await TeacherModel.edit(id,name,username,password,image,specialist,lastlogin,active)

       if (x)
       res.send("data edited successfully")

       else{
        res.send("faild to update user")
       }

    }

}

module.exports=TeacherController;