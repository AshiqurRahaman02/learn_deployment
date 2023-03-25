const express = require('express')
const noteRoute = express.Router()
const {NoteModel} = require('../model/note.model')


noteRoute.get("/",async(req,res)=>{
    try {
        const notes = await NoteModel.find()
        res.status(200).send(notes)
    } catch (error) {
        res.status(404).send({message:error.message});
    }
})


noteRoute.post("/add",async(req,res)=>{
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({message: "Note added successfully"})
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})


noteRoute.patch("/update/:noteID",async(req,res)=>{
    const payload = req.body
    const noteID = req.params.noteID
    try {
        await NoteModel.findByIdAndUpdate({_id:noteID}, payload)
        res.status(200).send({message: "Note updated successfully"})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})


noteRoute.delete("/delete/:noteID",async(req,res)=>{
    const noteID = req.params.noteID
    try {
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.status(200).send({message: "Note deleted successfully"})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})


module.exports = {
    noteRoute
}