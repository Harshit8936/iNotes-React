const mongoConnect = require('./db');
const express = require('express');
const port = 5000;
const app = express();
const cors = require('cors')
mongoConnect();


// use middleware to use req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

// importing Routes here
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


// app.get('/',(req,res)=>{
//     res.send("Hello world Harshit")
// })

app.listen(port,()=>{
    console.log(`App is litening on ${port}`)
})
