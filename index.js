const express = require('express');
// const prince = require('fs')
const al = require('fs')
const users = require('./MOCK_DATA.json')
const appl = express();
const PORT = 8000;
appl.get("/api/users",(req,res)=>{
    return res.json(users)
})
appl.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id===id);
    return res.json(user)
})
appl.use(express.urlencoded({extended:false}))
appl.post("/api/users",(req,res)=>{
    const bodym = req.body;
    users.push({...bodym,id:users.length+1});
    al.writeFile('./MOCK_DATA.json',JSON.stringify(users),(errorm,dat)=>{
        return res.json({status:"pending"})
    })
    // console.log(body)
})
appl.listen(PORT,()=>{
    console.log("hello prince")
})