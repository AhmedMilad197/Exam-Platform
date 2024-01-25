const   CoursModel =require("../models/cours");
const {validationResult}=require("express-validator")

class CoursController{

    static async getallcours(req,res)
    { 
        var results =await CoursModel.getcours();
        if(results)
        res.send(results)
    }


  static async addcours(req,res)
    {   var name = req.body.name;
        var  active= req.body.active;
        var description= req.body.description;
        var image= req.body.image;
        var unit= req.body.unit;
    

        var x =await CoursModel.addcours(name,active,description,image,unit);
        if(x==true)
        res.send("add successfully")
        else
        res.send("add failed")
    }


    static async deletecours(req,res)
    {   const  id = req.body.id;
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
                res.json(errors.array());
        }
       else{
             if(id)
                {
                     var result= await CoursModel.deletecours(id)
                     
                     if(result)
                        res.send("delete done")
                     else 
                        res.send("failed to delete user ")
                }
            }
    }


    static async updatecours(req,res)
    {   console.log("edit config");
        const  id = req.body.id;

        const name = req.body.name;
        const active= req.body.active;
        const  description= req.body.description;
        const image= req.body.image;
        const unit= req.body.unit;
        
        const x = await CoursModel.edit(id,name,active,description,image,unit)

       if (x)
       res.send("data edited successfully")

       else{
        res.send("faild to update user")
       }

    }

}

module.exports=CoursController;