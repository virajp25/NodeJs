const app = require('./app');
const port = 3000;

app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.listen(port,()=>{
    console.log('server listen to port 3000');
})