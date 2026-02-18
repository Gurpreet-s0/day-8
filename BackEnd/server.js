const app = require('./src/app');
const cheerio = require("cheerio")
const axios = require("axios")
const path = require('path')
const connectToDb = require('./src/config/database');
const noteModel = require("./src/models/notes.model")
require("dotenv").config()
connectToDb()

app.post("/notes",(req,res)=>{
    const {title,description} = req.body
    const note = noteModel.create({
        title,description
    })
 
    res.status(201).json({
        message:"note created",
        note 
    })
})

app.get("/notes",async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"notes fetched",
        notes
    })
})

app.delete("/notes/:id",async (req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:`note deleted ${id}`
    })
})

app.patch("/notes/:id",async (req,res)=>{
    const id = req.params.id
    
    const {title,description} = req.body
    await noteModel.findByIdAndUpdate(id,{title,description})
    res.status(200).json({
        "message":"description modified"
    })
})
// app.get("/gndec_time_table",async (req,res)=>{
//      const response = await axios.get("https://appsc.gndec.ac.in/sites/default/files/2026-02/TIME%20TABLE%2002%20%20FEB%202026%20SECOND%20SEMESTER_rooms_days_horizontal.html")
//      const $=cheerio.load(response.data)
//      const odd_table=$(".odd_table")
//     // console.log()
//     res.status(200)
//      res.status(200).json({
//         message:"notes fetched",
//         data:JSON.stringify(odd_table.text())
//     })
// })
// console.log(__dirname)
app.use("*name",(req,res)=>{
    // res.send(__dirname + "/public/index.html")
    res.sendFile(path.join(__dirname +"/public/index.html"))
})

app.listen("3000",()=>{
    console.log("server is running .....")
})
