/*const   UserModel = require("../models/user");
const {validationResult}=require("express-validator")

class UserController{

    static async getalluser(req,res)
    { 
        var results =await UserModel.getuser();
        if(results)
        res.send(results)
    }


    static async adduser(req,res)
    {   var name = req.body.name;
        var email = req.body.email;
        var password= req.body.password;
        var x =await UserModel.adduser(name,email,password);
        if(x==true)
        res.send("add successfully")
        else
        res.send("add failed")
    }


    static async deleteuser(req,res)
    {   const  id = req.body.id;
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
                res.json(errors.array());
        }
       else{
             if(id)
                {
                     var result= await UserModel.deleteuser(id)
                     
                     if(result)
                        res.send("delete done")
                     else 
                        res.send("failed to delete user ")
                }
            }
    }


    static async updateuser(req,res)
    {   console.log("edit user");
        const  id = req.body.id;
        const  newname = req.body.name;
        const newemail = req.body.email;
        const newpassword= req.body.password;

       var x = await UserModel.edit(id,newname,newemail,newpassword)

       if (x)
       res.send("data edited successfully")

       else{
        res.send("faild to update user")
       }

    }

}

module.exports=UserController;
*/