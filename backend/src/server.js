import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import connectDB from '../src/config/db.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors({
  origin:"http://localhost:5173",
}))

//middleware
app.use(express.json()) 
app.use(rateLimiter)

// app.use((req,res,next)=>{
//   console.log(`Re method is ${req.method} & Req URL is ${rq.url}`);
//   next()
// })

app.use('/api/notes',notesRoutes)

connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server started on PORT: ${PORT}`);
  }) 
})



