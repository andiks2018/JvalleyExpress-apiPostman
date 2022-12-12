import express from 'express'
import env from 'dotenv'
import note_routes from './routes/note_routes'
env.config()

//environtment variable
const {PORT} = process.env
const app=express()

//mdw
app.use(express.json())

//routes
app.use(note_routes)

//listener
app.listen(PORT, ()=>{
    console.info("server beckend berjalan...")
})