const express =require('express');
const connection = require('./config/connection');
const app = express();
const rout=require("./routes/router");
const bodyparser=require("body-parser")

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(rout);

app.listen(3000,()=>{

    console.log('server is running ritajjj ');

});
