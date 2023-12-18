const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require("./routes/usersRouter")
const cors = require("cors")
dotenv.config();
const db = require("./config/db");
app.use(cors());
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');
app.use(express.json());
app.use('/',userRouter )


app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT || 4000;
app.listen(Port,()=>{
  console.log(`server started on port ${Port}`);
})

app.get('/path',(req,res)=>{
  res.send("Hello")
})