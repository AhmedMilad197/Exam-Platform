const   ConfigModel =require("../models/config");
const {validationResult}=require("express-validator")

class ConfigController{

    static async getallconfig(req,res)
    { 
        var results =await ConfigModel.getconfig();
        if(results)
        res.send(results)
    }


    static async addconfig(req,res)
    {   var name = req.body.name;
        var email = req.body.email;
        var nameadmin = req.body.nameadmin;
        var password= req.body.password;
        var  active= req.body.active;
        var goals= req.body.goals;
        var vision= req.body.vision;
        var faccbook= req.body.faccbook;
        var phone= req.body.phone;
        var address= req.body.address;

        var x =await ConfigModel.addconfig(name,email,nameadmin,password,active,goals,vision,faccbook,phone,address);
        if(x==true)
        res.send("add successfully")
        else
        res.send("add failed")
    }


    static async deleteconfig(req,res)
    {   const  id = req.body.id;
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
                res.json(errors.array());
        }
       else{
             if(id)
                {
                     var result= await ConfigModel.deleteconfig(id)
                     
                     if(result)
                        res.send("delete done")
                     else 
                        res.send("failed to delete user ")
                }
            }
    }


    static async updateconfig(req,res)
    {   console.log("edit config");
        const  id = req.body.id;

        const name = req.body.name;
        const email = req.body.email;
        const nameadmin	 = req.body.nameadmin	;
        const password= req.body.password;
        const active= req.body.active;
        const goals= req.body.goals;
        const vision= req.body.vision;
        const faccbook= req.body.faccbook;
        const phone= req.body.phone;
        const address= req.body.address;
        const x = await ConfigModel.edit(id,name,email,nameadmin,password,active,goals,vision,faccbook,phone,address)

       if (x)
       res.send("data edited successfully")

       else{
        res.send("faild to update user")
       }

    }

}

module.exports=ConfigController;