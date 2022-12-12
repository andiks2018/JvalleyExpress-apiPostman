import express from 'express'
import { note_create, note_read } from '../controllers/note_controllers'

const note_routes = express.Router()

//create note
note_routes.post("/api/note/create", note_create)

//read note
note_routes.get("/api/notes/read", note_read)

export default note_routes