import { request, response } from "express";
import db from "../../prisma/connection";

//create note 
export const note_create = async (req=request, res= response)=>{
    try{
        const data = await req.body
        const createNote = await db.notes.create({
            data : {
                title : data.title,
                content : data.content,
                author : data.author
            }
        })
        return res.status(201).json({
            success :true,
            data : createNote
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

//read note
export const note_read = async (req=request, res=response)=>{
    try{
        const {page= 1, limit = 10, order="desc"}= await req.query
        const skip = (page-1)* limit
        const result = await db.notes.findMany({
            skip : skip,
            take : parseInt(limit),
            orderBy : {
                id : order // a-z "desc"
            }
        })

        const totalResult = await db.notes.count()
        return res.status(200).json({
            success : true,
            current_page : parseInt(page),
            total_page : Math.ceil(totalResult/limit),
            total_data : totalResult,
            data : result
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}